<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-card class="mx-auto">
          <v-container>
            <v-row>
              <v-col cols="4">
                <v-img :src="book.image"></v-img>
              </v-col>
              <v-col cols="8">
                <v-card-title class="font-weight-bold ">
                  {{ book.title }}
                </v-card-title>
                <v-card-text>
                  <v-menu
                    v-model="menu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        :value="utils_.formatDate(book.readDate)"
                        label="finished date"
                        placeholder="select date"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="book.readDate"
                      @input="menu = false"
                    ></v-date-picker>
                  </v-menu>
                  <v-textarea
                    v-model="book.memo"
                    label="comment"
                    filled
                    class="mx-2"
                    name="comment"
                  >
                    {{ book.memo }}
                  </v-textarea>
                  <v-card-actions>
                    <v-btn color="primary" @click="updateBookInfo">save</v-btn>
                  </v-card-actions>
                </v-card-text>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { bookType } from "@/libs/types";
import utils from "../libs/utils";

interface BookEditDataType {
  book: bookType;
  date: string;
  menu: any;
  utils_: any;
}
export default Vue.extend({
  name: "BookEdit",
  data(): BookEditDataType {
    return {
      book: {
        id: "",
        title: "",
        image: "",
        description: "",
        readDate: "",
        memo: "",
      },
      date: "",
      menu: false,
      utils_: undefined,
    };
  },
  methods: {
    updateBookInfo() {
      this.$emit("update-book-info", this.book);
    },
  },
  props: {
    selectedBook: {
      type: Object as PropType<bookType>,
    },
  },
  created() {
    this.utils_ = utils;
  },
  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      vm.$nextTick(() => {
        vm.book = vm.selectedBook;
        if (vm.book.readDate) {
          vm.date = vm.book.readDate;
        } else {
          vm.book.readDate = new Date().toISOString().substr(0, 10);
        }
      });
    });
  },
});
</script>

<style></style>
