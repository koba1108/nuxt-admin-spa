<template>
  <div>
    <header>ダッシュボード画面だよ</header>
    <main>
      <the-button type="logout" @click="doLogout">ログアウト</the-button>
    </main>
  </div>
</template>

<script>
  export default {
    methods: {
      async doLogout() {
        this.$auth().signOut()
      },
    },
  }
</script>
