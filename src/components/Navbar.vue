<template>
    <v-navigation-drawer v-model= "drawer" permanent>
        <v-text>
            <h1> Kamwesh Company</h1>
        </v-text>
        <v-spacer></v-spacer>
        <v-list>
            <v-list-item 
            variant="text"
            to="/home"
            text="Home"
            />

            <v-list-item
            variant="text"
            to="/possessions"
            text="Possessions"
            />
            
            <v-list-item
            variant="text"
            to="/task"
            text="Tasks"
            />

            <v-list-item
            variant="text"
            to="/checkin"
            text="Checkin"
            />

            <v-list-item
            variant="text"
            to="/profile"
            text="Profile"
            />
        </v-list>
    </v-navigation-drawer>
    

</template>
<script setup>

import{ref} from "vue"
const drawer =ref(true)

</script>