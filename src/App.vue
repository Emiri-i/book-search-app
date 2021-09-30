<template>
  <v-app>
    <Header />
    <v-main>
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Header from "@/global/Header.vue";
import Footer from "@/global/Footer.vue";

export default Vue.extend({
  name: "App",
  data() {
    return {
      value: "hoge",
    };
  },
});
</script>
