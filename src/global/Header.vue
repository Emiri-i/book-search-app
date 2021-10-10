<template>
  <div>
    <v-app-bar app color="primary" dark>
      Header
      <v-spacer></v-spacer>
      <v-btn color="error" @click="deleteLocalStorage">
        Delete all
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  name: "Header",
  data() {
    return {};
  },
  methods: {
    deleteLocalStorage() {
      this.$emit("delete-local-storage");
    },
  },
});
</script>

<style></style>
