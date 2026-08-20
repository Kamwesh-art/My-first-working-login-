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
                    <h2>Possessions</h2>
                    </v-col>
                
                    <v-col class="text-right">
                        <v-btn 
                        @click="dialog=true"
                        color="grey-lighten-2"
                        >
                        Add possession
                        </v-btn>
                    </v-col>
                </v-row>

                <v-data-table>
                    <thead>
                        <tr>
                            <th>Serial No.</th>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Cost(Ksh)</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr
                        v-for="item in possessions"
                        :key="item.id"
                        >
                            <td>{{ item.serialno}}</td>
                            <td>{{ item.item }}</td>
                            <td>{{ item.quantity }}</td>
                            <td>{{ item.cost }}</td>
                            
                            <td>
                                <v-btn
                                class="ma-2"
                                icon="mdi-pencil"
                                size="small"
                                variant="text"
                                color="blue"
                                @click="editPossession(item)"
                                />

                                <v-dialog v-model="editDialog" max-width="500">

                                        <v-card>
                                            <v-card-title>
                                                Edit Possession
                                            </v-card-title>

                                            <v-card-text>
                                                <v-text-field
                                                    label="Serial Number"
                                                    v-model="editedPossession.serialno"
                                                />
                                                <v-text-field
                                                    label="Item"
                                                    v-model="editedPossession.item"
                                                />
                                                <v-text-field
                                                    label="Quantity"
                                                    v-model="editedPossession.quantity"
                                                    type="number"
                                                />
                                                <v-text-field
                                                    label="Cost"
                                                    v-model="editedPossession.cost"
                                                    type="number"
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
                                @click="deletePossession(item)"
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
                            Possession
                            </v-card-title>

                            <v-card-text>
                                <v-row>
                                    <v-col cols="12" md="6">
                                        Serial Number
                                        <v-text-field
                                        placeholder="hepho001"
                                        v-model="serialno"
                                        />
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        Item
                                        <v-text-field
                                        placeholder="e.g Headphones"
                                        v-model="item"
                                        />
                                    </v-col>
                                </v-row>

                                <v-row> 
                                        <v-col cols="12" md="6">
                                        Quantity
                                        <v-text-field
                                        placeholder="e.g 2"
                                        v-model="quantity"
                                        Serial Number
                                        />
                                    </v-col>
                                    <v-col cols="12" md="6">
                                        Cost
                                        <v-text-field
                                        placeholder="7,000"
                                        v-model="cost"
                                        />
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
                                    @click="savePossession"
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

const editDialog = ref(false)
const serialno = ref("")
const item = ref("")
const quantity = ref("")
const cost = ref("")
const dialog = ref(false)
const toast = useToast()
const editedPossession = ref({})


const savePossession = async() => {
    try{
        const userId = getUserIdFromToken()
        const payload={
            // id: Date.now(),
            serialno: serialno.value,
            item: item.value,
            quantity: quantity.value,
            cost: cost.value,
            } 
        await api.post(`addpossessions/${userId}/`,payload)
        await fetchPossessions()
        dialog.value = false

            serialno.value = ""
            item.value = ""
            quantity.value = ""
            cost.value = ""
            }
    catch(error){
        console.log(error.response?.data)
        }
    }

const possessions = ref([]);
// user_id = localStorage.getItem("user_id")
// console.log("User ID", user_id)
const fetchPossessions = async () => {
    try {
        const userId = getUserIdFromToken()

        console.log("User ID:", userId)

        const response = await api.get(`getpossessions/${userId}`)
        console.log('Possessions:', response.data)
        possessions.value = response.data

    } catch (error) {
        console.error("Error fetching possessions:", error)
        toast.error("Unable to load possessions")
    }
}

onMounted(() => {
    fetchPossessions()
})

const editPossession=(item)=>{
    editedPossession.value = {
        id: item.id,
        serialno: item.serialno,
        item: item.item,
        quantity: item.quantity,
        cost: item.cost
    }
    editDialog.value = true
}


const saveEdit = async () => {
    try {
        const userId = getUserIdFromToken()

        await api.put(`updatepossessions/${userId}/`, editedPossession.value)
        toast.success("Possession updated successfully")

        editDialog.value = false
        await fetchPossessions()

    } catch (error) {
        console.error(error)
        toast.error("Unable to update possession")
    }
}
const deletePossession = async (item) => {
       const confirmed = confirm(
        `Are you sure you want to delete ${item.item}?`
        )

    if (!confirmed) {
        return
    }
    try {
        await api.delete(`deletepossession/${item.id}/`,possessions.data)

        toast.success("Possession deleted successfully")
        await fetchPossessions()

    } catch (error) {
        console.error(error)
        toast.error("Unable to delete possession")
    }
}


</script>
