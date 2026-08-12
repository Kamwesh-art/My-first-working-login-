<template> 
    <v-app>   
        <v-img 
        src="https://imgs.search.brave.com/3ImxtaV_OQaC9i13xFswujAyJmAuW63M2lvE8gNWpjQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTI4/NjQ2MjI0MC9waG90/by9saWdodC1ncmV5/LWhhbmQtcGFpbnRl/ZC10ZXh0dXJlZC1i/YWNrZHJvcC1zdHVk/aW8td2FsbC5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9X19O/SzFlTXhWcWxRT3Z4/Y3o1SklDRThKN0p6/dVdUc25lMnVIMGps/RlVHVT0"
        cover
        height='100vh'
        >  
        <v-main>
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
        </v-main>
        </v-img>
    </v-app>
</template>

<script setup>
import Navbar from '../components/Navbar.vue';

const username = localStorage.getItem("username")

</script>