<template>
  <div>
    <v-row>
      <v-col class="text-h6 d-flex align-center">
        <v-icon class="mr-2">
          mdi-bookshelf
        </v-icon>
        My Books
        <v-spacer></v-spacer>
        <v-btn color="error" @click="deleteLocalStorage" v-show="books.length">
          <v-icon dark left>
            mdi-delete
          </v-icon>
          Delete all
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-if="books.length">
      <v-col cols="12" sm="6" v-for="book in books" :key="book.id">
        <v-card style="height:250px;">
          <v-container>
            <v-row>
              <v-col
                cols="4"
                class="d-flex align-center justify-center"
                style="height:250px;"
              >
                <v-img
                  :src="book.image"
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
                  <div class="caption grey--text text--darken-1">
                    finished date
                  </div>
                  <div class="body-1 mb-1">
                    {{ utils_.formatDate(book.readDate) }}
                  </div>
                  <div class="caption grey--text text--darken-1">comment</div>
                  <div class="trancate-one-line body-1">
                    {{ book.memo ? book.memo : "no comment" }}
                  </div>
                </div>
                <v-spacer></v-spacer>
                <v-divider class="pa-0 mt-5"></v-divider>
                <v-card-actions class="justify-end">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        v-on="on"
                        @click="goToEdit(book)"
                        color="indigo"
                        fab
                        dark
                        class="mr-4"
                      >
                        <v-icon>
                          mdi-pencil
                        </v-icon>
                      </v-btn>
                    </template>
                    <span>edit this book</span>
                  </v-tooltip>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        v-on="on"
                        fab
                        dark
                        color="indigo"
                        @click="deleteBook(book)"
                      >
                        <v-icon dark>
                          mdi-delete
                        </v-icon>
                      </v-btn>
                    </template>
                    <span>delete from My Books</span>
                  </v-tooltip>
                </v-card-actions>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col>
        <div>there are no books.</div>
        <div class="d-flex align-center justify-start">
          <v-btn text color="primary" to="/search" class="pl-0">
            <v-icon left color="primary">
              mdi-arrow-right
            </v-icon>
            go to Search Books page
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { bookType } from "@/libs/types";
import utils from "../libs/utils";

interface BookIndexDataType {
  utils_: any;
}

export default Vue.extend({
  name: "BookIndex",
  data(): BookIndexDataType {
    return {
      utils_: undefined,
    };
  },
  props: {
    books: {
      type: Array as PropType<bookType[]>,
      default: () => [],
    },
  },
  created() {
    this.utils_ = utils;
  },
  methods: {
    deleteBook(book: bookType) {
      const deleteMsg = "Are you sure to delete this book?";
      if (window.confirm(deleteMsg)) {
        this.$emit("delete-book", book);
      }
    },
    goToEdit(book: bookType) {
      this.$emit("show-edit-page", book);
    },
    deleteLocalStorage() {
      this.$emit("delete-local-storage");
    },
  },
});
</script>

<style lang="scss" scoped>
.trancate-one-line {
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>
