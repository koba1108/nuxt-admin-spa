<template>
  <v-card>
    <v-card-title>
      アカウント編集
      <v-spacer/>
    </v-card-title>
    <v-card-text>
      <v-form ref="form" lazy-validation>
        <v-text-field v-model="form.displayName" label="displayName" required/>
        <v-text-field v-model="form.email" label="email" required/>
        <v-text-field v-model="form.password" label="password" type="password"/>
      </v-form>
      <v-card-actions>
        <v-spacer/>
        <v-btn color="success" @click="update">更新</v-btn>
        <v-btn color="error" @click="remove">削除</v-btn>
        <v-btn color="info" @click="goListPage">戻る</v-btn>
      </v-card-actions>
    </v-card-text>
  </v-card>
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
      goListPage() {
        this.$router.push('/dashboard/account')
      }
    },
    created() {
      this.fetchAuthUser()
    },
  }
</script>
