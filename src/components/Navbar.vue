<template>
    <v-menu>
        <template #activator="{ props }">
            <v-btn
                v-bind="props"
                variant="text"
            >
            <v-icon start>
                mdi-account-circle
            </v-icon>

            {{ username }}

            <v-icon end>
                mdi-chevron-down
            </v-icon>
            </v-btn>
        </template>

        <v-list>

            <!-- Profile -->
            <v-list-item to="/profile">
                <template #prepend>
                    <v-icon>
                        mdi-account
                    </v-icon>
                </template>

                <v-list-item-title>
                    Profile
                </v-list-item-title>
            </v-list-item>

            <v-divider></v-divider>

            <!-- Logout -->
            <v-list-item @click="logout">

                <template #prepend>
                    <v-icon>
                        mdi-power
                    </v-icon>
                </template>

                <v-list-item-title>
                    Logout
                </v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>

    <v-navigation-drawer 
    v-model= "drawer" 
    :rail="rail">
        <v-list-item title="Kamwesh Company">
            <template #append>
                <v-btn
                    :icon="rail ? 'mdi-chevron-right' : 'mdi-chevron-left'"
                    variant="text"
                    @click="rail = !rail"
                />
            </template>
        </v-list-item>
        <v-list>
            <v-list-item to="/home">
                <template #prepend>
                    <v-icon>mdi-home</v-icon>
                </template>
                <template #title>
                    Home 
                </template> 
            </v-list-item>

            <v-list-item to="/possessions"
>
                <template #prepend>
                    <v-icon>mdi-package-variant</v-icon>
                </template>
                <template #title>
                    Possessions
                </template> 
            </v-list-item>
            
            <v-list-item to="/tasks"
>
                <template #prepend>
                    <v-icon>mdi-account-hard-hat</v-icon>
                </template>
                <template #title>
                    Tasks 
                </template> 
            </v-list-item>

            <v-list-item to="/checkin">
                <template #prepend>
                    <v-icon>mdi-clipboard-text-clock-outline</v-icon>
                </template>

                <template #title>
                    Check in 
                </template> 
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>



<script setup>
import{ref} from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// collapsing and expansion functions 
const drawer =ref(true)
const rail = ref(false)

const username = ref(
    localStorage.getItem("username") || "User"
)

const logout = () => {

    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("username")

    router.push("/login")
}

</script>