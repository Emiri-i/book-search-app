<template>
  <div>
    {{ book.title }}
    {{ books }}
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { bookType } from "@/libs/types";

export default Vue.extend({
  name: "BookEdit",
  data() {
    return {
      book: "",
    };
  },
  props: {
    books: {
      type: Array as PropType<bookType[]>,
      default: () => [],
    },
  },
  beforeRouteEnter(to: any, from: any, next: any) {
    next((vm: any) => {
      vm.$nextTick(() => {
        vm.book = vm.books[vm.$route.params.id];
        console.log(vm.book);
      });
    });
  },
});
</script>

<style></style>
