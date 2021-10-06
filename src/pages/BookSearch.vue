<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="6">
          <v-text-field
            label="Search by book title"
            v-model="keyword"
            filled
            dense
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3">
          <v-btn color="primary" @click="search(keyword)">
            Search
          </v-btn>
        </v-col>
        <v-col cols="3">
          <v-btn color="secondary" to="/">
            Back to Index
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          md="6"
          v-for="(book, index) in searchResults"
          :key="book.index"
        >
          <v-card>
            <v-row>
              <v-col cols="4">
                <v-img :src="book.img"></v-img>
              </v-col>
              <v-col cols="8">
                <v-card-title>
                  {{ book.title }}
                </v-card-title>
                {{ book.description }}
                <v-spacer></v-spacer>
                <v-card-actions>
                  <v-btn fab dark color="indigo" @click="addBookList(index)">
                    <v-icon dark>
                      mdi-plus
                    </v-icon>
                  </v-btn>
                </v-card-actions>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export interface searchResultsObj {
  title: string;
  image: any;
}
export interface DataType {
  keyword: string;
  searchResults: any;
}

export default Vue.extend({
  name: "BookSearch",
  data(): DataType {
    return {
      keyword: "",
      searchResults: [],
    };
  },
  methods: {
    async search(keyword: string) {
      this.searchResults = [];
      const baseURL = "https://www.googleapis.com/books/v1/volumes?";
      const params: any = {
        q: `intitle:${keyword}`,
        maxResults: 30,
      };
      const queryParams = new URLSearchParams(params);
      console.log("params", params);
      const response = await fetch(baseURL + queryParams).then((response) =>
        response.json()
      );
      for (let book of response.items) {
        let title: string = book.volumeInfo.title;
        let img: any = book.volumeInfo.imageLinks;
        let description: string = book.volumeInfo.description;
        this.searchResults.push({
          title: title ? title : "",
          img: img ? img.thumbnail : "",
          description: description ? description.slice(0, 50) : "",
        });
      }
      console.log("this.searchResults", this.searchResults);
    },
  },
});
</script>

<style></style>
