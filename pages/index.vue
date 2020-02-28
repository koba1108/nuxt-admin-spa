<template>
  <div>
    <header>ログイン画面だよ</header>
    <main>
      <input v-model="email" type="email">
      <input v-model="password" type="password">
      <the-button type="login" @click="doLogin">ログイン</the-button>
    </main>
  </div>
</template>

<script>
  export default {
    layout: 'clean',
    data() {
      return {
        email: '',
        password: '',
      }
    },
    methods: {
      async doLogin() {
        try {
          await this.$auth().signInWithEmailAndPassword(this.email, this.password)
          this.$router.push('/dashboard')
        } catch (e) {
          alert(e.message)
          console.error(e)
        }
      },
    },
  }
</script>
