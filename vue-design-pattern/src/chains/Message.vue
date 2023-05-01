<template>
  <p>{{ this.message }}</p>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    message: {
      type: String,
      default: "",
    },
  },
});
</script>
