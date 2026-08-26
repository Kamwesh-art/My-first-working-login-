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
                        <h1>   Reports</h1>
                        <v-row>
                            <v-col>
                                <v-select
                                    v-model="reportType"
                                    placeholder="Report Type"
                                    :items="[
                                        { title: 'Possessions', value: 'possessions' },
                                        { title: 'Tasks', value: 'tasks' },
                                        { title: 'Check-in / Check-out', value: 'checkin' }
                                    ]"
                                    variant="outlined"
                                />      
                            </v-col>
                            <v-col>
                                <v-text-field
                                    v-model="search"
                                    prepend-inner-icon="mdi-magnify"
                                    label="Search report"
                                    single-line
                                    hide-details
                                    density="compact"
                                    variant="outlined"
                                    clearable
                                />
                            </v-col>                                
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-text-field
                                v-model="startDate"
                                type="date"
                                label="From"
                                variant="outlined"
                                single-line
                                />
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-text-field
                                v-model="endDate"
                                type="date"
                                label="To"
                                variant="outlined"
                                single-line
                                />
                            </v-col>
                        </v-row>
                        <v-data-table
                            :headers="headers"
                            :items="filteredRecords"
                            :loading="loading"
                            >
                        </v-data-table>
                            <v-btn
                                color="primary"
                                prepend-icon="mdi-file-pdf-box"
                                @click="downloadPDF"
                                >
                                Download PDF
                            </v-btn>
                    </v-col>
                </v-row>
            </v-card>
        </v-container>
    </v-img>
</template>

<script setup>
import { ref, computed, onMounted,watch } from "vue"
import api from "@/api/axios"
import { useToast } from "vue-toastification"
// import jsPDF from "jspdf"
// import autoTable from "jspdf-autotable"

const toast = useToast()
const reportType = ref("possessions")
const records = ref([])
const search = ref("")
const startDate = ref("")
const endDate = ref("")

const loading = ref(false)
async function loadReportData() {
  loading.value = true

  try {
    let response

    if (reportType.value === "possessions") {
      response = await api.get("/api/getpossessions/")
    }
    else if (reportType.value === "tasks") {
      response = await api.get("/api/gettasks/")
    }
    else if (reportType.value === "checkin") {
      response = await api.get("/api/getcheckin/")
    }
    records.value = response.data

  } catch (error) {
    console.error("Report Error:", error)

    toast.error("Failed to load report data.")

  } finally {
    loading.value = false
  }
}
onMounted(() => {
  loadReportData()
})

watch(reportType, () => {
  loadReportData()
})
const filteredRecords = computed(() => {

  let result = records.value

  if (search.value) {
    const searchTerm = search.value.toLowerCase()

    result = result.filter(record =>
      Object.values(record).some(value =>
        String(value)
          .toLowerCase()
          .includes(searchTerm)
      )
    )
  }

  return result
})

const headers = computed(() => {
  if (reportType.value === "possessions") {
    return [
      { title: "Item's ID", key: "id" },
      { title: "Serial No.", key: "serialno" },
      { title: "Item", key: "item" },
      { title: "Quantity", key: "quantity" },
      { title: "Cost", key: "cost" }
    ]
  }

  if (reportType.value === "tasks") {
    return [
      { title: "Task", key: "task" },
      { title: "Description", key: "description" },
      { title: "ETA", key: "ETA" },
      { title: "Status", key: "status" }
    ]
  }

  return [
    { title: "User", key: "user" },
    { title: "Date", key: "date" },
    { title: "Check-in", key: "check_in" },
    { title: "Check-out", key: "check_out" }
  ]
})

function downloadPDF() {

  const doc = new jsPDF()

  doc.setFontSize(18)
  doc.text("Kamwesh Company", 14, 20)

  doc.setFontSize(14)

  const title =
    reportType.value === "possessions"
    ? "Possessions Report"
    : reportType.value === "tasks"
    ? "Tasks Report"
    : "Check-in / Check-out Report"

  doc.text(title, 14, 30)

  autoTable(doc, {
    head: [
      headers.value.map(header => header.title)
    ],
    body: filteredRecords.value.map(record =>
      headers.value.map(header =>
        record[header.key] ?? ""
      )
    ),
    startY: 40
  })

  doc.save(`${reportType.value}-report.pdf`)
}

</script>
