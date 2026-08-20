<template>
    <v-img 
    src="https://imgs.search.brave.com/3ImxtaV_OQaC9i13xFswujAyJmAuW63M2lvE8gNWpjQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTI4/NjQ2MjI0MC9waG90/by9saWdodC1ncmV5/LWhhbmQtcGFpbnRl/ZC10ZXh0dXJlZC1i/YWNrZHJvcC1zdHVk/aW8td2FsbC5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9X19O/SzFlTXhWcWxRT3Z4/Y3o1SklDRThKN0p6/dVdUc25lMnVIMGps/RlVHVT0"
    cover
    height='100vh'
    >   
        <v-container>
            <v-card class="pa-5">
                <v-row class="align-center mb-5">
                    <v-col>
                    <h2>Tasks</h2>
                    </v-col>
                
                    <v-col class="text-right">
                        <v-btn 
                        @click="dialog=true"
                        color="grey-lighten-2"
                        >
                        Add task
                        </v-btn>
                    </v-col>
                </v-row>

                <v-data-table>
                    <thead>
                        <tr>
                            <th>Task No.</th>
                            <th>Task</th>
                            <th>Description</th>
                            <th>ETA</th>
                            <th>Is Done</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr
                        v-for="(task,index) in task"
                        :key="task.id || index"
                        >
                            <td>{{ index + 1 }}</td>
                            <td>{{ task.task}}</td>
                            <td>{{ task.description }}</td>
                            <td>{{ task.ETA }}</td>
                            <td>{{ task.is_done ? 'Yes':'No' }}</td>
                            
                            <td>
                                <v-btn
                                class="ma-2"
                                icon="mdi-pencil"
                                size="small"
                                variant="text"
                                color="blue"
                                @click="editTask(task)"
                                />

                                <v-dialog v-model="editDialog" max-width="500">

                                        <v-card>
                                            <v-card-title>
                                                Edit Task
                                            </v-card-title>

                                            <v-card-text>
                                                <v-text-field
                                                    label="Task"
                                                    v-model="editedTask.task"
                                                />
                                                <v-text-field
                                                    label="Description"
                                                    v-model="editedTask.description"
                                                />
                                                <v-text-field
                                                    label="ETA"
                                                    v-model="editedTask.ETA"
                                                    type="number"
                                                />
                                                <v-text-field
                                                    label="Is done"
                                                    v-model="editedTask.is_done"
                                                />

                                            </v-card-text>

                                            <v-card-actions>
                                                <v-spacer />
                                                <v-btn
                                                    @click="editDialog = false"
                                                >
                                                    Cancel
                                                </v-btn>

                                                <v-btn
                                                    color="primary"
                                                    @click="saveEdit"
                                                >
                                                    Save
                                                </v-btn>

                                            </v-card-actions>

                                        </v-card>

                                    </v-dialog>

                                <v-btn
                                class="ma-2"
                                size="small"
                                variant="text"
                                color="red"
                                @click="deleteTask(item)"
                                >
                                    <v-icon color="red">mdi-delete</v-icon>
                                </v-btn>

                            </td>
                        </tr>
                    </tbody>
                </v-data-table>

                <!-- creation of a table dialog -->
                    <v-dialog
                        v-model="dialog"
                        max-width="600"
                        >
                        <v-card>

                            <v-card-title>
                             Add Task
                            </v-card-title>

                            <v-card-text>
                                <v-row>
                                    <v-col cols="12" md="6">
                                        Task 
                                        <v-text-field
                                        placeholder="e.g Development"
                                        v-model="task"
                                        />
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        Description
                                        <v-text-field
                                        placeholder="e.g Frontend"
                                        v-model="description"
                                        />
                                    </v-col>
                                </v-row>

                                <v-row> 
                                        <v-col cols="12" md="6">
                                        ETA
                                        <v-text-field
                                        placeholder="e.g Hours/Days"
                                        v-model="ETA"
                                        type="number"
                                        />
                                    </v-col>
                                    <v-col cols="12" md="6">
                                       <v-checkbox label="Is Done" v-model="is_done" />
                                    </v-col>
                                </v-row>

                                <v-card-actions>
                                    <v-spacer/>
                                    <v-btn
                                    text
                                    @click="dialog=false"
                                    >
                                    Cancel
                                    </v-btn>

                                    <v-btn
                                    color="primary"
                                    @click="saveTask"
                                    >
                                    Save
                                    </v-btn>

                                </v-card-actions>

                            </v-card-text>

                        </v-card>

                    </v-dialog>

            </v-card>
        </v-container>
    </v-img>
</template>

<script setup>
import api from "@/api/axios"
import { ref,onMounted } from "vue"
import { useToast } from "vue-toastification"
import { getUserIdFromToken } from "@/utils/auth"

const tasks = ref([])
const dialog = ref(false)
const editDialog = ref(false)

const taskName = ref("")
const description = ref("")
const ETA = ref("")
const is_done = ref("")
const editedTask = ref({})

const toast = useToast()

const saveTask = async() => {
    try{
        const userId = getUserIdFromToken()
        const payload={
            // id: Date.now(),
            task: taskName.value,
            description: description.value,
            ETA: ETA.value,
            is_done: is_done.value,
            } 
        await api.post(`addTasks/${userId}/`,payload)
        toast.success("Task added successfully")
        await fetchTasks()

        dialog.value = false
            taskName.value = ""
            description.value = ""
            ETA.value = ""
            is_done.value = false
            }
    catch(error){
        console.log(error.response?.data)
        toast.error("Failed to add task")
        }
    }

// const tasks = ref([])
// user_id = localStorage.getItem("user_id")
// console.log("User ID", user_id)
const fetchTasks = async () => {
    try {
        const userId = getUserIdFromToken()
        // console.log("User ID:", userId)

        const response = await api.get(`getTasks/${userId}`)
        console.log('Tasks:', response.data)
        tasks.value = response.data

    } catch (error) {
        console.error("Error fetching tasks:", error)
        toast.error("Unable to load tasks")
    }
}

onMounted(() => {
    fetchTasks()
})

const editTask=(task)=>{
    editedTask.value = {
        id: task.id,
        task: task.task,
        description: task.description,
        ETA: task.ETA,
        is_done: task.is_done
    }
    editDialog.value = true
}


const saveEdit = async () => {
    try {
        const userId = getUserIdFromToken()
        await api.put(`updatetasks/${userId}/`, editedTask.value)
        toast.success("Task updated successfully")

        editDialog.value = false
        await fetchTasks()
    } catch (error) {
        console.error(error)
        toast.error("Unable to update task")
    }
}
const deleteTask = async (task) => {
       const confirmed = confirm(
        `Are you sure you want to delete ${task.task}?`
        )

    if (!confirmed) {
        return
    try {
        await api.delete(`deletetask/${task.id}/`,task.data)

        toast.success("Task deleted successfully")
        await fetchTasks()

    } catch (error) {
        console.error(error)
        toast.error("Unable to delete task")
    }
    }
}
</script>

