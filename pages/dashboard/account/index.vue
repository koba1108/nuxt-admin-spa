<template>
  <v-card>
    <v-card-title>
      Account List
      <v-spacer/>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
        class="mr-4"
      />
      <v-btn color="info" @click="goAddPage">Add</v-btn>
    </v-card-title>
    <v-card-text>
      <v-data-table
        :search="search"
        :loading="authUsers.length < 1"
        :headers="headers"
        :items="authUsers"
        :footer-props="footerProps"
        no-data-text="no data."
      >
        <template v-slot:item.action="{ item }">
          <v-btn nuxt small text :to="`/dashboard/account/edit/${item.uid}`">
            <v-icon>mdi-table-edit</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data() {
      return {
        search: '',
        headers: [
          { text: 'UserId', align: 'left', value: 'uid' },
          { text: 'name', align: 'left', value: 'displayName' },
          { text: 'email', align: 'left', value: 'email' },
          { text: 'created_at', align: 'left', value: 'metadata.creationTime' },
          { text: 'last_signed_in', align: 'left', value: 'metadata.lastSignInTime' },
          { text: 'edit', align: 'center', sortable: false, value: 'action' },
        ],
        footerProps: {
          'items-per-page-options': [100, 200, 300, 400, 500],
          showFirstLastPage: true,
        },
        authUsers: [],
      }
    },
    methods: {
      goAddPage() {
        this.$router.push('/dashboard/account/add')
      },
      goEditPage(uid) {
        this.$router.push(`/dashboard/account/edit/${uid}`)
      },
      async setAuthUsers() {
        try {
          const { data } = await this.$authUser.list()
          this.authUsers = data.users
        } catch (e) {
          alert(e.message)
          console.error(e)
        }
      },
    },
    created() {
      this.setAuthUsers()
    },
  }
</script>
