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
      <v-col cols="6" class="d-flex align-center pt-0">
        <v-text-field
          label="Search by book title"
          v-model="keyword"
          filled
          dense
          hide-details="auto"
        ></v-text-field>
        <v-btn color="primary" @click="search(keyword)" class="ml-10">
          Search
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-divider></v-divider>
        <div class="d-flex align-center my-3">
          <v-icon class="mr-2">mdi-book-multiple</v-icon>
          <div class="text-h6">Result</div>
          <v-spacer></v-spacer>
          <div v-show="currentItems.length > 0">
            <div style="white-text:nowrap;">
              {{ currentItems.length > 0 ? currentItems[0].index + 1 : "" }}-
              {{
                currentItems.length > 0 ? currentItems[chunk - 1].index + 1 : ""
              }}
              / {{ maxSearchResults }}
            </div>
          </div>
        </div>
        <v-row>
          <v-col
            cols="12"
            md="6"
            v-for="(book, index) in currentItems"
            :key="book.index"
          >
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
                    <v-card-title class="align-start px-0">
                      {{ book.title }}
                    </v-card-title>
                    {{ book.description }}
                    <v-spacer></v-spacer>
                    <v-card-actions>
                      <v-btn
                        fab
                        dark
                        color="indigo"
                        @click="addBookList(index)"
                      >
                        <v-icon dark>
                          mdi-plus
                        </v-icon>
                      </v-btn>
                    </v-card-actions>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row v-show="searchResults.length">
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
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";

interface searchResultsType {
  title: string;
  img: any;
  description: string;
  index: number;
}
interface DataType {
  keyword: string;
  searchResults: Array<searchResultsType[]>;
  page: number;
  maxSearchResults: number;
  chunk: number;
  pagenationLength: number;
  currentItems: searchResultsType[];
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
      this.currentItems = this.searchResults[this.page - 1];
    },
    async search(keyword: string) {
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
      let resultArray: Array<searchResultsType> = [];
      response.items.forEach((book: any, i: number) => {
        let title: string = book.volumeInfo.title;
        let img: any = book.volumeInfo.imageLinks;
        let description: string = book.volumeInfo.description;
        resultArray.push({
          title: title ? title : "",
          img: img ? img.thumbnail : "",
          description: description ? description.slice(0, 50) : "",
          index: i,
        });
      });
      for (let i = 0; i < resultArray.length; i += this.chunk) {
        this.searchResults.push(resultArray.slice(i, i + this.chunk));
      }
      this.onChangePageNumber();
    },
    addBookList(index: number) {
      this.$emit("add-book-list", this.searchResults[index]);
    },
  },
});
</script>

<style></style>
