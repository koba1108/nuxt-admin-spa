<template>
  <div>
    <header>アカウント追加</header>
    <main>
      <input type="text" v-model="form.displayName">
      <input type="email" v-model="form.email">
      <input type="password" v-model="form.password">
      <the-button type="add" @click="add">追加する</the-button>
    </main>
  </div>
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
          this.$router.push('/dashboard/account')
        } else {
          alert(errorInfo.message)
          console.error(errorInfo)
        }
      },
    },
  }
</script>
