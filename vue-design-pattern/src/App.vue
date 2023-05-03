<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/"
          >Login Form (Builder Pattern & Chain of responsibility)</RouterLink
        >
        <RouterLink to="/sign-up"
          >Sign Up Form (Builder Pattern & Chain of responsibility)</RouterLink
        >
        <RouterLink to="/list">Table list (Chain of responsibility)</RouterLink>
      </nav>
    </div>
  </header>
  <br />
  <RouterView />
  <component :is="step" />
</template>

<script lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { defineComponent, shallowRef } from "vue";
import { Step } from "./chains/Chain";
import Message from "@/chains/Message.vue";

export default defineComponent({
  components: {
    RouterLink,
    RouterView,
  },
  data() {
    return {
      component: null,
      step: null,
    };
  },
  watch:{
      $route (to: any, from: any){
        console.log('to:', to, "/from:", from)
      }
  },
  created() {
    const message = new Step(Message);
    this.emitter.on('loginDone', (evt: any) => {
      const data = evt
      console.log('received from:', data)
      this.step = shallowRef(message.show({ message: `We received form submission from login page: ${data}` }));
    })
  }
})
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}
nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
  color: gray;
}
nav a.router-link-exact-active {
  color: rgb(88, 146, 1);
}
nav a.router-link-exact-active:hover {
  color: rgb(77, 128, 2);
}
nav a {
  display: inline-block;
  padding: 0 1rem;
  color: gray;
}
nav a:first-of-type {
  border: 0;
}
</style>