<template>
    <v-app>

    <Navbar />
<v-main>
        <v-container class="fill-height">

            <v-row
                justify="center"
                align="center"
            >
                <v-col cols="12" class="text-center">

                    <h1>Welcome {{ username }}</h1>

                </v-col>

            </v-row>

        </v-container>
    </v-main>
</v-app>
</template>

<script setup>
import Navbar from '../components/Navbar.vue';

const username = localStorage.getItem("username")

</script>