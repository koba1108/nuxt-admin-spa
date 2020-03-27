<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-card-title>
          <v-toolbar height="35" flat>
            <v-toolbar-title>{{ title }}</v-toolbar-title>
            <v-spacer/>
            <v-btn color="info" @click="fetchVehicleList">
              <v-icon>update</v-icon>
            </v-btn>
          </v-toolbar>
        </v-card-title>
        <v-card-text>
          <gmap-map
            map-type-id="terrain"
            :center="center"
            :zoom="10"
            :options="mapOptions"
          >
            <gmap-marker
              :key="m.id"
              v-for="m in batteryMarkers"
              :position="m.position"
              :clickable="true"
              @click="showCurrentBattery(m)"
              :icon="m.icon"
            />
            <gmap-marker
              :key="c.id"
              v-for="c in chargerStationMarkers"
              :position="c.position"
              :clickable="true"
              @click="showCurrentChargeStation(c)"
              :icon="c.icon"
            />
          </gmap-map>
        </v-card-text>
      </v-card>
    </v-col>

    <template v-if="currentBattery">
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
              <tr v-for="(msg, key) in batteryAlertInfo" :key="key">
                <td>{{ key }}</td>
                <td v-html="msg"/>
              </tr>
              </tbody>
            </v-simple-table>
          </v-card-text>
        </v-card>
      </v-col>
    </template>

    <template v-if="chargerInfo">
      <v-col cols="12">
        <v-card>
          <v-card-title color="primary">Charger Info</v-card-title>
          <v-card-text>
            <v-simple-table :fixed-header="isFixedHeader">
              <tbody>
              <tr v-for="(value, key) in chargerInfo" :key="key">
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
  import {
    ALERT_TYPE_BATTERY,
    ALERT_TYPE_BATTERY_1_3,
    ALERT_TYPE_TELEMATICS,
    ALERT_TYPE_S1_STS,
    ALERT_TYPE_S2_STS,
    ALERT_TYPE_S3_STS,
    ALERT_TYPE_HLT_STS,
    ALERT_TYPE_EMG_STS,
    getMessageForBattery,
    getMessageForCharger,
  } from '~/model/alertMessage'

  // unit => keys
  const unitMap = {
    BV: 'V',
    BI: 'A',
    SOC: '%',
    TS: '℃',
    TDT: 'km',
    SPD: 'km/hr',
    'S1-Voltage': 'VAC',
    'S1-Current': 'A',
    'S1-Power': 'KW',
    'S1-Energy Units': 'KWh',
    'S2-Voltage': 'VAC',
    'S2-Current': 'A',
    'S2-Power': 'KW',
    'S2-Energy Units': 'KWh',
    'S3-Voltage': 'VAC',
    'S3-Current': 'A',
    'S3-Power': 'KW',
    'S3-Energy Units': 'KWh',
  }

  const mapStyles = [
    {
      featureType: 'administrative.land_parcel',
      stylers: [
        { visibility: 'off' },
      ],
    },
    {
      featureType: 'administrative.neighborhood',
      stylers: [
        { visibility: 'off' },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text',
      stylers: [
        { visibility: 'off' },
      ],
    },
    {
      featureType: 'road',
      elementType: 'labels',
      stylers: [
        { visibility: 'off' },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text',
      stylers: [
        { visibility: 'off' },
      ],
    },
  ]

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
        center: { lat: 28.458330, lng: 77.070976 },
        currentBattery: null,
        currentChargerStation: null,
        batteryList: [],
        chargerList: [],
        chargerStationList: [],
        vehicleList: [],
      }
    },
    computed: {
      title: () => 'MAP',
      mapOptions() {
        return { styles: mapStyles }
      },
      // markerのUIライブラリ
      // https://vuejsexamples.com/vue-2-google-map-custom-marker-component/
      batteryMarkers() {
        return this.batteryList.filter(b => b.LAT && b.LNG).map(b => {
          return {
            id: b.TID,
            data: b,
            position: {
              lat: Number(b.LAT),
              lng: Number(b.LNG),
            },
            icon: {
              url: this.hasAlert('battery', b) ? '/img/icon/ev_red.svg' : '/img/icon/ev_green.svg',
              size: { width: 46, height: 46, f: 'px', b: 'px' },
              scaledSize: { width: 23, height: 23, f: 'px', b: 'px' },
            },
          }
        })
      },
      chargerStationMarkers() {
        return this.chargerStationList.filter(c => c.latitude && c.longitude).map(c => {
          return {
            id: c.name,
            data: c,
            position: {
              lat: Number(c.latitude),
              lng: Number(c.longitude),
            },
            icon: {
              url: this.hasAlert('charger', c) ? '/img/icon/charger_red.svg' : '/img/icon/charger_blue.svg',
              size: { width: 46, height: 46, f: 'px', b: 'px' },
              scaledSize: { width: 23, height: 23, f: 'px', b: 'px' },
            },
          }
        })
      },
      batteryInfo() {
        const { drivername, vehiclename } = this.currentBattery.vehicle ? this.currentBattery.vehicle : {}
        const { TID, BV, BI, SOC, TS, TDT, SPD } = this.currentBattery.battery
        return {
          TID, BV, BI, SOC, TS, TDT, SPD,
          DriverName: drivername || '',
          VehicleName: vehiclename || '',
        }
      },
      batteryAlertInfo() {
        const { AL1, AL2, AL3, AL4, ST1 } = this.currentBattery.battery
        return {
          Battery1: getMessageForBattery(ALERT_TYPE_BATTERY, AL1),
          Battery2: getMessageForBattery(ALERT_TYPE_BATTERY, AL2),
          Battery3: getMessageForBattery(ALERT_TYPE_BATTERY, AL3),
          'Battery 1-3': getMessageForBattery(ALERT_TYPE_BATTERY_1_3, AL4),
          Telematics: getMessageForBattery(ALERT_TYPE_TELEMATICS, ST1),
        }
      },
      chargerInfo() {
        const { cs_id } = this.currentChargerStation ? this.currentChargerStation.chargerStation : {}
        if(!cs_id) return
        const charger = this.chargerList.find(c => c.cs_id === cs_id)
        if(!charger) return
        const {
          s1_sts, em_v1, em_i1, em_p1, em_e1, s2_sts, em_v2, em_i2,
          em_p2, em_e2, s3_sts, em_v3, em_i3, em_p3, em_e3, hlt_sts,
        } = charger
        return {
          'S1-status': s1_sts,
          'S1-Voltage': em_v1,
          'S1-Current ': em_i1,
          'S1-Power': em_p1,
          'S1-Energy Units': em_e1,
          'S2-status': s2_sts,
          'S2-Voltage': em_v2,
          'S2-Current ': em_i2,
          'S2-Power': em_p2,
          'S2-Energy Units': em_e2,
          'S3-status': s3_sts,
          'S3-Voltage': em_v3,
          'S3-Current ': em_i3,
          'S3-Power': em_p3,
          'S3-Energy Units': em_e3,
          'HLT_STS': hlt_sts,
        }
      },
      chargerAlertInfo() {
        const { cs_id } = this.currentChargerStation ? this.currentChargerStation.chargerStation : {}
        if(!cs_id) return
        const charger = this.chargerList.find(c => c.cs_id === cs_id)
        if(!charger) return
        const { s1_sts, s2_sts, s3_sts, hlt_sts, emg_sts } = charger
        return {
          S1: getMessageForCharger(ALERT_TYPE_S1_STS, s1_sts),
          S2: getMessageForCharger(ALERT_TYPE_S2_STS, s2_sts),
          S3: getMessageForCharger(ALERT_TYPE_S3_STS, s3_sts),
          'System Health Status': getMessageForCharger(ALERT_TYPE_HLT_STS, hlt_sts),
          'Emergency Switch Status': getMessageForCharger(ALERT_TYPE_EMG_STS, emg_sts),
        }
      },
    },
    methods: {
      hasAlert(type, data) {
        if(type === 'battery') {
          console.log('battery', data)
          const { AL1, AL2, AL3, AL4, ST1 } = data
          if(getMessageForBattery(ALERT_TYPE_BATTERY, AL1) !== '-') {
            return true
          }
          if(getMessageForBattery(ALERT_TYPE_BATTERY, AL2) !== '-') {
            return true
          }
          if(getMessageForBattery(ALERT_TYPE_BATTERY, AL3) !== '-') {
            return true
          }
          if(getMessageForBattery(ALERT_TYPE_BATTERY_1_3, AL4) !== '-') {
            return true
          }
          if(getMessageForBattery(ALERT_TYPE_TELEMATICS, ST1) !== '-') {
            // return true
          }
        } else {
          const charger = this.chargerList.find(c => c.cs_id === data.cs_id)
          if(!charger) return false
          const { s1_sts, s2_sts, s3_sts, hlt_sts, emg_sts } = charger
          if(getMessageForCharger(ALERT_TYPE_S1_STS, s1_sts) !== '-') {
            return true
          }
          if(getMessageForCharger(ALERT_TYPE_S2_STS, s2_sts) !== '-') {
            return true
          }
          if(getMessageForCharger(ALERT_TYPE_S3_STS, s3_sts) !== '-') {
            return true
          }
          if(getMessageForCharger(ALERT_TYPE_HLT_STS, hlt_sts) !== '-') {
            return true
          }
          if(getMessageForCharger(ALERT_TYPE_EMG_STS, emg_sts) !== '-') {
            return true
          }
        }
        return false
      },
      async fetchVehicleList() {
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
        this.currentBattery = {
          battery: marker.data,
          vehicle: this.vehicleList.find(v => v.tms === marker.id),
        }
        this.currentChargerStation = null
      },
      showCurrentChargeStation(marker) {
        this.center = marker.position
        this.currentChargerStation = {
          chargerStation: marker.data,
        }
        this.currentBattery = null
      },
      async fetchChargerList() {
        const docs = await this.$db.collection('charger').get()
        const chargerList = []
        docs.forEach(doc => chargerList.push(doc.data()))
        this.chargerList = chargerList
      },
      async fetchChargerStationList() {
        const docs = await this.$db.collection('chargerStations').get()
        const chargerStationList = []
        docs.forEach(doc => chargerStationList.push(doc.data()))
        this.chargerStationList = chargerStationList
      },
    },
    mounted() {
      this.fetchVehicleList()
      this.fetchChargerList()
      this.fetchChargerStationList()
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
