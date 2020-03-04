<template>
  <v-card>
    <v-card-title>
      <span class="headline">Password Reset</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12">
            <v-text-field label="Email*" required v-model="email"/>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-spacer/>
        <v-btn color="primary" @click="sendPasswordResetMail">Send</v-btn>
      </v-card-actions>
    </v-card-text>

    <v-snackbar
      :color="snackbar.color"
      multi-line="multi-line"
      :timeout="5000"
      v-model="snackbar.visible"
      top
    >
      {{ snackbar.text }}
      <v-btn text @click="closeSnackbar">Close</v-btn>
    </v-snackbar>

  </v-card>
</template>

<script>
  const SUCCESS_MSG = 'Please confirm. A password reset email has been sent to your email address.'

  export default {
    data() {
      return {
        email: '',
        snackbar: {
          color: '',
          visible: false,
          text: '',
        },
      }
    },
    methods: {
      showSnackbar(text, color='info') {
        this.snackbar.color = color
        this.snackbar.text = text
        this.snackbar.visible = true
      },
      closeSnackbar() {
        this.snackbar.color = 'info'
        this.snackbar.text = text
        this.snackbar.visible = false
      },
      async sendPasswordResetMail() {
        try {
          await this.$auth().sendPasswordResetEmail(this.email)
          this.showSnackbar(SUCCESS_MSG)
        } catch (e) {
          this.showSnackbar(e.message, 'error')
        }
      }
    }
  }
</script>
