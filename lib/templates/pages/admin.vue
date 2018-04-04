<template>
  <div column align-center class="login-page">
    <div>
      <v-btn @click="isLogin=true" flat :class="{'primary--text':isLogin}">Login</v-btn>
      <v-btn @click="isLogin=false" flat :class="{'primary--text':!isLogin}">Register</v-btn>
    </div>
    <div class="white pa-5 elevation-3">
      <template v-if="isLogin">
        <lc-form-container ref="form">

          <v-alert :value="err" v-text="err"/>

          <v-text-field type="email" required name="email"
                        v-model="credentials.email"
                        label="Enter your email" @keyup.enter="onLogin"/>
          <v-text-field v-model="credentials.password" name="password"
                        required type="password"
                        label="Enter your password" @keyup.enter="onLogin"/>
          <v-btn flat @click="onLogin" class="primary--text" :loading="loading">Login</v-btn>
        </lc-form-container>
      </template>
      <template v-else>
        <lc-form-container ref="formRegister">
          <template v-if="!showAfterRegister">
            <v-text-field type="text" v-model="credentials.firstName"
                          name="firstName"
                          label="First Name"
                          required/>
            <v-text-field type="text" v-model="credentials.lastName"
                          name="lastName"
                          label="Last Name"
                          required/>
            <v-text-field type="email" required name="email"
                          v-model="credentials.email"
                          label="Enter your email"
                          @keyup.enter="onRegister"/>
            <v-text-field v-model="credentials.password"
                          name="password"
                          required type="password"
                          label="Enter your password"
                          @keyup.enter="onRegister"/>
            <v-text-field v-model="passwordRepeat"
                          name="passwordRepeat"
                          required type="password"
                          :rules="[samePasswordRule]"
                          label="Repeat your password"
                          @keyup.enter="onRegister"/>
            <v-btn flat @click="onRegister"
                   class="primary--text"
                   :loading="loading">Register
            </v-btn>
          </template>
          <v-alert color="info" v-model="showAfterRegister" icon="info">
            Your register is successful. Please wait for the admin to apply your privileges.
          </v-alert>
        </lc-form-container>
      </template>
    </div>
  </div>
</template>

<script>
  import userSignInMutationGql from '../gql/user/userSignInMutation.gql'
  import signupUserGql from '../gql/user/signupUser.gql'

  export default {
    layout: 'default',
    data () {
      return {
        loading: false,
        credentials: {
          firstName: null,
          lastName: null,
          email: null,
          password: null
        },
        err: null,
        passwordRepeat: null,
        isLogin: true,
        showAfterRegister: false
      }
    },
    mounted () {
      if (this.$store.getters.canEdit) {
        this.$router.push('/')
      }
    },
    methods: {
      async onLogin () {
        debugger
        const v = this.$refs.form.validate()
        if (!v) return
        this.loading = true
        const variables = {
          email: this.credentials.email,
          password: this.credentials.password
        }
        try {
          const result = await this.mutateGql({mutation: userSignInMutationGql, variables}, 'authenticateUser')
          await this.$store.dispatch('LOGIN', result)
        } catch (e) {
          this.loading = false
          this.$store.commit('SET_ERROR', e.message)
          return
        }

        this.loading = false
        if (this.$store.getters.canEdit) {
          this.$router.push('/')
        } else {
          this.$store.commit('SET_ERROR', 'You are not logged in or you missing some priviliges')
        }
      },
      samePasswordRule (value) {
        return value === this.credentials.password || 'password does not match'
      },
      async onRegister () {
        const v = this.$refs.formRegister.validate()
        if (!v) return
        this.loading = true
        const d = await this.mutateGql({mutation: signupUserGql, variables: this.credentials}, 'signupUser')
        if (!d) {
          return
        }
        this.loading = false
        this.showAfterRegister = true
      }
    }
  }
</script>

<style scoped>
  .login-page > div {
    margin: 0 auto;
    width: 500px;
  }
</style>
