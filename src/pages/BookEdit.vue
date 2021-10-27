<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-card class="mx-auto">
          <v-row>
            <v-col cols="4">
              <v-img :src="book.image"></v-img>
            </v-col>
            <v-col cols="8">
              <v-card-title> タイトル：{{ book.title }} </v-card-title>
              読んだ日：
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
                    v-model="date"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="date"
                  @input="menu = false"
                ></v-date-picker>
              </v-menu>
              感想：
              <v-textarea filled class="mx-2" v-model="book.memo">
                {{ book.memo }}
              </v-textarea>
              <v-card-actions>
                <v-btn color="secondary" to="/">一覧に戻る</v-btn>
                <v-btn color="info" @click="updateBookInfo">保存する</v-btn>
              </v-card-actions>
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

interface BookEditDataType {
  book: bookType;
  date: string;
  menu: any;
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
    };
  },
  methods: {
    updateBookInfo() {
      this.$emit("update-book-info", {
        id: this.$route.params.id,
        readDate: this.date,
        memo: this.book.memo,
      });
    },
  },
  props: {
    selectedBook: {
      type: Object as PropType<bookType>,
    },
  },
  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      vm.$nextTick(() => {
        vm.book = vm.selectedBook;
        // console.log("vm.book ", vm.book);
        if (vm.book.readDate) {
          vm.date = vm.book.readDate;
        } else {
          vm.date = new Date().toISOString().substr(0, 10);
        }
        console.log(vm.book);
      });
    });
  },
});
</script>

<style></style>
