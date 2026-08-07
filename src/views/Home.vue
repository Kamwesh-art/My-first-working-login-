<template>
     <v-app>    
        <v-main>
            <v-img src="@/assets/image1.jpg"
            height="100%"
            cover
            > 
                <v-container class="fill-height">
                    <v-row
                        justify="center"
                        align="center"
                    >
                        <v-col cols="12" class="text-center">
                            <h1 color="white">Welcome {{ username }}</h1>
                        </v-col>
                    </v-row>
                </v-container>
            </v-img>
        </v-main>
    </v-app>
</template>

<script setup>
import Navbar from '../components/Navbar.vue';

const username = localStorage.getItem("username")

</script>