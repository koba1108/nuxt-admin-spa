<template>
  <v-card>
    <v-card-title>
      Charger編集
      <v-spacer/>
    </v-card-title>
    <v-card-text>
      <v-form ref="form" lazy-validation>
        <v-text-field v-model="form.name" label="name" required/>
        <v-text-field v-model="form.cs_id" label="cs_id" required/>
        <v-text-field v-model.number="form.longitude" type="number" step="0.000001"/>
        <v-text-field v-model.number="form.latitude" type="number" step="0.000001"/>
        <v-btn color="success" :disabled="isInvalid" @click="update">更新</v-btn>
        <v-btn color="error" @click="remove">削除</v-btn>
        <v-btn color="info" @click="goListPage">戻る</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
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
      id() {
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
