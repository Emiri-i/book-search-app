<template>
  <div>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>
        Book Search App
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Book Seach App
          </v-list-item-title>
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
        { name: "Search Books", icon: "mdi-book-search", url: "/search" },
        { name: "My Books", icon: "mdi-bookshelf", url: "/" },
      ],
      selectedItem: -1,
    };
  },
});
</script>

<style></style>
