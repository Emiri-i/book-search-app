<template>
  <div>BookEdit</div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { bookType } from "@/libs/types";

export default Vue.extend({
  name: "BookEdit",
  data() {
    return {
      value: "hoge",
    };
  },
  props: {
    books: {
      type: Array as PropType<bookType[]>,
      default: () => [],
    },
  },
});
</script>

<style></style>
