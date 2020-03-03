<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item
          v-for="p in pathList"
          :key="p.path"
          @click="goPage(p)"
          link
        >
          <v-list-item-action>
            <v-icon>{{ p.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ p.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="doLogout" link>
          <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>ログアウト</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
      <v-toolbar-title>運行管理システム</v-toolbar-title>
    </v-app-bar>
  </v-app>
</template>

<script>
  const menuItems = [
    {
      icon: 'mdi-google-maps',
      title: '監視',
      path: '/dashboard',
    },
    {
      icon: 'mdi-table',
      title: '集計',
      path: '/dashboard/summary',
    },
    {
      icon: 'mdi-account',
      title: 'アカウント管理',
      path: '/dashboard/account',
    },
    {
      icon: 'mdi-battery-charging-90',
      title: 'Charger管理',
      path: '/dashboard/charger',
    },
  ]
  export default {
    data() {
      return {
        drawer: null,
      }
    },
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
