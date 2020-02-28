<template>
  <div>
    <header>アカウント追加</header>
    <main>
      <the-button type="add" @click="add">追加する</the-button>
    </main>
  </div>
</template>

<script>
  export default {
    methods: {
      async add() {
        console.log('todo: add methods')
      },
    },
  }
</script>
