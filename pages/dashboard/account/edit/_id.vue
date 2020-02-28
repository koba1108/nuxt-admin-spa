<template>
  <div>
    <header>アカウント編集</header>
    <main>
      <the-button type="edit" @click="update">更新する</the-button>
    </main>
  </div>
</template>

<script>
  export default {
    methods: {
      async update() {
        console.log('todo: update method')
      },
    },
  }
</script>
