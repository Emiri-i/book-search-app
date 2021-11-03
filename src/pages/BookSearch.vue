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
      <v-col cols="6">
        <div class="d-flex align-center pt-0">
          <v-text-field
            label="Search by book title"
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
        <div class="text-center">
          there are no results for your search.
        </div>
      </v-col>
    </v-row>
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
    };
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
      const params: any = {
        q: `intitle:${keyword}`,
        maxResults: this.maxSearchResults,
      };
      const queryParams = new URLSearchParams(params);
      const response = await fetch(baseURL + queryParams).then((response) =>
        response.json()
      );
      console.log("response", response);
      let resultArray: Array<searchResultsType> = [];
      if (response.items) {
        response.items.forEach((book: any, i: number) => {
          console.log("b");
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
        console.log("response.items", response.items);
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
      console.log("endNumber", endNumber);
      return endNumber;
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
