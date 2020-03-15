<template>
  <v-row>
    <driver-top5/>
    <graph-wrapper>
      <graph-header
        slot="header"
        title="TDT"
        :from="from"
        :to="to"
        :unit="currentUnit"
        :select-items="vehicleIds"
        :selected="currentVehicleId"
        @itemSelected="setCurrentVehicle"
        @fromSelected="setFromDate"
        @toSelected="setToDate"
        @unitSelected="setUnit"
      />
      <template slot="chart">
        <v-skeleton-loader
          v-if="loading"
          slot="chart"
          class="mx-auto"
          type="card"
          tile
        />
        <tdt-graph
          v-else-if="chartLogs.length > 0"
          :unit="currentUnit"
          :logs="chartLogs"
          :current-vehicle="currentVehicle"
        />
        <v-card-title v-else>data not found.</v-card-title>
      </template>
      <!-- todo: 総走行距離 0スタートで右肩上がり（1件目の値を引いた数をプロットする）-->
      <!-- todo: SOCのグラフ @単位の最終値でまるめる -->
    </graph-wrapper>
  </v-row>
</template>

<script>
  import { COLLECTION_NAME_BATTERY_LOG, UNIT_TYPES } from '~/model/define'

  export default {
    data() {
      const today = this.$moment().format('YYYY-MM-DD')
      return {
        loading: true,
        from: today,
        to: today,
        batteryLogs: [],
        currentUnit: UNIT_TYPES[0],
        currentVehicleId: '',
        vehicleList: [],
      }
    },
    computed: {
      vehicleIds() {
        const vno2Num = (str) => Number(str.replace('VNo', ''))
        return this.arrayUnique(this.vehicleList.map(v => v.vehiclenumber)).
          sort((a, b) => vno2Num(a) > vno2Num(b) ? 1 : -1)
      },
      currentVehicle() {
        return this.currentVehicleId
          ? this.vehicleList.find(v => v.vehiclenumber === this.currentVehicleId)
          : null
      },
      chartLogs() {
        const from = this.from + ' 00:00:00'
        const to = this.to + ' 23:59:59'
        return this.batteryLogs.
          // from でフィルター
          filter(bl => this.$moment(from).unix() <= bl.UpdatedAt.seconds).
          filter(bl => this.$moment(to).unix() >= bl.UpdatedAt.seconds)
      },
    },
    methods: {
      async setVehicleList() {
        const { data } = await this.$vehicleList.get()
        this.vehicleList = data.Data
      },
      setCurrentVehicle(vid) {
        this.currentVehicleId = vid ? vid : ''
      },
      setFromDate(from) {
        this.from = from
      },
      setToDate(to) {
        this.to = to
      },
      setUnit(unit) {
        this.currentUnit = unit
      },
      async fetchLogs() {
        const docs = await this.$db.collectionGroup(COLLECTION_NAME_BATTERY_LOG).get()
        const batteryLogs = []
        docs.forEach(doc => batteryLogs.push(doc.data()))
        this.batteryLogs = batteryLogs.sort((a, b) => a.UpdatedAt > b.UpdatedAt ? 1 : -1)
        this.loading = false
      },
    },
    mounted() {
      this.setVehicleList()
      this.fetchLogs()
    },
  }
</script>

<style lang="scss">
  #line-chart {
    height: 500px !important;
  }
</style>
