<template>
  <div>
    <header>Charger編集</header>
    <main>
      <the-button type="edit" @click="update">更新する</the-button>
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
      async update() {
        console.log('todo: update method')
      },
    },
  }
</script>
