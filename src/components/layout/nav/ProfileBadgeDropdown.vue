<template>
  <div class="nav__profile-container">
    <button @click="isOpen = !isOpen" class="nav__profile-container__btn focus:outline-none focus:border-white">
        <UserCircleIcon size="4x" class="text-indigo-900" />
    </button>
    <button v-if="isOpen" @click="isOpen = false" tabindex="-1" class="nav__profile-container__btn-mask"></button>
    <transition name='slide'>
      <div v-if="isOpen"  v-bind:class="{  
        'nav__profile-container__dropdown': true 
      }">
        <router-link to="/dashboard" @click="isOpen = false" class="nav__profile-container__dropdown__item">Dashboard</router-link>
        <router-link to="/about"  @click="isOpen = false" class="nav__profile-container__dropdown__item">Profile</router-link>
        <a href="#" @click="logout" class="nav__profile-container__dropdown__item">Sign out</a>
      </div>
    </transition>
  </div>
</template>

<script>

import { Auth } from "@/firebase/auth";
import { UserCircleIcon } from "@vue-hero-icons/solid" 

export default {
  name: 'profile-badge-dropdown',
  data() {
    return {
      isOpen: false
    }
  },
  components: {
    UserCircleIcon
  },
  created() {
    const handleEscape = (e) => {
      if (e.key === 'Esc' || e.key === 'Escape') {
        this.isOpen = false
      }
    }
    document.addEventListener('keydown', handleEscape)
    this.$once('hook:beforeDestroy', () => {
      document.removeEventListener('keydown', handleEscape)
    })
  },
  watch: {
    '$route' () {
      this.isOpen = false;
    }
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
  .nav__profile-container {
    @apply relative;
  }
  .nav__profile-container__btn {
    @apply relative z-10 block;
    @apply rounded-full h-12 w-12;
    @apply flex items-center justify-center;
    @apply border-2 border-indigo-900;
    @apply p-1 bg-blue-300 mr-2;
  }
  .nav__profile-container__btn-mask {
    @apply fixed inset-0 h-full;
    @apply w-full bg-black opacity-50;
    @apply cursor-default;
  }
  .nav__profile-container__dropdown {
    @apply absolute right-0 mt-2 py-2;
    @apply w-48 bg-white rounded-lg shadow-xl;
    transform-origin: top;
    transition: transform .4s ease-in-out;
  }
  
  .nav__profile-container__dropdown__item {
    @apply block px-4 py-2 text-gray-800;
  }
  .nav__profile-container__dropdown__item:hover {
    @apply bg-indigo-500 text-white;
  }
  .slide-enter, .slide-leave-to{
      transform: scaleY(0);
  }
</style>