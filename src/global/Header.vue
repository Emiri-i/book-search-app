<template>
  <div>
    <v-app-bar app color="primary" dark>
      Header
      <v-spacer></v-spacer>
    </v-app-bar>
  </div>
</template>

<script>
import Vue from "vue";
export default Vue.extend({
  name: "Header",
  data() {
    return {
      value: "hoge",
    };
  },
});
</script>

<style></style>
