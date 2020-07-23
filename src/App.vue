<template>
  <div id="app" class="h-screen overflow-hidden flex flex-col items-center justify-center">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link :to="{ name: 'Login' }" v-if="!user">Login</router-link>
      <a @click="logout" v-else>Logout</a>
    </div>
    <router-view/>
  </div>
</template>
<script>
import { Auth } from '@/firebase/auth';

export default {
  data() {
    return {
      user: null,
    };
  },
  created() {
    Auth.onAuthStateChanged((user) => {
      if (user) {
        this.user = Auth.currentUser;
      } else {
        this.user = null;
      }
    });
  },
  methods: {
    logout() {
      Auth.signOut().then(() => {
        Auth.onAuthStateChanged(() => {
          this.$router.push('/');      
        });
      });
    },
  },
};
</script>
<style src="./assets/css/index.css">
