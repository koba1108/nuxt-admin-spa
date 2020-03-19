<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-img
          class="align-end"
          height="64px"
          src="/img/logo/bg-transparent.png"
          contain
        />
        <v-subheader>Main</v-subheader>
        <v-list-item
          v-for="p in pathList"
          :key="p.path"
          :to="p.path"
          nuxt
        >
          <v-list-item-action>
            <v-icon>{{ p.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ p.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-subheader>Logout</v-subheader>
        <v-list-item @click="doLogout" link>
          <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
      <v-toolbar-title>Fleet Management System</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container>
        <nuxt/>
      </v-container>
    </v-content>

  </v-app>
</template>

<script>
  const menuItems = [
    {
      icon: 'mdi-google-maps',
      title: 'Monitoring',
      path: '/dashboard/monitoring',
    },
    {
      icon: 'mdi-table',
      title: 'Summary',
      path: '/dashboard/summary',
    },
    {
      icon: 'mdi-account',
      title: 'Account',
      path: '/dashboard/account',
    },
    {
      icon: 'mdi-battery-charging-90',
      title: 'Charger',
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
