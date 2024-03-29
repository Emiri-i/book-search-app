<template>
  <div>
    <v-row>
      <v-col class="text-h6 d-flex align-center">
        <v-icon class="mr-2">
          mdi-book-search
        </v-icon>
        Search Books
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6">
        <v-radio-group v-model="selectedRadio" row mandatory class="mt-0">
          <v-radio label="search by book title"></v-radio>
          <v-radio label="search by author name"></v-radio>
        </v-radio-group>
        <div class="d-flex align-center pt-0">
          <v-text-field
            :label="selectedRadio === 0 ? 'book title' : 'author name'"
            :placeholder="
              selectedRadio === 0
                ? 'search by book title'
                : 'search by author name'
            "
            v-model="keyword"
            filled
            dense
            hide-details="auto"
            @keyup.enter="search(keyword)"
          ></v-text-field>
          <v-btn color="primary" @click="search(keyword)" class="ml-10">
            Search
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-divider></v-divider>
        <div class="d-flex align-center my-3">
          <v-icon class="mr-2">mdi-book-multiple</v-icon>
          <div class="text-h6">Result</div>
          <v-spacer></v-spacer>
          <div v-show="isShowResult">
            <div style="white-text:nowrap;">
              {{ isShowResult ? currentItems[0].index + 1 : "" }}-
              {{ totalBookNum() }}
              / {{ maxSearchResults }}
            </div>
          </div>
        </div>
        <v-row>
          <v-col cols="12" md="6" v-for="book in currentItems" :key="book.id">
            <v-card style="height:250px;">
              <v-container>
                <v-row>
                  <v-col
                    cols="4"
                    class="d-flex align-center justify-center"
                    style="height:250px;"
                  >
                    <v-img
                      :src="book.img"
                      style="max-height:230px; width:auto; max-width:200px;"
                    ></v-img>
                  </v-col>
                  <v-col cols="8">
                    <div style="min-height:120px;">
                      <v-card-title
                        class="pa-0 my-2 trancate-one-line font-weight-bold"
                      >
                        {{ book.title }}
                      </v-card-title>
                      <div class="trancate-three-line">
                        {{
                          book.description ? book.description : "no description"
                        }}
                      </div>
                    </div>
                    <v-spacer></v-spacer>
                    <v-divider class="pa-0 mt-5"></v-divider>
                    <v-card-actions class="justify-end">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <v-btn
                            v-on="on"
                            fab
                            dark
                            color="indigo"
                            @click="addBookList(book)"
                          >
                            <v-icon dark>
                              mdi-plus
                            </v-icon>
                          </v-btn>
                        </template>
                        <span>add to My Books</span>
                      </v-tooltip>
                    </v-card-actions>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row v-show="isShowResult">
      <v-col>
        <div class="text-center">
          <v-pagination
            v-model="page"
            :length="pagenationLength"
            @input="onChangePageNumber"
          ></v-pagination>
        </div>
      </v-col>
    </v-row>
    <v-row v-show="!currentItems">
      <v-col>
        <div>
          there are no results for your search.
        </div>
      </v-col>
    </v-row>

    <!-- show dialog when the book you want to add is already in My Books -->
    <v-dialog v-model="isDialogOpen" max-width="500px">
      <v-card>
        <v-container>
          <v-card-title>
            this book is already in My Books.
          </v-card-title>
          <v-card-actions>
            <v-btn color="primary" text @click="closeDialog">
              Close
            </v-btn>
          </v-card-actions>
        </v-container>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { searchResultsType } from "@/libs/types";

interface DataType {
  keyword: string;
  searchResults: Array<searchResultsType[]>;
  page: number;
  maxSearchResults: number;
  chunk: number;
  pagenationLength: number;
  currentItems: searchResultsType[];
  isShowResult: boolean;
  isDialogOpen: boolean;
  selectedRadio: number;
}

export default Vue.extend({
  name: "BookSearch",
  data(): DataType {
    return {
      keyword: "",
      searchResults: [],
      page: 1, //current page number
      maxSearchResults: 30, //maximum number of the books to get when it is fetched
      chunk: 10, //the number of books per page
      pagenationLength: 0, //the number of total pages
      isShowResult: false,
      currentItems: [], // items that appears in current page
      isDialogOpen: false,
      selectedRadio: 1,
    };
  },
  props: {
    isDuplicateBook: {
      type: Boolean,
    },
  },
  watch: {
    isDuplicateBook: {
      immediate: true,
      handler: function() {
        this.isDialogOpen = this.isDuplicateBook ? true : false;
      },
    },
  },
  created() {
    this.pagenationLength = this.maxSearchResults / 10;
    this.currentItems = [];
    this.searchResults = [];
  },
  methods: {
    onChangePageNumber() {
      this.currentItems = this.searchResults
        ? this.searchResults[this.page - 1]
        : [];
    },
    async search(keyword: string) {
      this.isShowResult = false;
      this.searchResults = [];
      const baseURL = "https://www.googleapis.com/books/v1/volumes?";
      let params: any = { q: "", maxResults: this.maxSearchResults };
      if (this.selectedRadio === 0) {
        params.q = `intitle:${keyword}`;
      } else {
        params.q = `inauthor:${keyword}`;
      }
      const queryParams = new URLSearchParams(params);
      const response = await fetch(baseURL + queryParams).then((response) =>
        response.json()
      );
      let resultArray: Array<searchResultsType> = [];
      if (response.items) {
        response.items.forEach((book: any, i: number) => {
          let title: string = book.volumeInfo.title;
          let img: any = book.volumeInfo.imageLinks;
          let description: string = book.volumeInfo.description;
          let id: string = book.id;
          resultArray.push({
            title: title ? title : "",
            img: img ? img.thumbnail : "",
            description: description ? description.slice(0, 150) : "",
            id: id,
            index: i,
          });
        });
        //create multidimensional array to show 10 items per page
        for (let i = 0; i < resultArray.length; i += this.chunk) {
          this.searchResults.push(resultArray.slice(i, i + this.chunk));
        }
        this.isShowResult = true;
      }
      this.onChangePageNumber();
    },
    addBookList(book: searchResultsType) {
      this.$emit("add-book-list", book);
    },
    totalBookNum() {
      let endNumber = 0;
      if (this.currentItems) {
        endNumber =
          this.currentItems.length > 9
            ? this.currentItems[this.chunk - 1].index + 1
            : this.currentItems.length;
      }
      return endNumber;
    },
    closeDialog() {
      this.isDialogOpen = false;
      this.$emit("close-dialog");
    },
  },
});
</script>

<style lang="scss" scoped>
.trancate-three-line {
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.trancate-one-line {
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>
