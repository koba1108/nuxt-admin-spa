<template>
  <v-card>
    <v-card-title>Charger Add</v-card-title>
    <v-card-text>
      <v-form ref="form" lazy-validation>
        <v-text-field v-model="form.name" label="name" required/>
        <v-text-field v-model="form.cs_id" label="cs_id" required/>
        <v-text-field v-model.number="form.longitude" type="number" step="0.000001"/>
        <v-text-field v-model.number="form.latitude" type="number" step="0.000001"/>
      </v-form>
      <v-card-actions>
        <v-spacer/>
        <v-btn color="success" :disabled="isInvalid" @click="add">Create</v-btn>
        <v-btn color="info" @click="goListPage">Back</v-btn>
      </v-card-actions>
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
          alert('create succeed.')
          this.$router.push('/dashboard/charger')
        } catch (e) {
          console.error(e)
          alert(e.message)
        }
      },
    },
  }
</script>
