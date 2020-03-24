<template>
  <v-col cols="12">
    <v-card>
      <v-row class="p-10">
        <v-col cols="8">
          <v-card-title>TOP5</v-card-title>
        </v-col>
        <v-col cols="4">
          <v-text-field
            class="calendar"
            type="date"
            label="Date"
            prepend-icon="event"
            v-model="selectDate"
            @click="dialogActive = true"
          />
        </v-col>
      </v-row>
      <v-skeleton-loader
        v-if="isProgress"
        class="mx-auto"
        :style="progressStyle"
        type="card"
        tile
      />
      <v-simple-table v-else :fixed-header="true">
        <thead>
        <tr>
          <th class="text-left">TID</th>
          <th class="text-left">DriverName</th>
          <th class="text-left">TDT</th>
        </tr>
        </thead>
        <tbody v-if="driverTop5.length > 0">
        <tr v-for="t in driverTop5" :key="t.TID">
          <template v-if="t.driverName && t.tdt">
            <td>{{ t.tid }}</td>
            <td>{{ t.driverName }}</td>
            <td>{{ t.tdt }}</td>
          </template>
        </tr>
        </tbody>
        <v-card-text v-else>
        <v-card-title class="light-gray">data not found.</v-card-title>
        </v-card-text>
      </v-simple-table>
    </v-card>

    <v-dialog :max-width="290" v-model="dialogActive">
      <v-date-picker
        show-current
        no-title
        reactive
        @click:date="fetchSelectData"
      />
    </v-dialog>

  </v-col>
</template>

<script>
  export default {
    data() {
      return {
        isProgress: false,
        // unSubscribe: null,
        vehicleList: [],
        currentBattery: [],
        selectDate: '',
        dialogActive: false,
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
      /*
      driverTop5() {
        return this.currentBattery.
          filter(b => b.TID).
          sort((a, b) => a.TDT < b.TDT ? 1 : -1).
          slice(0, 5).
          map(b => {
            const vehicle = this.vehicleList.find(d => d.tms === b.TID)
            return {
              tid: b.TID,
              driverName: vehicle ? vehicle.drivername : '',
              tdt: `${b.TDT} km`,
            }
          })
      },
      */
    },
    methods: {
      fetchSelectData(date) {
        this.selectDate = date
        this.dialogActive = false
        this.setCurrentBattery()
      },
      async setVehicleList() {
        const { data } = await this.$vehicleList.get()
        this.vehicleList = data.Data
      },
      async setCurrentBattery() {
        if(!this.isProgress && this.selectDate) {
          this.isProgress = true
          const { data } = await this.$battery.getDistanceTraveled({
            from: this.selectDate,
            to: this.selectDate,
          })
          this.currentBattery = data
          this.isProgress = false
        }
        /*
        // 総走行距離パターンはこっち
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
      this.selectDate = this.$moment().format('YYYY-MM-DD')
      await Promise.all([
        this.setVehicleList(),
        this.setCurrentBattery(),
      ])
    },
    /*
    beforeDestroy() {
      if(this.unSubscribe) {
        this.unSubscribe()
      }
    },
    */
  }
</script>
<style lang="scss" scoped>
  .p-10 {
    padding: 10px;
  }
  .light-gray {
    color: rgba(0, 0, 0, 0.6);
  }
  .calendar {
    font-weight: 500;
  }
</style>
