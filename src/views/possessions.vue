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
                                />
                                <v-btn
                                class="ma-2"
                                icon="mdi-delete"
                                size="small"
                                variant="text"
                                color="red"
                                />
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
                                                placeholder="Serial No."
                                                v-model="serialno"
                                                Serial Number
                                                />
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                Item
                                                <v-text-field
                                                placeholder="Item"
                                                v-model="item"
                                                />
                                            </v-col>
                                        </v-row>

                                        <v-row> 
                                                <v-col cols="12" md="6">
                                                Quantity
                                                <v-text-field
                                                placeholder="Quantity"
                                                v-model="quantity"
                                                Serial Number
                                                />
                                            </v-col>
                                            <v-col cols="12" md="6">
                                                Cost
                                                <v-text-field
                                                placeholder="Cost"
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
import { ref,onMounted } from "vue"
import api from "@/api/axios"
import { useToast } from "vue-toastification"

const serialno = ref("")
const item = ref("")
const quantity = ref("")
const cost = ref("")

const savePossession = async() => {
    try{
    const payload={
            // id: Date.now(),
            serialno: serialno.value,
            item: item.value,
            quantity: quantity.value,
            cost: cost.value,

        } 
    await api.post("possessions/",payload)

        fetchPossessions()
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
    const fetchPossessions = async () => {
        try {
        const response = await api.get("possessions/")
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
const dialog = ref(false)
const toast = useToast()

</script>
