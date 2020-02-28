<template>
  <div>
    <header>監視画面だよ</header>
    <main>
      <div>
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
      </div>
      <div v-if="current">
        <div>
          <h3>車両情報</h3>
          <code>{{ current.vehicle }}</code>
        </div>
        <div>
          <h3>バッテリー情報</h3>
          <code>{{ current.battery }}</code>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  export default {
    data() {
      return {
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
          this.batteryList = snapshot.docs.map(doc =>  doc.data())
        })
    },
  }
</script>
<style lang="scss" scoped>
  .vue-map-container {
    width: 100vw;
    height: 50vh;
  }
</style>
