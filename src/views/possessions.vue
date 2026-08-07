<template>
            
           <v-img src="@/assets/image1.jpg"
            height="100%"
            cover 
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
                                color="primary"
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
                                    <th>Cost</th>
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


const user=ref("")
const serialno = ref("")
const item = ref("")
const quantity = ref("")
const cost = ref("")

const savePossession = () => {

    possessions.value.push({

        id: Date.now(),
        user: user.value,
        serialno: serialno.value,
        item: item.value,
        quantity: quantity.value,
        cost: cost.value,

    })

    dialog.value = false

    user.value = ""
    serialno.value = ""
    item.value = ""
    quantity.value = ""
    cost.value = ""
}

const possessions = ref([
    // {
    //     id:1,
    //     user:"Me",
    //     serialno:"4",
    //     item:"Laptop",
    //     quantity:"1",
    //     cost:"50,000",
    // },
    // {
    //     id:1,
    //     user:"Faith",
    //     serialno:"2",
    //     item:"Phone",
    //     quantity:"2",
    //     cost:"30,000",
    // },
    // {
    //     id:1,
    //     user:"Sam",
    //     serialno:"8",
    //     item:"Headphones",
    //     quantity:"1",
    //     cost:"3,000",
    //  }
]);
const fetchPossessions = async () => {
    try {
        const response = await api.get("possessions/");
        possessions.value = response.data;
    } catch (error) {
        console.error("Error fetching possessions:", error);
        toast.error("Unable to load possessions");
    }
}
const dialog = ref(false)
const toast = useToast()

</script>
