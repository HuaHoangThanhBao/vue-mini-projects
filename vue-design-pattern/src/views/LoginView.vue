<template>
  <component :is="component" />
  <component :is="step"></component>
</template>

<script lang="ts">
import FormBuilder from "@/builders/FormBuilder";
import FormDirector from "@/builders/FormDirector";
import Modal from "@/chains/Modal.vue";
import Message from "../chains/Message.vue";

import { defineComponent, shallowRef } from "vue";
import { FormAction } from "../builders/FormBuilder";
import { Step } from "../chains/Chain";

export default defineComponent({
  data() {
    return {
      component: null,
      step: null,
    };
  },
  methods: {
    getSubmissionChain() {
      const dialog = new Step(Modal);
      const message = new Step(Message);
      dialog.setNext(message);
      return dialog;
    },
  },
  created() {
    const chains = this.getSubmissionChain();

    const dialogAction = {
      done: () => {
        this.step = shallowRef(
          chains.getNext().show({ message: "Modal accepted" })
        );
      },

      close: () => {
        this.step = shallowRef(
          chains.getNext().show({ message: "Modal closed" })
        );
      },

      cancel: () => {
        this.step = shallowRef(
          chains.getNext().show({ message: "Modal canceled" })
        );
      },

      isCancel: true
    };

    const formAction: FormAction = {
      submit: () => {
        console.log("login submited");
        this.step = shallowRef(chains.show(dialogAction));
      },

      cancel: () => {
        console.log("canceled form submission");
        this.step = shallowRef(chains.getNext().show({ message: 'Form canceled' }));
      },

      isCancel: true,
    };

    const formDirector = new FormDirector(new FormBuilder());
    this.component = shallowRef(formDirector.makeLoginForm(formAction));
  },
});
</script>
