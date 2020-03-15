<template>
  <v-card>
    <v-card-title>
      Account Edit
      <v-spacer/>
    </v-card-title>
    <v-card-text>
      <v-form ref="form" lazy-validation>
        <v-text-field v-model="form.displayName" label="displayName" required/>
        <v-text-field v-model="form.email" label="email" required/>
        <v-text-field v-model="form.password" label="password" type="password"/>
      </v-form>
      <v-card-actions>
        <v-spacer/>
        <v-btn color="success" @click="update">Update</v-btn>
        <v-btn color="error" @click="remove">Remove</v-btn>
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
          displayName: '',
          email: '',
          password: '',
        },
      }
    },
    computed: {
      uid () {
        return this.$route.params.id
      },
      updateData() {
        const data = {
          uid: this.uid,
          displayName: this.form.displayName,
          email: this.form.email,
        }
        // パスワード入ってたら変更する
        if(this.form.password) {
          data.password = this.form.password
        }
        return data
      },
    },
    methods: {
      async update() {
        const { data, errorInfo } = await this.$authUser.update(this.updateData)
        if(data) {
          alert('update succeed.')
        } else {
          console.error(errorInfo)
          alert(errorInfo.message)
        }
      },
      async remove() {
        try {
          await this.$authUser.delete(this.uid)
          alert('remove succeed.')
          this.$router.push('/dashboard/account')
        } catch (e) {
          console.error(e)
          alert(e.message)
        }
      },
      async fetchAuthUser() {
        const { data } = await this.$authUser.get(this.uid)
        if (data.user) {
          this.form.displayName = data.user.displayName
          this.form.email = data.user.email
        }
      },
      goListPage() {
        this.$router.push('/dashboard/account')
      }
    },
    created() {
      this.fetchAuthUser()
    },
  }
</script>
