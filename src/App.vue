<template>
  <layout>
    <router-view/>
  </layout>
</template>
<script>
import layout from './components/layout/default';

export default {
  components: {
    layout,
  }
};
</script>
<style src="./assets/css/index.css">
