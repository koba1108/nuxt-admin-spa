<template>
  <div>
    <header>アカウント一覧</header>
    <main>
      <header>
        <the-button type="add" @click="goAddPage">追加</the-button>
      </header>
      <div v-for="u in authUsers" :key="u.uid">
        <div>uid: {{ u.uid }}</div>
        <div>displayName: {{ u.displayName }}</div>
        <div>email: {{ u.email }}</div>
        <the-button type="edit" @click="goEditPage(u.uid)">編集</the-button>
      </div>
    </main>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        authUsers: [],
      }
    },
    methods: {
      async goAddPage() {
        this.$router.push('/dashboard/account/add')
      },
      async goEditPage(uid) {
        this.$router.push(`/dashboard/account/edit/${uid}`)
      },
      async setAuthUsers() {
        try {
          const { data } = await this.$authUser.list()
          this.authUsers = data.users
        } catch (e) {
          alert(e.message)
          console.error(e)
        }
      },
    },
    created() {
      this.setAuthUsers()
    },
  }
</script>
