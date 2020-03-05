<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-card-title>
          <v-toolbar height="35" flat>
            <v-toolbar-title>車両情報</v-toolbar-title>
            <v-spacer/>
            <v-btn color="info" @click="setVehicleList">
              <v-icon>update</v-icon>
            </v-btn>
          </v-toolbar>
        </v-card-title>
        <v-card-text>
          <gmap-map
            :center="center"
            :zoom="10"
            map-type-id="terrain"
          >
            <gmap-marker
              :key="index"
              v-for="(m, index) in markers"
              :position="m.position"
              :clickable="true"
              @click="showCurrentBattery(m)"
            />
          </gmap-map>
        </v-card-text>
      </v-card>
    </v-col>

    <template v-if="current">
      <v-col cols="6">
        <v-card>
          <v-card-title color="primary">車両情報</v-card-title>
          <v-card-text>
            <v-simple-table
              :fixed-header="isFixedHeader"
              :height="tblHeight"
            >
              <tbody>
              <tr v-for="(value, key) in vehicleInfo" :key="key">
                <td>{{ key }}</td>
                <td>{{ value }}</td>
              </tr>
              </tbody>
            </v-simple-table>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="6">
        <v-card>
          <v-card-title color="primary">バッテリー情報</v-card-title>
          <v-card-text>
            <v-simple-table
              :fixed-header="isFixedHeader"
              :height="tblHeight"
            >
              <tbody>
              <tr v-for="(value, key) in batteryInfo" :key="key">
                <td>{{ key }}</td>
                <td>{{ value }}</td>
              </tr>
              </tbody>
            </v-simple-table>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="6">
        <v-card>
          <v-card-title color="primary">バッテリー情報</v-card-title>
          <v-card-text>
            <v-simple-table
              :fixed-header="isFixedHeader"
              :height="tblHeight"
            >
              <tbody>
              <tr v-for="(value, key) in batteryAlertInfo" :key="key">
                <td>{{ key }}</td>
                <td>{{ value }}</td>
              </tr>
              </tbody>
            </v-simple-table>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="6">
        <v-card>
          <v-card-title color="primary">アラート情報</v-card-title>
          <v-card-text>
            <v-simple-table
              :fixed-header="isFixedHeader"
              :height="tblHeight"
            >
              <tbody>
              <tr v-for="(value, key) in chargerAlertInfo" :key="key">
                <td>{{ key }}</td>
                <td>{{ value }}</td>
              </tr>
              </tbody>
            </v-simple-table>
          </v-card-text>
        </v-card>
      </v-col>


    </template>
  </v-row>
</template>

<script>
  export default {
    data() {
      return {
        tblHeight: 300,
        isFixedHeader: true,
        center: { lat: 28.458330, lng: 77.070976 },
        current: null,
        batteryList: [],
        vehicleList: [],
      }
    },
    computed: {
      // markerのUIライブラリ
      // https://vuejsexamples.com/vue-2-google-map-custom-marker-component/
      markers() {
        return this.batteryList.filter(b => b.LAT && b.LNG).map(b => {
          return {
            id: b.TID,
            data: b,
            position: {
              lat: Number(b.LAT),
              lng: Number(b.LNG),
            },
          }
        })
      },
      vehicleInfo() {
        return this.current.vehicle
      },
      batteryInfo() {
        return this.current.battery
      },
      batteryAlertInfo() {
        return {
          Battery1: '',
          Battery2: '',
          Battery3: 'Low SOC Warning',
          Battery1_3: 'Hardware Fault Batt3',
          Telematics: 'Battery Full Charged',
        }
      },
      chargerAlertInfo() {
        return {
          S1: 'Low Voltage in Y-Phase',
          S2: '',
          S3: 'Over load in Socket 1',
          SystemHealthStatus: 'Full System Fault',
          EmergencySwitchStatus: 'Emergency Fault',
        }
      },
    },
    methods: {
      async setVehicleList() {
        try {
          const { data } = await this.$vehicleList.get()
          this.vehicleList = data.Data
        } catch (e) {
          alert(e.message)
          console.error(e)
        }
      },
      showCurrentBattery(marker) {
        this.center = marker.position
        this.current = {
          battery: marker.data,
          vehicle: this.vehicleList.find(v => v.tms === marker.id),
        }
      },
    },
    mounted() {
      this.setVehicleList()
      this.$db.collection('battery').
        onSnapshot(snapshot => {
          this.batteryList = snapshot.docs.map(doc => doc.data())
        })
    },
  }
</script>
<style lang="scss" scoped>
  .vue-map-container {
    height: 50vh;
    width: 100%;
  }
</style>
