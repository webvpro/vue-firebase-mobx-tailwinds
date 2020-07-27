<template>
    <div class="rounded-full h-12 w-12 flex items-center justify-center border-2 border-indigo-900 p-1 bg-indigo-900 mr-2">
        <LightningBoltIcon size="4x" class="text-blue-300" />
    </div>
</template>
<script>
import { LightningBoltIcon } from "@vue-hero-icons/outline" 

export default {
  name: 'logo',
  components: {
    LightningBoltIcon
  }
}
</script>