<template>
  
  <v-app>
    
    <Navbar v-if="route.path !== '/login'"  />
    <v-main>

      <router-view />

    </v-main>
  </v-app>
</template>

<script setup>
import Navbar from './components/Navbar.vue';
import { useRoute } from "vue-router"

const route = useRoute()

</script>
