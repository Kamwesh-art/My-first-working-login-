<template>
    <v-navigation-drawer v-model= "drawer" permanent>
        <v-img 
            src="https://imgs.search.brave.com/3ImxtaV_OQaC9i13xFswujAyJmAuW63M2lvE8gNWpjQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTI4/NjQ2MjI0MC9waG90/by9saWdodC1ncmV5/LWhhbmQtcGFpbnRl/ZC10ZXh0dXJlZC1i/YWNrZHJvcC1zdHVk/aW8td2FsbC5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9X19O/SzFlTXhWcWxRT3Z4/Y3o1SklDRThKN0p6/dVdUc25lMnVIMGps/RlVHVT0"
            cover
            height='100vh'
        >
        <v-text>
            <h1> Kamwesh Company</h1>
        </v-text>
        <v-spacer></v-spacer>
        <v-list>
                 <v-list-item to="/profile"
>
                <template #prepend >
                    <v-icon>mdi-account</v-icon>
                </template>

                <template #title>
                    Profile 
                </template> 

            </v-list-item to="/profile"
>
               <v-list-item to="/profile"
>
                <template #prepend>
                    <v-icon>mdi-home</v-icon>
                </template>

                <template #title>
                    Home 
                </template> 
            </v-list-item>

            <v-list-item>
                <template #prepend>
                    <v-icon>mdi-package-variant</v-icon>
                </template>

                <template #title>
                    Possessions
                </template> 
            </v-list-item>
            
             <v-list-item>
                <template #prepend>
                    <v-icon>mdi-account-hard-hat</v-icon>
                </template>

                <template #title>
                    Tasks 
                </template> 
            </v-list-item>
 
            <v-list-item>
                <template #prepend>
                    <v-icon>mdi-clipboard-text-clock-outline</v-icon>
                </template>

                <template #title>
                    Checkin 
                </template> 
            </v-list-item>

            <v-list-item
            variant="text"
            to="/profile"
            text="Profile"
            />
        </v-list>
        </v-img>
    
    </v-navigation-drawer>
    

</template>
<script setup>

import{ref} from "vue"
const drawer =ref(true)

</script>