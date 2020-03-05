<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-card-title>TOP5</v-card-title>
        <v-simple-table :fixed-header="true">
          <tbody>
          <tr v-for="(t) in top5" :key="t.key">
            <td>{{ t.key }}</td>
            <td>{{ t.text }}</td>
          </tr>
          </tbody>
        </v-simple-table>
      </v-card>
    </v-col>

    <v-col v-for="g in graphs" :key="g.id" cols="12">
      <v-card>
        <v-card-title>
          <v-row>
            <v-col cols="4">
              <v-card-title>{{ g.name }}</v-card-title>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="g.selected.from"
                type="date"
                label="From"
                prepend-icon="event"
                @click="openDatepicker('from', g)"
              />
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="g.selected.to"
                type="date"
                label="To"
                prepend-icon="event"
                @click="openDatepicker('to', g)"
              />
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text v-if="g.chartData" class="h-500px">
          <line-chart :chart-data="g.chartData" :options="chartOptions"/>
        </v-card-text>
      </v-card>
    </v-col>
    <v-dialog :max-width="dialog.width" v-model="dialog.active">
      <v-date-picker
        show-current
        no-title
        reactive
        @click:date="setPickedDate"
      />
    </v-dialog>
  </v-row>
</template>

<script>
  const range = (min, max) => Array.from(Array(max + 1).keys()).filter(n => n >= min)
  const randInt = () => Math.floor(Math.random() * (50 - 5 + 1)) + 5
  const makeTestData = () => range(1, 12).map(i => randInt())

  const TOP5 = [
    { key: 'driver_key1', text: '10000km' },
    { key: 'driver_key2', text: '1000km' },
    { key: 'driver_key3', text: '100km' },
    { key: 'driver_key4', text: '10km' },
    { key: 'driver_key5', text: '1km' },
  ]

  const GRAPHS = [
    {
      id: 'graph_1',
      name: 'グラグその1',
      chartData: null,
      selected: {
        from: null,
        to: null,
      },
    },
    {
      id: 'graph_2',
      name: 'グラグその2',
      chartData: null,
      selected: {
        from: null,
        to: null,
      },
    },
  ]

  const TYPE_FROM = 'from'
  const TYPE_TO = 'to'
  const TARGET_TYPES = [TYPE_FROM, TYPE_TO]

  export default {
    data() {
      return {
        top5: TOP5, // todo: fetch from API
        graphs: GRAPHS,
        picker: {
          type: null, // TYPE_FROM or TYPE_TO
          graphId: null,
        },
        dialog: {
          active: false,
          width: 290,
        },
      }
    },
    computed: {
      chartOptions() {
        return {
          responsive: true,
          maintainAspectRatio: false,
        }
      },
    },
    methods: {
      fetchData() {
        return {
          labels: range(1, 12).map(i => `${i}月`),
          datasets: [
            {
              label: 'Test Data1',
              animation: true,
              backgroundColor: 'rgba(255, 100, 130, 0.2)',
              data: makeTestData(),
            },
            {
              label: 'Test Data2',
              animation: true,
              backgroundColor: 'rgba(100, 130, 255, 0.2)',
              data: makeTestData(),
            },
            {
              label: 'Test Data3',
              animation: true,
              backgroundColor: 'rgba(130, 255, 100, 0.2)',
              data: makeTestData(),
            },
          ],
        }
      },
      openDatepicker(selectedType, graph) {
        if(TARGET_TYPES.includes(selectedType)) {
          this.picker.graphId = graph.id
          this.picker.type = selectedType
          this.dialog.active = true
        }
      },
      setPickedDate(pickedDate) {
        if(TARGET_TYPES.includes(this.picker.type)) {
          const currentGraph = this.graphs.find(g => g.id === this.picker.graphId)
          currentGraph.selected[this.picker.type] = pickedDate
          currentGraph.chartData = this.fetchData()
        }
        this.dialog.active = false
      },
    },
    mounted() {
      this.graphs.map(g => g.chartData = this.fetchData())
    },
  }
</script>

<style lang="scss">
  #line-chart {
    height: 500px !important;
  }
</style>
