<template>
  <table>
    <thead v-for="field in fields" :key="field.ID">
      <span>{{ field.Name }}</span>
    </thead>
    <tbody>
      <tr v-for="item in data" :key="item" @click="onTableRowClick">
        <td v-for="field in fields" :key="field">{{ item[field] }}</td>
      </tr>
    </tbody>
  </table>
  <component :is="step"></component>
</template>

<script lang="ts">
import { defineComponent, shallowRef } from "vue";
import { Step } from "@/chains/Chain";
import Modal from "@/chains/Modal.vue";
import Message from "@/chains/Message.vue";

export default defineComponent({
  data() {
    return {
      step: null,
      data: [
        {
          ID: "01",
          Name: "Abiola Esther",
          Course: "Computer Science",
          Gender: "Female",
          Age: "17",
        },
        {
          ID: "02",
          Name: "Robert V. Kratz",
          Course: "Philosophy",
          Gender: "Male",
          Age: "19",
        },
        {
          ID: "03",
          Name: "Kristen Anderson",
          Course: "Economics",
          Gender: "Female",
          Age: "20",
        },
        {
          ID: "04",
          Name: "Adam Simon",
          Course: "Food science",
          Gender: "Male",
          Age: "21",
        },
        {
          ID: "05",
          Name: "Daisy Katherine",
          Course: "Business studies",
          Gender: "Female",
          Age: "22",
        },
      ],
      fields: ["ID", "Name", "Course", "Gender", "Age"],
    };
  },
  methods: {
    getSubmissionChain() {
      const userEditDialog = new Step(Modal);
      const userConfirmDialog = new Step(Modal);
      const message = new Step(Message);
      userEditDialog.setNext(userConfirmDialog);
      userConfirmDialog.setNext(message);
      return userEditDialog;
    },
    onTableRowClick() {
      const chains = this.getSubmissionChain();

      const confirmAction = {
        done: () => {
          this.step = shallowRef(
            chains.getNext().getNext().show({ message: "Confirm Modal done" })
          );
        },

        close: () => {
          this.step = shallowRef(
            chains.getNext().getNext().show({ message: "Confirm Modal closed" })
          );
        },

        cancel: () => {
          this.step = shallowRef(
            chains
              .getNext()
              .getNext()
              .show({ message: "Confirm Modal canceled" })
          );
        },

        isCancel: true,
      };

      const editAction = {
        done: () => {
          this.step = shallowRef(
            chains
              .getNext()
              .show({ ...confirmAction, title: "This is confirm modal" })
          );
        },

        close: () => {
          this.step = shallowRef(
            chains.getNext().getNext().show({ message: "Edit Modal closed" })
          );
        },

        cancel: () => {
          this.step = shallowRef(
            chains.getNext().getNext().show({ message: "Edit Modal canceled" })
          );
        },

        isCancel: true,
      };

      this.step = shallowRef(
        chains.show({ ...editAction, title: "This is edit modal" })
      );
    },
  },
});
</script>