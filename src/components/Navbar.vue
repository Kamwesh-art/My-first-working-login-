<template>
    <!-- top app bar -->
    <v-app-bar
        height="64"
        elevation="2"
        color="grey-darken-3"
        style="background-color:whitesmoke ;"
        >
        <v-btn
        icon="mdi-menu"
        variant="text"
        color="black"
        @click="rail = !rail"
        />

        <v-spacer></v-spacer>
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
            <v-list min-width="250">

                <!-- User information -->
                <v-list-item>
                    <template #prepend>
                        <v-icon>mdi-account-circle</v-icon>
                    </template>

                    <v-list-item-title class="font-weight-bold">
                        {{ username }}
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        {{ email }}
                    </v-list-item-subtitle>
                </v-list-item>

                <v-divider />

                <!-- Logout -->
                <v-list-item @click="logout">
                    <template #prepend>
                        <v-icon>mdi-power</v-icon>
                    </template>

                    <v-list-item-title>
                        Logout
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-app-bar>

    <!-- Navigation drawer  -->
    <v-navigation-drawer
        v-model= "drawer" 
        :rail="rail"
        rounded="xl"
    >
        <v-list-item
            to="/profile"
            rounded="xl"
            >
            <template #prepend>
                <v-icon size="28">
                    mdi-account-circle
                </v-icon>
            </template>

            <template #title>
                Profile
            </template>
        </v-list-item>

        <!-- Navigation bar -->
        <v-list>
            <v-list-item to="/" rounded="xl">
                <template #prepend>
                    <v-icon>mdi-home</v-icon>
                </template>
                <template #title>
                    Home 
                </template> 
            </v-list-item>

            <v-list-item to="/possessions" rounded="lg">
                <template #prepend>
                    <v-icon>mdi-package-variant</v-icon>
                </template>
                <template #title>
                    Possessions
                </template> 
            </v-list-item>
                        
            <v-list-item to="/tasks" rounded="lg">
                <template #prepend>
                    <v-icon>mdi-account-hard-hat</v-icon>
                </template>
                <template #title>
                    Tasks 
                </template> 
            </v-list-item>

            <v-list-item to="/checkin" rounded="lg">
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
const email = ref(
    localStorage.getItem("email") || ""
)

const logout = () => {

    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("username")
    localStorage.removeItem("email")

    router.push("/login")
}

</script>