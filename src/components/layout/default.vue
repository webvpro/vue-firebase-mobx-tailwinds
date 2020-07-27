<template>
  <div>
    <nav class="nav">
        <div class="nav__container">
            <router-link to="/" class="nav__container__item md:w-1/3 justify-center md:justify-start">
                <logo />
            </router-link>
            <div class="nav__container__item md:w-1/3 justify-center">
                     
            </div>
            <div class="nav__container__item md:w-1/3 md:justify-end">
                <router-link :to="{ name: 'Login' }" v-if="!user" tag="button" class="btn btn--primary w-32 mr-1 focus:outline-none focus:border-0">
                  Login
                </router-link>
                <profile-badge-dropdown v-else />
            </div>
        </div>
    </nav>
    <div class="flex flex-col md:flex-row  min-h-screen w-screen p-6 pt-24 bg-indigo-900 text-blue-300">
        <slot />
    </div>
  </div>
</template>

<script>
import { Auth } from '@/firebase/auth';
import logo from '../layout/nav/logo'
import ProfileBadgeDropdown from '../layout/nav/ProfileBadgeDropdown'
export default {
  name: 'layout',
  components: {
      logo,
      ProfileBadgeDropdown,
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
<style>
    .logout-link {
      @apply text-blue-400;
    }
</style>