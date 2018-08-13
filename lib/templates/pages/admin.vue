<template>
  <div column align-center class="login-page ma-5">
    <div class="white pa-5">
      <div class="text-xs-center mb-4">

        <nuxt-link to="/">
          <lc-main-logo/>
        </nuxt-link>
      </div>
      <v-tabs grow
              slider-color="primary"
              v-if="!passwordForget">
        <v-tab ripple>
          Login
        </v-tab>
        <v-tab ripple>
          Register
        </v-tab>
        <v-tab-item class="white pt-4">
          <v-form ref="form">

            <v-alert :value="err" v-text="err"/>

            <v-text-field type="email"
                          required
                          name="email"
                          :rules="[onEmailRule,onRequiredRule]"
                          v-model="credentials.email"
                          label="Enter your email" @keyup.enter="onLogin"/>
            <v-text-field v-model="credentials.password"
                          name="password"
                          required
                          :rules="[onRequiredRule]"
                          type="password"
                          label="Enter your password"
                          @keyup.enter="onLogin"/>
            <v-btn flat
                   outline
                   block
                   color="primary"
                   @click="onLogin"
                   :loading="loading">
              Login
            </v-btn>
          </v-form>
          <div class="text-xs-center mt-3">
            <v-btn flat
                   @click="passwordForget = !passwordForget">Forgot password?
            </v-btn>
          </div>
        </v-tab-item>
        <v-tab-item class="white pt-4">

          <v-form ref="formRegister">
            <template v-if="!showAfterRegister">
              <v-text-field type="text"
                            v-model="credentials.firstName"
                            name="firstName"
                            :rules="[onRequiredRule]"
                            label="First Name"
                            required/>
              <v-text-field type="text" v-model="credentials.lastName"
                            name="lastName"
                            label="Last Name"
                            :rules="[onRequiredRule]"
                            required/>
              <v-text-field type="email" required name="email"
                            v-model="credentials.email"
                            :rules="[onRequiredRule,onEmailRule]"
                            label="Enter your email"
                            @keyup.enter="onRegister"/>
              <v-text-field v-model="credentials.password"
                            name="password"
                            required type="password"
                            label="Enter your password"
                            :rules="[onRequiredRule]"
                            @keyup.enter="onRegister"/>
              <v-text-field v-model="passwordRepeat"
                            name="passwordRepeat"
                            required type="password"
                            :rules="[samePasswordRule]"
                            label="Repeat your password"
                            @keyup.enter="onRegister"/>
              <v-btn flat
                     @click="onRegister"
                     block
                     outline
                     color="primary"
                     :loading="loading">Sign up
              </v-btn>
            </template>
            <v-alert color="success" v-model="showAfterRegister" icon="done">
              Your registration was successful. Please wait for the admin to confirm your registration.
            </v-alert>
          </v-form>
        </v-tab-item>
      </v-tabs>
      <div v-else>
        <v-form ref="passwordForget">
          <v-alert :value="err" v-text="err"/>
          <v-alert color="info" :value="true"> Currently not implemented !</v-alert>
          <v-text-field type="email" required name="email"
                        v-model="credentials.email"
                        label="Enter your email" @keyup.enter="onPasswordForget"/>
          <v-btn flat
                 @click="onPasswordForget"
                 block
                 outline
                 color="primary"
                 :loading="loading">Request new password
          </v-btn>
          <v-alert color="success" v-model="requestPasswordProcessed" icon="done">
            We sent you an email with further instructions to request a new password.
          </v-alert>
        </v-form>
        <div class="text-xs-center mt-3">
          <v-btn flat
                 @click="passwordForget = !passwordForget">Back to login
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import userSignInMutationGql from '../gql/user/userSignInMutation.gql'
  import signupUserGql from '../gql/user/signupUser.gql'
  import hasArticlesGql from '../gql/article/hasArticles.gql'
  import validationMixin from '../mixins/formValidation'

  export default {
    layout: 'admin',
    mixins: [validationMixin],
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
        showAfterRegister: false,
        hasArticles: false,
        passwordForget: false,
        requestPasswordProcessed: false
      }
    },
    mounted () {
      if (this.$store.getters.canEdit) {
        const redirectUrl = this.hasArticles ? '/' : {name: 'install'}
        this.$router.push(redirectUrl)
      }
    },
    async asyncData ({app}) {
      const apollo = app.apolloProvider.defaultClient
      const res = await apollo.query({
        query: hasArticlesGql
      }).then(({data}) => data.allArticles)
      if (res.length) {
        return {
          hasArticles: true
        }
      }
    },
    methods: {
      async onLogin () {
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
          this.$store.commit('SET_ERROR', (e && e.message) || e)
          return Promise.reject(e)
        }

        this.loading = false

        if (this.$store.getters.canEdit) {
          const redirectUrl = this.hasArticles ? '/' : {name: 'install'}
          this.$router.push(redirectUrl)
          return Promise.resolve(true)
        } else {
          const err = 'You are not logged in or you missing some priviliges'
          this.$store.commit('SET_ERROR', err)
          return Promise.reject(err)
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
      },
      async onPasswordForget () {
        const v = this.$refs.passwordForget.validate()
        if (!v) return
        this.loading = true

        this.loading = false
        this.requestPasswordProcessed = true
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
