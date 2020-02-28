<template>
  <div>
    <header>Charger追加</header>
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
      <the-button type="add" @click="add" :disabled="isInvalid">追加する</the-button>
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
      async add() {
        try {
          const newDoc = this.$db.collection('chargerStations').doc()
          const newCharger = Object.assign(this.newData, { id: newDoc.id })
          await newDoc.set(newCharger)
          alert('登録しました')
          this.$router.push('/dashboard/charger')
        } catch (e) {
          console.error(e)
          alert(e.message)
        }
      },
    },
  }
</script>
