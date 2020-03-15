<template>
  <v-row>
    <driver-top5/>
    <graph-wrapper>
      <graph-header
        slot="header"
        title="TDT"
        :from="from"
        :to="to"
        :unit="unit"
        :select-items="vehicleIds"
        :selected="currentVehicleId"
        @itemSelected="setCurrentVehicle"
        @fromSelected="setFromDate"
        @toSelected="setToDate"
        @unitSelected="setUnit"
      />
      <template slot="chart">
        <!-- todo: 総走行距離 0スタートで右肩上がり（1件目の値を引いた数をプロットする）-->
        <v-skeleton-loader
          v-if="loading"
          type="card"
          class="mx-auto"
          tile
        />
        <graph-tdt
          v-else-if="chartLogs.length > 0"
          :logs="chartLogs"
          :unit="unit"
        />
        <v-card-title v-else>data not found.</v-card-title>
      </template>
    </graph-wrapper>
    <graph-wrapper>
      <graph-header
        slot="header"
        title="SOC"
        :from="from"
        :to="to"
        :unit="unit"
        :select-items="vehicleIds"
        :selected="currentVehicleId"
        @itemSelected="setCurrentVehicle"
        @fromSelected="setFromDate"
        @toSelected="setToDate"
        @unitSelected="setUnit"
      />
      <template slot="chart">
        <!-- todo: SOCのグラフ @単位の最終値でまるめる -->
        <v-skeleton-loader
          v-if="loading"
          type="card"
          class="mx-auto"
          tile
        />
        <graph-soc
          v-else-if="chartLogs.length > 0"
          :logs="chartLogs"
          :unit="unit"
        />
        <v-card-title v-else>data not found.</v-card-title>
      </template>
    </graph-wrapper>
  </v-row>
</template>

<script>
  import { UNIT_HOUR } from '~/model/define'

  export default {
    data() {
      const today = this.$moment().format('YYYY-MM-DD')
      return {
        loading: true,
        from: today,
        to: today,
        logs: [],
        unit: UNIT_HOUR,
        currentVehicleId: '',
        vehicleList: [],
      }
    },
    computed: {
      vehicleIds() {
        const prefix = 'TMS' // 'VNo'
        const key = 'tms' // 'vehiclenumber'
        const keyToNum = (str) => Number(str.replace(prefix, ''))
        return this.arrayUnique(this.vehicleList.map(v => v[key])).
          filter(tms => tms !== 'TMS........').
          sort((a, b) => keyToNum(a) > keyToNum(b) ? 1 : -1)
      },
      currentVehicle() {
        const key = 'tms'
        return this.currentVehicleId
          ? this.vehicleList.find(v => v[key] === this.currentVehicleId)
          : null
      },
      chartLogs() {
        return this.logs.filter(l => this.currentVehicle ? l.TID === this.currentVehicle.tms : true).
          map(l => {
            return {
              TID: l.TID,
              TIME: l.TIME.value,
              TDT: l.TDT,
              SOC: l.SOC,
            }
          })
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
        this.fetchLogs()
      },
      setToDate(to) {
        this.to = to
        this.fetchLogs()
      },
      setUnit(unit) {
        this.unit = unit
        this.fetchLogs()
      },
      async fetchLogs() {
        this.loading = true
        const { data } = await this.$battery.logs({
          unit: this.unit,
          from: this.from,
          to: this.to,
        })
        this.logs = data
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
