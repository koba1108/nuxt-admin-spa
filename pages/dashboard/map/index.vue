<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-card-title>
          <v-toolbar height="35" flat>
            <v-toolbar-title>{{ title }}</v-toolbar-title>
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
      <v-col cols="12">
        <v-card>
          <v-card-title color="primary">Battery Info</v-card-title>
          <v-card-text>
            <v-simple-table :fixed-header="isFixedHeader">
              <tbody>
              <tr v-for="(value, key) in batteryInfo" :key="key">
                <td>{{ key }}</td>
                <td>{{ value | addUnit(key) }}</td>
              </tr>
              </tbody>
            </v-simple-table>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12">
        <v-card>
          <v-card-title color="primary">Alert Info</v-card-title>
          <v-card-text>
            <v-simple-table :fixed-header="isFixedHeader">
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

    </template>
  </v-row>
</template>

<script>
  // unit => keys
  const unitMap = {
    BV: 'V',
    BI: 'A',
    SOC: '%',
    TS: '℃',
    TDT: 'km',
    SPD: 'km/hr',
  }

  const center = { lat: 28.458330, lng: 77.070976 }

  export default {
    filters: {
      addUnit(val, key) {
        if(unitMap.hasOwnProperty(key)) {
          return `${val}${unitMap[key]}`
        }
        return val
      },
    },
    data() {
      return {
        isFixedHeader: true,
        center: center,
        current: null,
        batteryList: [],
        vehicleList: [],
      }
    },
    computed: {
      title: () => 'MAP',
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
      // todo: バッテリーと車の出し分け
      batteryInfo() {
        const { drivername, vehiclename } = this.current.vehicle ? this.current.vehicle : {}
        const { TID, BV, BI, SOC, TS, TDT, SPD } = this.current.battery
        return {
          TID,
          BV,
          BI,
          SOC,
          TS,
          TDT,
          SPD,
          DriverName: drivername || '',
          VehicleName: vehiclename || '',
        }
      },
      batteryAlertInfo() {
        const { AL1, AL2, AL3, AL4, ST1 } = this.current.battery
        return {
          Battery1: AL1,
          Battery2: AL2,
          Battery3: AL3,
          'Battery 1-3': AL4,
          Telematics: ST1,
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
