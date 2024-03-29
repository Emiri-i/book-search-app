<template>
  <v-app>
    <Header />
    <v-main>
      <v-container>
        <router-view
          @delete-local-storage="deleteLocalStorage"
          @add-book-list="addBook"
          :selectedBook="selectedBook"
          :books="books"
          :is-duplicate-book="isDuplicateBook"
          @update-book-info="updateBookInfo"
          @show-edit-page="showEditPage"
          @delete-book="deleteBook"
          @close-dialog="isDuplicateBook = false"
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
  isDuplicateBook: boolean;
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
      isDuplicateBook: false,
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
      let target = {
        id: e.id,
        title: e.title,
        image: e.img,
        description: e.description,
        readDate: "",
        memo: "",
      };
      let isDuplicate = this.checkIsDuplicate(target);
      if (isDuplicate) {
        this.isDuplicateBook = true;
        return;
      }
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
      let bookIndex = -1;
      let targetBook: bookType = {
        id: "",
        title: "",
        image: "",
        description: "",
        readDate: "",
        memo: "",
      };
      let isNewBook = true;
      this.books.forEach((book: bookType, index: number) => {
        if (book.id === e.id) {
          bookIndex = index;
          targetBook = book;
          isNewBook = false;
        }
      });
      const updateInfo = {
        id: isNewBook ? e.id : targetBook.id,
        readDate: e.readDate,
        memo: e.memo,
        title: isNewBook ? e.title : targetBook.title,
        image: isNewBook ? e.image : targetBook.image,
        description: isNewBook ? e.description : targetBook.description,
      };
      if (isNewBook) {
        this.books.push(updateInfo);
      } else {
        this.books.splice(bookIndex, 1, updateInfo);
      }
      this.saveBooks();
      this.$router.push("/");
    },
    goToEditPage(book: bookType) {
      this.selectedBook = book;
      this.$router.push(`/edit/${book.id}`);
    },
    showEditPage(e: bookType) {
      this.goToEditPage(e);
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
      const isDeleted =
        "Are you sure?\nAll of the books in My Books are going to be deleted.";
      if (window.confirm(isDeleted)) {
        localStorage.setItem(STORAGE_KEY, "");
        localStorage.removeItem(STORAGE_KEY);
        this.books = [];
        window.location.reload();
      }
    },
    //when you add a book, check if the book is already in My Books
    checkIsDuplicate(newBook: any) {
      let duplicateBooks = this.books.filter((book) => {
        return newBook.id === book.id;
      });
      const isDuplicate = duplicateBooks.length ? true : false;
      return isDuplicate;
    },
  },
});
</script>
