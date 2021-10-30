<template>
  <div>
    <v-row>
      <v-col class="text-h6 d-flex align-center">
        <v-icon class="mr-2">
          mdi-bookshelf
        </v-icon>
        My Books
        <!-- <v-btn color="primary" to="/search">search books</v-btn> -->
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" v-for="book in books" :key="book.id">
        <v-card>
          <v-row>
            <v-col cols="4">
              <v-img :src="book.image"></v-img>
            </v-col>
            <v-col cols="12">
              <v-card-title>
                {{ book.title }}
                読んだ日：{{ book.readDate }} 感想：{{ book.readDate }}
                <v-spacer></v-spacer>
                <v-card-actions>
                  <v-btn
                    :to="{ name: 'BookEdit', params: { id: book.id } }"
                    color="indigo"
                    fab
                    small
                    dark
                  >
                    <v-icon>
                      mdi-pencil
                    </v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card-title>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { bookType } from "@/libs/types";
export default Vue.extend({
  name: "BookIndex",
  data() {
    return {};
  },
  props: {
    books: {
      type: Array as PropType<bookType[]>,
      default: () => [],
    },
  },
});
</script>

<style></style>
