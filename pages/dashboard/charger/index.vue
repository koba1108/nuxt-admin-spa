<template>
  <div>
    <header>Charger一覧</header>
    <main>
      <header>
        <the-button type="add" @click="goAddPage">追加</the-button>
      </header>
      <div>
        <div v-for="cs in chargerStations" :key="cs.id">
          <div>id: {{ cs.id }}</div>
          <div>name: {{ cs.name }}</div>
          <div>cs_id: {{ cs.cs_id }}</div>
          <div>longitude: {{ cs.longitude }}</div>
          <div>latitude: {{ cs.latitude }}</div>
          <the-button type="edit" @click="goEditPage(cs.id)">編集</the-button>
          <hr>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        chargerStations: [],
      }
    },
    methods: {
      async goAddPage() {
        this.$router.push('/dashboard/charger/add')
      },
      async goEditPage(id) {
        this.$router.push(`/dashboard/charger/edit/${id}`)
      },
      async fetchChargerStations() {
        const { docs } = await this.$db.collection('chargerStations').get()
        this.chargerStations = docs.map(doc => doc.data())
      },
    },
    mounted() {
      this.fetchChargerStations()
    },
  }
</script>
