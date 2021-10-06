<template>
  <v-app>
    <Header />
    <v-main>
      <v-container>
        <router-view @add-book-list="addBook" />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Header from "@/global/Header.vue";
import Footer from "@/global/Footer.vue";

interface bookType {
  id: number;
  title: string;
  image: any;
  description: string;
  readDate: string;
  memo: string;
}
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
        image: e.image,
        description: e.description,
        readDate: "",
        memo: "",
      });
      this.saveBooks();
      console.log(this.books.slice(-1)[0].id);
    },
    removeBook(x: any) {
      this.books.splice(x, 1);
      this.saveBooks();
      this.goToEditPage(this.books.slice(-1)[0].id);
    },
    saveBooks() {
      const parsed = JSON.stringify(this.books);
      localStorage.setItem(STORAGE_KEY, parsed);
    },
    goToEditPage(id: number) {
      this.$router.push(`/edit/${id}`);
    },
  },
});
</script>
