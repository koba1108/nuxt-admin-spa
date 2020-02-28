<template>
  <div>
    <header>Charger編集</header>
    <main>
      <label>
        name: <input type="text" v-model="form.name">
      </label>
      <label>
        cs_id: <input type="text" v-model="form.cs_id">
      </label>
      <label>
        longitude: <input type="number" v-model.number="form.longitude" step="0.000001">
      </label>
      <label>
        latitude: <input type="number" v-model.number="form.latitude" step="0.000001">
      </label>
      <the-button type="edit" @click="update" :disabled="isInvalid">更新する</the-button>
      <the-button type="edit" @click="remove">削除する</the-button>
      <the-button type="edit" @click="goListPage">戻る</the-button>
    </main>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          cs_id: '',
          longitude: 0,
          latitude: 0,
        },
      }
    },
    computed: {
      id () {
        return this.$route.params.id
      },
      isInvalid() {
        return !(this.form.name && this.form.cs_id)
      },
      newData() {
        return {
          name: this.form.name,
          cs_id: this.form.cs_id,
          longitude: Number(this.form.longitude),
          latitude: Number(this.form.latitude),
        }
      },
    },
    methods: {
      goListPage() {
        this.$router.push('/dashboard/charger')
      },
      async update() {
        try {
          await this.$db.
            collection('chargerStations').
            doc(this.id).
            set(this.newData, { merge: true })
          alert('更新しました')
        } catch (e) {
          alert(e.message)
          console.error(e)
        }
      },
      async remove() {
        try {
          await this.$db.
            collection('chargerStations').
            doc(this.id).
            delete()
          alert('削除しました')
          this.goListPage()
        } catch (e) {
          alert(e.message)
          console.error(e)
        }
      },
      async fetchChargerStation() {
        const doc = await this.$db.
          collection('chargerStations').
          doc(this.id).
          get()
        if(doc.exists) {
          this.form = doc.data()
        } else {
          this.goListPage()
        }
      },
    },
    mounted() {
      this.fetchChargerStation()
    },
  }
</script>
