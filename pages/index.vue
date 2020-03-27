<template>
  <v-app>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-card-text>
                <v-img
                  class="white--text align-end"
                  height="150px"
                  src="/img/logo/bg-transparent.png"
                  contain
                />
                <v-row justify="center">
                  <v-card-title>Login to your account</v-card-title>
                </v-row>
                <v-form>
                  <v-text-field
                    id="email"
                    name="email"
                    placeholder="Login"
                    prepend-icon="person"
                    type="email"
                    v-model="email"
                  />
                  <v-text-field
                    id="password"
                    name="password"
                    placeholder="Password"
                    prepend-icon="lock"
                    type="password"
                    v-model="password"
                  />
                </v-form>
                <v-card-actions>
                  <v-row justify="center">
                    <v-btn color="primary" @click="doLogin">Login</v-btn>
                    <v-btn class="ml-8" text small @click="modalActive=true">Forgot password</v-btn>
                  </v-row>
                </v-card-actions>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <v-row justify="center">
      <v-dialog v-model="modalActive" max-width="600px">
        <password-reset-form/>
      </v-dialog>
    </v-row>
  </v-app>
</template>

<script>
  export default {
    layout: 'clean',
    data() {
      return {
        modalActive: false,
        email: '',
        password: '',
      }
    },
    methods: {
      async doLogin() {
        try {
          await this.$auth().signInWithEmailAndPassword(this.email, this.password)
          this.$router.push('/dashboard/monitoring')
        } catch (e) {
          alert(e.message)
          console.error(e)
        }
      },
    },
  }
</script>
