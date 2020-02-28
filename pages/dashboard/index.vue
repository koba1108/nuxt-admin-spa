<template>
  <div>
    <header>監視画面だよ</header>
    <main>
      current {{ current }}
      <div>
        <GmapMap
          :center="center"
          :zoom="10"
          map-type-id="terrain"
        >
          <GmapMarker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            :clickable="true"
            @click="showCurrentBattery(m)"
          />
        </GmapMap>
      </div>
    </main>
    <footer>
      <the-button type="logout" @click="doLogout">ログアウト</the-button>
    </footer>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        center: { lat: 28.458330, lng: 77.070976 },
        current: null,
        batteryList: [],
      }
    },
    computed: {
      // markerのUIライブラリ
      // https://vuejsexamples.com/vue-2-google-map-custom-marker-component/
      markers() {
        return this.batteryList.filter(b => b.LAT && b.LNG).map(b => {
          return {
            data: b,
            title: b.TID,
            position: {
              lat: Number(b.LAT),
              lng: Number(b.LNG),
            },
          }
        })
      },
    },
    methods: {
      async doLogout() {
        this.$auth().signOut()
      },
      showCurrentBattery(marker) {
        this.center = marker.position
        this.current = marker.data
      },
    },
    async mounted() {
      this.$db.collection('battery').
        onSnapshot(snapshot => {
          this.batteryList = snapshot.docs.map(doc => {
            return doc.data()
          })
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
