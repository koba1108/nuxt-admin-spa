<template>
  <v-card>
    <v-card-title>
      Charger List
      <v-spacer/>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
        class="mr-4"
      />
      <v-btn color="info" @click="goAddPage">Add</v-btn>
    </v-card-title>
    <v-card-text>
      <v-data-table
        :search="search"
        :loading="chargerStations.length < 1"
        :headers="headers"
        :footer-props="footerProps"
        :items="chargerStations"
        no-data-text="no data."
      >
        <template v-slot:item.action="{ item }">
          <v-btn nuxt small text :to="`/dashboard/charger/edit/${item.id}`">
            <v-icon>mdi-table-edit</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data() {
      return {
        search: '',
        headers: [
          { text: 'id', align: 'left', value: 'id' },
          { text: 'name', align: 'left', value: 'name' },
          { text: 'cs_id', align: 'left', value: 'cs_id' },
          { text: 'longitude', align: 'left', value: 'longitude' },
          { text: 'latitude', align: 'left', value: 'latitude' },
          { text: 'edit', align: 'center', sortable: false, value: 'action' },
        ],
        footerProps: {
          'items-per-page-options': [100, 200, 300, 400, 500],
          showFirstLastPage: true,
        },
        chargerStations: [],
      }
    },
    methods: {
      goAddPage() {
        this.$router.push('/dashboard/charger/add')
      },
      goEditPage(id) {
        this.$router.push(`/dashboard/charger/edit/${id}`)
      },
      async fetchChargerStations() {
        const { docs } = await this.$db.collection('chargerStations').get()
        this.chargerStations = docs.map(doc => doc.data())
      },
    },
    mounted() {
      this.fetchChargerStations()
    },
  }
</script>
