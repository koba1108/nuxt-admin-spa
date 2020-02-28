<template>
  <div>
    <header>アカウント一覧</header>
    <main>
      <header>
        <the-button type="add" @click="goAddPage">追加</the-button>
      </header>
      <div>
        todo: ここに一覧を出す
        <the-button type="edit" @click="goEditPage('1')">編集</the-button>
      </div>
    </main>
  </div>
</template>

<script>
  export default {
    computed: {
      // ここらへんを使えるAPIをCloudFunctionsに生やす
      // https://firebase.google.com/docs/auth/admin/manage-users?hl=ja
      adminUsers() {
        return []
      },
    },
    methods: {
      async goAddPage() {
        this.$router.push('/dashboard/account/add')
      },
      async goEditPage(id) {
        this.$router.push(`/dashboard/account/edit/${id}`)
      },
    },
  }
</script>
