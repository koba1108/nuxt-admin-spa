<template>
  <div>
    <header>アカウント編集</header>
    <main>
      <input type="text" v-model="form.displayName">
      <input type="email" v-model="form.email">
      <input type="password" v-model="form.password" autocomplete="new-password">
      <the-button type="edit" @click="update">更新する</the-button>
      <the-button type="delete" @click="remove">削除する</the-button>
    </main>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          displayName: '',
          email: '',
          password: '',
        },
      }
    },
    computed: {
      uid () {
        return this.$route.params.id
      },
      updateData() {
        const data = {
          uid: this.uid,
          displayName: this.form.displayName,
          email: this.form.email,
        }
        // パスワード入ってたら変更する
        if(this.form.password) {
          data.password = this.form.password
        }
        return data
      },
    },
    methods: {
      async update() {
        const { data, errorInfo } = await this.$authUser.update(this.updateData)
        if(data) {
          alert('更新しました')
        } else {
          console.error(errorInfo)
          alert(errorInfo.message)
        }
      },
      async remove() {
        try {
          await this.$authUser.delete(this.uid)
          alert('削除しました')
          this.$router.push('/dashboard/account')
        } catch (e) {
          console.error(e)
          alert(e.message)
        }
      },
      async fetchAuthUser() {
        const { data } = await this.$authUser.get(this.uid)
        if (data.user) {
          this.form.displayName = data.user.displayName
          this.form.email = data.user.email
        }
      },
    },
    created() {
      this.fetchAuthUser()
    },
  }
</script>
