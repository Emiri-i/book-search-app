<template>
  <div>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>
        Find a book
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="error" @click="deleteLocalStorage">
        Delete all
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list-item>
        <v-list-item-content>
          <!-- <div class="d-flex align-center justify-center"> -->
          <v-list-item-title class="text-h6">
            <v-icon left>
              mdi-book-open-variant
            </v-icon>
            Book Seach App
          </v-list-item-title>
          <!-- </div> -->
          <v-list-item-subtitle>
            broden your knowledge
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list nav dense>
        <v-list-item-group v-model="selectedItem" active-class="blue lighten-4">
          <v-list-item v-for="(item, i) in items" :key="i" :to="item.url">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { navItemType } from "@/libs/types";
interface HeaderDatType {
  drawer: boolean;
  items: Array<navItemType>;
  selectedItem: number;
}
export default Vue.extend({
  name: "Header",
  data(): HeaderDatType {
    return {
      drawer: false,
      items: [
        { name: "My Book List", icon: "mdi-book-open-page-variant", url: "/" },
        { name: "Search A Book", icon: "mdi-book-search", url: "/search" },
      ],
      selectedItem: -1,
    };
  },
  methods: {
    deleteLocalStorage() {
      this.$emit("delete-local-storage");
    },
  },
});
</script>

<style></style>
