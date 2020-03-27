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
          v-for="p in mainPathList"
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

        <v-subheader>Setting</v-subheader>
        <v-list-item
          v-for="p in settingPathList"
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
  const MENU_TYPE_MAIN = 'main'
  const MENU_TYPE_SETTING = 'setting'
  const menuItems = [
    {
      type: MENU_TYPE_MAIN,
      icon: 'mdi-google-maps',
      title: 'Monitoring',
      path: '/dashboard/monitoring',
    },
    {
      type: MENU_TYPE_MAIN,
      icon: 'mdi-table',
      title: 'Summary',
      path: '/dashboard/summary',
    },
    {
      type: MENU_TYPE_SETTING,
      icon: 'mdi-account',
      title: 'Account',
      path: '/dashboard/account',
    },
    {
      type: MENU_TYPE_SETTING,
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
      mainPathList() {
        return menuItems.filter(m => m.type === MENU_TYPE_MAIN)
      },
      settingPathList() {
        return menuItems.filter(m => m.type === MENU_TYPE_SETTING)
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
