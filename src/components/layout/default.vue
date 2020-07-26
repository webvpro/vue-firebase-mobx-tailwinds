<template>
  <fragment>
    <nav>
        <div class="nav-container md:pt-1">
            <router-link to="/" class="nav-item md:w-1/3 justify-center md:justify-start">
                <logo />
            </router-link>
        </div>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link :to="{ name: 'Login' }" v-if="!user">Login</router-link>
        <a @click="logout" v-else>Logout</a>     
    </nav>    
    <div class="flex flex-col md:flex-row">
        <slot />
    </div>
  </fragment>
</template>

<script>
import { Auth } from '@/firebase/auth';
import { Fragment as fragment } from 'vue-fragment'
import logo from '../layout/nav/logo'
export default {
  name: 'layout',
  components: {
      logo,
      fragment,
  },
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
}
</script>