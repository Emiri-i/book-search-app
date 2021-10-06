<template>
  <v-app>
    <Header />
    <v-main>
      <v-container>
        <router-view />
      </v-container>
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
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      value: "hoge",
    };
  },
});
</script>
