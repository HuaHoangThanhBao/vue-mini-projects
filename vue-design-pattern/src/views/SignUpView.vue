<template>
  <SignUpForm />
</template>

<script lang="ts">
import FormBuilder from "@/builders/FormBuilder";
import FormDirector from "@/builders/FormDirector";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    SignUpForm: new FormDirector(new FormBuilder()).makeSignUpForm(),
  },
});
</script>