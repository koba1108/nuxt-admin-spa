<template>
  <v-row>
    <driver-top5/>
    <graph-wrapper>
      <graph-header
        slot="header"
        title="TDT"
        :from="from"
        :to="to"
        :from-hms="fromHms"
        :to-hms="toHms"
        :unit="unit"
        :select-items="vehicleIds"
        :selected-items="currentVehicles"
        @itemSelected="setCurrentVehicles"
        @fromSelected="setFromDate"
        @toSelected="setToDate"
        @changeFromHms="setFromHms"
        @changeToHms="setToHms"
        @unitSelected="setUnit"
      />
      <template slot="chart">
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
        :from-hms="fromHms"
        :to-hms="toHms"
        :unit="unit"
        :select-items="vehicleIds"
        :selected-items="currentVehicles"
        @itemSelected="setCurrentVehicles"
        @fromSelected="setFromDate"
        @toSelected="setToDate"
        @changeFromHms="setFromHms"
        @changeToHms="setToHms"
        @unitSelected="setUnit"
      />
      <template slot="chart">
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
  import { UNIT_SEC, UNIT_HOUR } from '~/model/define'

  const startOfDate = '00:00'
  const endOfDate = '23:59'
  export default {
    data() {
      const today = this.$moment().format('YYYY-MM-DD')
      return {
        loading: true,
        from: today,
        to: today,
        fromHms: startOfDate,
        toHms: endOfDate,
        logs: [],
        unit: UNIT_HOUR,
        currentVehicles: [],
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
      chartLogs() {
        return this.logs.filter(l => {
          if(this.currentVehicles.length > 0) {
            return this.currentVehicles.includes(l.TID)
          } else {
            return true
          }
        }).map(l => {
          return {
            TID: l.TID,
            TIME: l.TIME.value,
            TDT: l.TDT,
            SOC: l.SOC,
          }
        })
      },
      reqFrom() {
        return `${this.from} ${this.fromHms}`
      },
      reqTo() {
        return `${this.to} ${this.toHms}`
      },
    },
    methods: {
      async setVehicleList() {
        const { data } = await this.$vehicleList.get()
        this.vehicleList = data.Data
      },
      setCurrentVehicles(tidList) {
        this.currentVehicles = tidList
      },
      setFromDate(from) {
        this.from = from
        this.fromHms = startOfDate
        if(this.unit === UNIT_SEC) {
          this.to = this.from
          this.toHms = endOfDate
        }
        this.fetchLogs()
      },
      setToDate(to) {
        this.to = to
        this.toHms = endOfDate
        if(this.unit === UNIT_SEC) {
          this.from = this.to
          this.fromHms = startOfDate
        }
        this.fetchLogs()
      },
      setFromHms(hms) {
        this.fromHms = hms ? hms : startOfDate
        this.fetchLogs()
      },
      setToHms(hms) {
        this.toHms = hms ? hms : endOfDate
        this.fetchLogs()
      },
      setUnit(unit) {
        this.unit = unit
        if(this.unit === UNIT_SEC) {
          this.to = this.from
          this.toHms = endOfDate
        }
        this.fetchLogs()
      },
      async fetchLogs() {
        this.loading = true
        const { data } = await this.$battery.logs({
          unit: this.unit,
          from: this.reqFrom,
          to: this.reqTo,
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
