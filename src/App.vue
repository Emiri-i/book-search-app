<template>
  <v-app>
    <Header @delete-local-storage="deleteLocalStorage" />
    <v-main>
      <v-container>
        <router-view
          @add-book-list="addBook"
          :selectedBook="selectedBook"
          :books="books"
          @update-book-info="updateBookInfo"
          @delete-book="deleteBook"
        />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Header from "@/global/Header.vue";
import { bookType } from "@/libs/types";
import { searchResultsType } from "@/libs/types";

interface AppDataType {
  books: Array<bookType>;
  newBook: string;
  selectedBook: bookType;
}

const STORAGE_KEY = "books";
export default Vue.extend({
  name: "App",
  components: {
    Header,
  },
  data(): AppDataType {
    return {
      books: [],
      newBook: "",
      selectedBook: {
        id: "",
        title: "",
        image: "",
        description: "",
        readDate: "",
        memo: "",
      },
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
    addBook(e: searchResultsType) {
      console.log("e", e);
      let target = {
        id: e.id,
        title: e.title,
        image: e.img,
        description: e.description,
        readDate: "",
        memo: "",
      };
      this.books.push(target);
      // this.saveBooks();
      this.goToEditPage(target);
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
      console.log("this.books", this.books);
      let bookIndex = -1;
      let targetBook: bookType = {
        id: "",
        title: "",
        image: "",
        description: "",
        readDate: "",
        memo: "",
      };
      this.books.forEach((book: bookType, index: number) => {
        if (book.id === e.id) {
          bookIndex = index;
          targetBook = book;
        }
      });
      const updateInfo = {
        id: e.id,
        readDate: e.readDate,
        memo: e.memo,
        title: targetBook.title,
        image: targetBook.image,
        description: targetBook.description,
      };
      this.books.splice(bookIndex, 1, updateInfo);
      console.log("this.books2", this.books);
      this.saveBooks();
      this.$router.push("/");
    },
    goToEditPage(book: bookType) {
      this.selectedBook = book;
      this.$router.push(`/edit/${book.id}`);
    },
    //delete one book
    deleteBook(e: bookType) {
      let booksBeforeDelete: any = "";
      try {
        booksBeforeDelete = JSON.parse(
          localStorage.getItem(STORAGE_KEY) || "{}"
        );
      } catch (err) {
        console.log(err);
      }
      booksBeforeDelete.forEach((book: bookType, index: number) => {
        if (e.id === book.id) {
          booksBeforeDelete.splice(index, 1);
          this.books.splice(index, 1);
          localStorage.removeItem(STORAGE_KEY);
          const parsed = JSON.stringify(this.books);
          localStorage.setItem(STORAGE_KEY, parsed);
          window.location.reload();
        }
      });
    },
    //delete all books
    deleteLocalStorage() {
      const isDeleted = "LocalStorageのデータを削除してもいいですか？";
      if (window.confirm(isDeleted)) {
        localStorage.setItem(STORAGE_KEY, "");
        localStorage.removeItem(STORAGE_KEY);
        this.books = [];
        window.location.reload();
      }
    },
  },
});
</script>
