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
                    <h2 class="text-h5 font-weight-bold text-primary">Tasks</h2>
                    </v-col>
                
                    <v-col class="text-right">
                        <v-btn 
                        prepend-icon="mdi-plus"
                        @click="dialog=true"
                        color="grey-lighten-2"
                        >
                        Add task
                        </v-btn>
                    </v-col>
                </v-row>
                <v-row class="mb-2">
                    <v-col cols="12" md="4">
                        <v-text-field
                        v-model="search"
                        prepend-inner-icon="mdi-magnify"
                        label="Search tasks..."
                        single-line
                        hide-details
                        density="compact"
                        variant="outlined"
                        ></v-text-field>
                    </v-col>
                </v-row>

                 <v-data-table
                        :headers="headers"
                        :items="tasks"
                        :search="search"
                        :items-per-page="5"
                        :items-per-page-options="[5, 10, 15, -1]"
                        class="elevation-1 rounded-lg"
                        hover
                        ma="2"
                        >
                        <template v-slot:item.actions="{ item }">
                            <v-btn
                            icon="mdi-pencil"
                            size="small"
                            variant="text"
                            color="blue"
                            @click="editTask(item)"
                            />
                            <v-btn
                            icon="mdi-delete"
                            size="small"
                            variant="text"
                            color="red"
                            @click="deleteTask(item)"
                            />
                        </template>
                </v-data-table>
                

                <!-- creation of a table dialog -->
                <!-- edit task dialog -->
                <v-dialog v-model="editDialog" max-width="500">
                    <v-card class="pa-2">
                        <v-card-title class="text-h6 font-weight-bold">
                        Edit Task
                        </v-card-title>

                        <v-card-text>
                        <v-text-field
                            label="Task Name "
                            v-model="editedTask.taskName"
                            variant= "outlined"
                            density="compact"
                            class="mb-2"
                        />
                        <v-text-field
                            label="Description"
                            v-model="editedTask.Description"
                            variant="outlined"
                            density="compact"
                            class="mb-2"
                        />
                        <v-text-field
                            label="ETA"
                            v-model="editedTask.ETA"
                            variant="outlined"
                            density="compact"
                            class="mb-2"
                        />
                        <v-checkbox
                            label="IsDone "
                            v-model="editedTask.is_done"
                        />
                        </v-card-text>

                        <v-card-actions>
                        <v-spacer />
                        <v-btn variant="text" @click="editDialog = false">
                            Cancel
                        </v-btn>
                        <v-btn color="primary" variant="elevated" @click="saveEdit">
                            Save
                        </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

                <v-dialog
                    v-model="dialog"
                    max-width="600"
                    >
                    <v-card>
                        <v-card-title>
                            Add New Task
                        </v-card-title>

                        <v-card-text>
                            <v-row>
                                <v-col cols="12" md="6">
                                    Task 
                                    <v-text-field
                                    placeholder="e.g Development"
                                    v-model="taskName"
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

const tasksName = ref([])
const dialog = ref(false)
const editDialog = ref(false)

const search = ref("")
const tasks=ref([])

const taskName = ref("")
const description = ref("")
const ETA = ref("")
const is_done = ref(false)
const editedTask = ref({})

const toast = useToast()
const headers = [
  { title: "ID", key: "id", sortable: true, align: "start" },
  { title: "Task Name.", key: "task", sortable: true },
  { title: "Description", key: "description", sortable: true },
  { title: "ETA", key: "ETA", sortable: false },
  { title: "Isdone", key: "cost", sortable: false },
  { title: "Actions", key: "actions", sortable: false, align: "center" }
]

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

const fetchTasks = async () => {
    try {
        const userId = getUserIdFromToken()
        console.log("User ID:", userId)

        const response = await api.get(`gettasks/${userId}/`)
        console.log("Status:", response.status)
        console.log('Tasks:', JSON.stringify(response.data, null, 2))
        tasks.value = response.data

    } catch (error) {
        console.error("Error fetching tasks:", error)
        console.error("Response:", error.response?.data)
        console.error("Status:", error.response?.status)
        console.error("DATA:", error.response?.data)
        console.error("URL:", error.config?.url)
        toast.error("Unable to load tasks!")
    }
}

onMounted(() => {
    fetchTasks()
})

const editTask=(task)=>{
    editedTask.value = {
        id: task.id,
        taskName: task.Name,
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
        toast.success("Task updated successfully.")

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
    }
    try {
        await api.delete(`deletetask/${task.id}/`)

        toast.success("Task deleted successfully")
        await fetchTasks()

    } catch (error) {
        console.error(error)
        toast.error("Unable to delete task")
    }
}

</script>

