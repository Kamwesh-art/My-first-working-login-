<template>
    
        <v-img 
            src="https://imgs.search.brave.com/3ImxtaV_OQaC9i13xFswujAyJmAuW63M2lvE8gNWpjQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTI4/NjQ2MjI0MC9waG90/by9saWdodC1ncmV5/LWhhbmQtcGFpbnRl/ZC10ZXh0dXJlZC1i/YWNrZHJvcC1zdHVk/aW8td2FsbC5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9X19O/SzFlTXhWcWxRT3Z4/Y3o1SklDRThKN0p6/dVdUc25lMnVIMGps/RlVHVT0"
            cover
            height='100vh'
        >
            <v-container fluid class="fill-height d-flex align-center">
                <v-row class="fill-height ma-0 justify-center align-center">

                    <v-col cols="12" md="10" lg="8">
                        <v-card
                            class="mx-auto"
                            width="100%"
                            max-width="960"
                            min-height="620"
                            height="620"
                            elevation="10"
                            rounded="lg"
                        >
                            <v-row no-gutters class="fill-height">
                                <!-- LEFT SIDE: image -->
                                <v-col cols="12" md="6" >
                                    <v-img src="@/assets/image1.jpg"
                                      height="100%"
                                      cover
                                      > 
                                      <div class="d-flex flex-column justify-end fill-height pa-10 text-white">
                                        <h2 class="text-h4 font-weight-bold mb-3">
                                            Kamwesh Company.
                                        </h2>
                                        <p class="text-body-2">
                                            Precision Storage for Valuable Assets. Locked. Protected.
                                            Because Every Asset Counts.
                                        </p>
                                        </div>
                                    </v-img>
                                </v-col>


                                <!-- RIGHT SIDE: FORM -->
                                <v-col cols="12" md="6" class="d-flex align-center">
                                    <div class="pa-12 mx-auto" style="max-width: 420px; width: 100%;">

                                        <div v-if="isLogin">
                                            <h1 >Welcome back</h1>
                                            <p>Please enter your details.</p>

                                            <v-form ref="form">
                                                <div class="text-subtitle-2 font-weight-bold mb-1">Email/Username</div>
                                                    <v-text-field 
                                                        variant="outlined"
                                                        placeholder="Enter your email or Username"
                                                        v-model=" emailUsername"
                                                        :rules="emailRules"
                                                        prepend-inner-icon="mdi-email"
                                                        density="compact"
                                                    />
                                                    <div class="text-subtitle-2 font-weight-bold mb-1">Password</div>
                                                    <v-text-field
                                                        variant="outlined"
                                                        placeholder="Password at least 8 characters."
                                                        v-model="password"
                                                        prepend-inner-icon="mdi-lock"
                                                        :rules="passwordRules"
                                                        :type="showPassword ? 'text' : 'password'"
                                                        :append-inner-icon="
                                                                showPassword
                                                                    ? 'mdi-eye'
                                                                    : 'mdi-eye-off'
                                                            "
                                                        @click:append-inner="
                                                        showPassword = !showPassword
                                                        "
                                                        density="compact"
                                                        />
                                                        <v-btn
                                                            variant="text"
                                                            color="primary"
                                                            @click="toggleForm"
                                                            >
                                                            Forgot password?
                                                        </v-btn>

                                                        <v-btn 
                                                            block
                                                            color="primary"
                                                            @click="signin"
                                                            > 
                                                                Sign in
                                                            </v-btn>    
                                                            <div>
                                                                <span>
                                                                Don't have an account?
                                                                </span>                                                

                                                                <v-btn
                                                                    variant="text"
                                                                    color="primary"
                                                                    @click="toggleForm"
                                                                    >
                                                                    Sign up 
                                                                </v-btn>
                                                            </div>
                                              
                                            </v-form>
                                        </div>

                                      <!-- Registration Form -->
                                        <div v-else>
                                            <h2>Create Your account</h2>
                                                <div class="text-subtitle-2 font-weight-bold mb-1">Username</div>
                                                <v-text-field
                                                variant="outlined"
                                                placeholder="Enter your username"
                                                v-model="username"  
                                                :rules="userrnameRules"
                                                density="compact"
                                                />
                                                <v-form ref="form">
                                                <div class="text-subtitle-2 font-weight-bold mb-1">Email Addresss</div>
                                                <v-text-field
                                                variant="outlined"
                                                placeholder="e.g kamwesh@gmail.com"
                                                v-model="email"
                                                :rules="emailRules"
                                                density="compact"
                                                />
                                               
                                                <div class="text-subtitle-2 font-weight-bold mb-1">Password</div>
                                                <v-text-field
                                                variant="outlined"
                                                placeholder="Password at least 8 characters"
                                                v-model="password"
                                                prepend-inner-icon="mdi-lock"
                                                :rules="passwordRules"
                                                :type="showPassword ? 'text' : 'password'"
                                                :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                                @click:append-inner="showPassword = !showPassword"
                                                density="compact"
                                                />
                                                </v-form>
                                                
                                                <div class="text-subtitle-2 font-weight-bold mb-1">Department</div>
                                                <v-text-field
                                                variant="outlined"
                                                placeholder="e.g Techteam "
                                                v-model="department"
                                                :rules="departmentRules"
                                                density="compact"
                                                />
                                                <v-btn 
                                                block
                                                color="primary"
                                                @click="signup"
                                                > 
                                                    Create Account
                                                </v-btn>
                                                <span>Already have an account?</span>

                                                <v-btn
                                                variant="text"
                                                color="primary"
                                                @click="toggleForm"
                                                >
                                                Sign In
                                                </v-btn>
                                        </div>
                                    </div>
                                </v-col>   
                            </v-row>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
         </v-img>
</template>

<script setup>
import {ref} from 'vue'
import api from "@/api/axios"
import {useToast} from "vue-toastification"

//login state
const email=ref('')
const password=ref('')

//registration 
const username=ref('')
const department=ref('')
const emailUsername=ref('')

const isLogin=ref(true)
const toggleForm=()=>{
    isLogin.value=!isLogin.value
}


const signup= async () => {
    const { valid } = await form.value.validate()

    if (!valid) {
        toast.error("Please fill all required fields.")
        return
    }

    try{
        const payload = {
            username:username.value,
            email:email.value,
            password: password.value,
            department: department.value,
        }
        console.log(payload)

       const response =await api.post("register/", payload,)
        console.log(response.data)
        toast.success('Registration successful')
    }catch (error) {

    if (error.response) {

        const errors = error.response.data

        Object.values(errors).flat().forEach(message => {
            toast.error(message)
        })

    } else {

        toast.error("Something went wrong.")

    }

}
    }

//create a clear registration function
const clearRegistrationForm = () => {
    username.value = ""
    email.value = ""
    password.value = ""
    department.value = ""
}

const signin= async()=>{
    try{
        const payload ={
            username:emailUsername.value,
            password:password.value,
            }
            console.log(payload)

         const response =await api.post("login/", payload,)
        console.log(response.data)
        toast.success('Login successful')

        }catch(error){
            toast.error('Login failure')

        }
}

const form = ref(null)
const userrnameRules=[
    v=> !!v || 'Username is required'
]
const emailRules = [
    v => !!v || "Email is required",

    v => /.+@.+\..+/.test(v) || "Enter a valid email address",
]

const passwordRules = [
    v => !!v || "Password is required",

    v => v.length >= 8 || "Password must be at least 8 characters",
]
const departmentRules=[
    v=> !!v || 'Department is required'
]
const showPassword = ref(false)
const toast=useToast()


</script>