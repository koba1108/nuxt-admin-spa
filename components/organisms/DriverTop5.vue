<template>
  <v-col cols="12">
    <v-card>
      <v-card-title>TOP5</v-card-title>
      <v-simple-table :fixed-header="true">
        <thead>
        <tr>
          <th class="text-left">TID</th>
          <th class="text-left">DriverName</th>
          <th class="text-left">TDT</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="t in driverTop5" :key="t.TID">
          <template v-if="t.driverName && t.tdt">
            <td>{{ t.tid }}</td>
            <td>{{ t.driverName }}</td>
            <td>{{ t.tdt }}</td>
          </template>
        </tr>
        </tbody>
      </v-simple-table>
      <v-skeleton-loader
        v-if="isProgress"
        class="mx-auto"
        :style="progressStyle"
        type="card"
        tile
      />
    </v-card>
  </v-col>
</template>

<script>
  export default {
    data() {
      return {
        isProgress: true,
        unSubscribe: null,
        vehicleList: [],
        currentBattery: [],
      }
    },
    computed: {
      progressStyle() {
        return {
          padding: '15px',
        }
      },
      driverTop5() {
        return this.currentBattery.
          filter(b => b.TID).
          sort((a, b) => a.TDT_DIFF < b.TDT_DIFF ? 1 : -1).
          slice(0, 5).
          map(b => {
            const vehicle = this.vehicleList.find(d => d.tms === b.TID)
            return {
              tid: b.TID,
              driverName: vehicle ? vehicle.drivername : '',
              tdt: `${b.TDT_DIFF} km`,
            }
          })
      },
    },
    methods: {
      async setVehicleList() {
        const { data } = await this.$vehicleList.get()
        this.vehicleList = data.Data
      },
      async setCurrentBattery() {
        const today = this.$moment().format('YYYY-MM-DD')
        const { data } = await this.$battery.getDistanceTraveled({
          from: today,
          to: today,
        })
        this.currentBattery = data
        /*
        総走行距離パターンはこっち
        this.unSubscribe = await this.$db.
          collection(COLLECTION_NAME_BATTERY).
          onSnapshot(docs => {
            const currentBattery = []
            docs.forEach(doc => {
              currentBattery.push(doc.data())
            })
            this.currentBattery = currentBattery
          })
         */
      },
    },
    async mounted() {
      await Promise.all([
        this.setVehicleList(),
        this.setCurrentBattery(),
      ])
      this.isProgress = false
    },
    beforeDestroy() {
      if(this.unSubscribe) {
        this.unSubscribe()
      }
    },
  }
</script>
