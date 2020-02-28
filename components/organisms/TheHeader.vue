<template>
  <header>
    <ul>
      <li
        v-for="p in pathList"
        :key="p.path"
        @click="goPage(p)"
      >
        <a>{{ p.title }}</a>
      </li>
    </ul>
    <div>
      <the-button type="logout" @click="doLogout">ログアウト</the-button>
    </div>
  </header>
</template>

<script>
  const menuItems = [
    {
      title: '監視',
      path: '/dashboard',
    },
    {
      title: '集計',
      path: '/dashboard/summary',
    },
    {
      title: 'アカウント管理',
      path: '/dashboard/account',
    },
    {
      title: 'Charger管理',
      path: '/dashboard/charger',
    },
  ]
  export default {
    computed: {
      pathList() {
        return menuItems
      },
    },
    methods: {
      goPage({ path }) {
        this.$router.push(path)
      },
      doLogout() {
        this.$auth().signOut()
      },
    },
  }
</script>
