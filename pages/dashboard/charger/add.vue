<template>
  <div>
    <header>Charger追加</header>
    <main>
      <the-button type="add" @click="add">追加する</the-button>
      <the-button type="edit" @click="goListPage">戻る</the-button>
    </main>
  </div>
</template>

<script>
  export default {
    methods: {
      goListPage() {
        this.$router.push('/dashboard/charger')
      },
      async add() {
        console.log('todo: add methods')
      },
    },
  }
</script>
