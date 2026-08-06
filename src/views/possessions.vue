<template>
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

            <v-table>
                <thead>
                    <tr>

                        <th>User</th>
                        <th>Serial No.</th>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Cost</th>
                    </tr>
                </thead>

                <tbody>
                    <tr
                    v-for="item in possessions"
                    :key="item.id"
                    >
                        <td>{{ item.user }}</td>
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
            </v-table>

            <!-- creation of a table dialog -->
                <v-dialog
                    v-model="dialog"
                    max-width="600"
                    >
                    <v-card>

                        <v-card-title>

                         {{username}} Possession

                        </v-card-title>

                        <v-card-text>
                            <v-text-field
                            label="User"
                            v-model="user"
                            />

                            <v-text-field
                            label="Serial No."
                            v-model="serialno"
                            />

                            <v-text-field
                            label="Item"
                            v-model="item"
                            />

                            <v-text-field
                            label="Quantity"
                            v-model="quantity"
                            />
                            
                            <v-text-field
                            label="Cost"
                            v-model="cost"
                            />



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
</template>
<script setup>
import { ref,onMounted } from "vue"
import api from "@/api/axios"


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

</script>
