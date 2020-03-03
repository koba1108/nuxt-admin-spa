<template>
  <v-card>
    <v-card-title>
      アカウント追加
      <v-spacer/>
    </v-card-title>
    <v-card-text>
      <v-form ref="form" lazy-validation>
        <v-text-field v-model="form.displayName" label="displayName" required/>
        <v-text-field v-model="form.email" label="email" required/>
        <v-text-field v-model="form.password" label="password" type="password"/>
        <v-btn color="success" @click="add">追加する</v-btn>
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
          displayName: '',
          email: '',
          password: '',
        },
      }
    },
    methods: {
      async add() {
        const { data, errorInfo } = await this.$authUser.add(this.form)
        if (data) {
          alert('作成完了しました')
          this.goListPage()
        } else {
          alert(errorInfo.message)
          console.error(errorInfo)
        }
      },
      goListPage() {
        this.$router.push('/dashboard/account')
      }
    },
  }
</script>
