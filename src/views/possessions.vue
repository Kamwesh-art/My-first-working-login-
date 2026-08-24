<template>
    <v-img 
    src="https://imgs.search.brave.com/3ImxtaV_OQaC9i13xFswujAyJmAuW63M2lvE8gNWpjQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTI4/NjQ2MjI0MC9waG90/by9saWdodC1ncmV5/LWhhbmQtcGFpbnRl/ZC10ZXh0dXJlZC1i/YWNrZHJvcC1zdHVk/aW8td2FsbC5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9X19O/SzFlTXhWcWxRT3Z4/Y3o1SklDRThKN0p6/dVdUc25lMnVIMGps/RlVHVT0"
    cover
    height='100vh'
    >   
        <v-container>
            <v-card class="pa-5 elevation-4 rounded-lg" >
                <v-row class="align-center mb-5">
                    <v-col>
                    <h2 class="text-h5 font-weight-bold text-primary">Possessions</h2>
                    </v-col>
                
                    <v-col class="text-right">
                        <v-btn 
                        prepend-icon="mdi-plus"
                        @click="dialog=true"
                        color="grey-lighten-2"
                        >
                        Add possession
                        </v-btn>
                    </v-col>
                </v-row>

                <v-row class="mb-2">
                    <v-col cols="12" md="4">
                        <v-text-field
                        v-model="search"
                        prepend-inner-icon="mdi-magnify"
                        label="Search possessions..."
                        single-line
                        hide-details
                        density="compact"
                        variant="outlined"
                        ></v-text-field>
                    </v-col>
                </v-row>
                    <!-- </v-dialog> -->
                        <v-data-table
                            :headers="headers"
                            :items="possessions"
                            :search="search"
                            :items-per-page="5"
                            :items-per-page-options="[5, 10, 15, -1]"
                            class="elevation-1 rounded-lg"
                            hover
                            ma="2"
                            >
                            <template v-slot:item.cost="{ item }">
                                Ksh {{ Number(item.cost).toLocaleString() }}
                            </template>
                            <template v-slot:item.actions="{ item }">
                                <v-btn
                                icon="mdi-pencil"
                                size="small"
                                variant="text"
                                color="blue"
                                @click="editPossession(item)"
                                />
                                <v-btn
                                icon="mdi-delete"
                                size="small"
                                variant="text"
                                color="red"
                                @click="deletePossession(item)"
                                />
                            </template>
                        </v-data-table>

        <v-dialog v-model="editDialog" max-width="500">
          <v-card class="pa-2">
            <v-card-title class="text-h6 font-weight-bold">
              Edit Possession
            </v-card-title>

            <v-card-text>
              <v-text-field
                label="Serial Number"
                v-model="editedPossession.serialno"
                variant= "outlined"
                density="compact"
                class="mb-2"
              />
              <v-text-field
                label="Item"
                v-model="editedPossession.item"
                variant="outlined"
                density="compact"
                class="mb-2"
              />
              <v-text-field
                label="Quantity"
                v-model="editedPossession.quantity"
                type="number"
                variant="outlined"
                density="compact"
                class="mb-2"
              />
              <v-text-field
                label="Cost (Ksh)"
                v-model="editedPossession.cost"
                type="number"
                variant="outlined"
                density="compact"
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

        <v-dialog v-model="dialog" max-width="600">
          <v-card class="pa-2">
            <v-card-title class="text-h6 font-weight-bold">
              Add New Possession
            </v-card-title>

            <v-card-text>
            <v-row density="compact">
                <v-col cols="12" md="6">
                  <v-text-field
                    label="Serial Number"
                    placeholder="e.g. hepho001"
                    v-model="serialno"
                    variant="outlined"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    label="Item"
                    placeholder="e.g. Headphones"
                    v-model="item"
                    variant="outlined"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    label="Quantity"
                    placeholder="e.g. 2"
                    v-model="quantity"
                    type="number"
                    variant="outlined"
                  />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field
                    label="Cost (Ksh)"
                    placeholder="e.g. 7000"
                    v-model="cost"
                    type="number"
                    variant="outlined"
                  />
                </v-col>
            </v-row>
            </v-card-text>

            <v-card-actions>
              <v-spacer />
              <v-btn variant="text" @click="dialog = false">
                Cancel
              </v-btn>
              <v-btn color="primary" variant="elevated" @click="savePossession">
                Save
              </v-btn>
            </v-card-actions>
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
const editedPossession = ref({})

// Search & Table Data
const search = ref("")
const possessions = ref([])
const toast = useToast()

const headers = [
  { title: "ID", key: "id", sortable: true, align: "start" },
  { title: "Serial No.", key: "serialno", sortable: true },
  { title: "Item", key: "item", sortable: true },
  { title: "Quantity", key: "quantity", sortable: true },
  { title: "Cost (Ksh)", key: "cost", sortable: true },
  { title: "Actions", key: "actions", sortable: false, align: "center" }
]
const savePossession = async() => {
    // const savePossession = async () => {
    // if (!serialno.value || !item.value || !quantity.value || !cost.value) {
    //     toast.warning("Please fill in all required fields.")
    //     return
    // }
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
        toast.success("Possession added successfully!")
        await fetchPossessions()
        dialog.value = false

            serialno.value = ""
            item.value = ""
            quantity.value = ""
            cost.value = ""
    }catch(error){
        console.log("Failed to add possession. Check backend validation.",error.response?.data)
        // const errorMsg = error.response?.data?.message || "Failed to add possession. Check backend validation."
        // toast.error(errorMsg)
        }
    }

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
