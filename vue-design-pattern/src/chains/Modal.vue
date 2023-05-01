<template>
  <div class="modal-backdrop" v-if="isShow">
    <div class="modal">
      <header class="modal-header">
        <slot name="header"> {{title}} </slot>
        <button type="button" class="btn-close" @click="handleClose">x</button>
      </header>

      <section class="modal-body">
        <slot name="body"> This is the default body! </slot>
      </section>

      <footer class="modal-footer">
        <slot name="footer">
          <!-- This is the default footer! -->
          <button @click="done">Ok</button>
          <button v-if="isCancel" type="button" class="btn-green" @click="handleCancel">
            Cancel
          </button>
        </slot>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    title: {
      type: String,
      default: 'This is the default title!'
    },
    isVisible: {
      type: Boolean,
      default: false,
    },
    done: {
      type: Function,
      default: () => {},
    },
    cancel: {
      type: Function,
      default: () => {},
    },
    isCancel: {
      type: Boolean,
      default: false
    },
    close: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      isShow: this.isVisible,
    };
  },
  methods: {
    closeModal() {
      this.isShow = !this.isShow;
    },
    handleClose() {
      this.closeModal();
      this.close();
    },
    handleCancel() {
      this.closeModal();
      this.cancel();
    },
  },
});
</script>

<style>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  position: relative;
  border-bottom: 1px solid #eeeeee;
  color: #4aae9b;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  flex-direction: column;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: #4aae9b;
  background: transparent;
}

.btn-green {
  color: white;
  background: #4aae9b;
  border: 1px solid #4aae9b;
  border-radius: 2px;
}
</style>
