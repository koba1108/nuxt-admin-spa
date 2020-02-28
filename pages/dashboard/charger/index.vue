<template>
  <div>
    <header>Charger一覧</header>
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
    methods: {
      async goAddPage() {
        this.$router.push('/dashboard/charger/add')
      },
      async goEditPage(id) {
        this.$router.push(`/dashboard/charger/edit/${id}`)
      },
    },
  }
</script>
