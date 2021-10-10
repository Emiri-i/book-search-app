<template>
  <v-app>
    <Header />
    <v-main>
      <v-container>
        <router-view
          @add-book-list="addBook"
          :books="books"
          @update-book-info="updateBookInfo"
        />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Header from "@/global/Header.vue";
import Footer from "@/global/Footer.vue";
import { bookType } from "@/libs/types";

interface AppDataType {
  books: Array<bookType>;
  newBook: string;
}

const STORAGE_KEY = "books";
export default Vue.extend({
  name: "App",
  components: {
    Header,
    Footer,
  },
  data(): AppDataType {
    return {
      books: [],
      newBook: "",
    };
  },
  mounted() {
    if (localStorage.getItem(STORAGE_KEY)) {
      try {
        this.books = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      } catch (e) {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  },
  methods: {
    addBook(e: any) {
      this.books.push({
        id: this.books.length,
        title: e.title,
        image: e.img,
        description: e.description,
        readDate: "",
        memo: "",
      });
      this.saveBooks();
      this.goToEditPage(this.books.slice(-1)[0].id);
    },
    removeBook(x: any) {
      this.books.splice(x, 1);
      this.saveBooks();
    },
    saveBooks() {
      const parsed = JSON.stringify(this.books);
      localStorage.setItem(STORAGE_KEY, parsed);
    },
    updateBookInfo(e: bookType) {
      const updateInfo: bookType = {
        id: e.id,
        readDate: e.readDate,
        memo: e.memo,
        title: this.books[e.id].title,
        image: this.books[e.id].image,
        description: this.books[e.id].description,
      };
      this.books.splice(e.id, 1, updateInfo);
      this.saveBooks();
      this.$router.push("/");
    },
    goToEditPage(id: number) {
      this.$router.push(`/edit/${id}`);
    },
  },
});
</script>
