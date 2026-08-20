// src/api/axios.js

import axios from "axios"

const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
    headers:{
        "Content-Type":"application/json"
    }
})
api.interceptors.request.use((config) => {

    const token = localStorage.getItem("access")
    if (token && 
        config.url !== "login/" && 
        config.url !== "register/" &&
        config.url !== "token/refresh/"
        ){config.headers.Authorization  = `Bearer ${token}`
    }
    return config
})

// Handles expired access tokens
api.interceptors.response.use(

    // If request succeeds, do nothing
    (response) => {
        return response
    },

    // If request fails
    async (error) => {
        const originalRequest = error.config

        // Check whether Django returned 401
        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {

            originalRequest._retry = true
            const refreshToken = localStorage.getItem("refresh")

            // If there is no refresh token,
            // send the user back to login
            if (!refreshToken) {

                localStorage.removeItem("access")
                localStorage.removeItem("refresh")

                window.location.href = "/login"

                return Promise.reject(error)
            }
            try {
                // Ask Django for a new access token
                const response = await axios.post(
                    "http://127.0.0.1:8000/api/token/refresh/",
                    {
                        refresh: refreshToken
                    }
                )
                const newAccessToken = response.data.access

                // Save the new access token
                localStorage.setItem("access",newAccessToken)

                // Put the new token into the original request
                originalRequest.headers.Authorization =`Bearer ${newAccessToken}`

                // Try the original request again
                return api(originalRequest)

            } catch (refreshError) {

                console.error(
                    "Token refresh failed:",
                    refreshError
                )
                localStorage.removeItem("access")
                localStorage.removeItem("refresh")

                window.location.href = "/login"

                return Promise.reject(refreshError)
            }
        }
        return Promise.reject(error)
    }
)


export default api