<template>
  <main class="page page_pattern">
    <div class="page__wrapper">
      <div class="container">
        <div class="container__inner">
          <header>
            <div class="header page__header">
              <Logo v-if="!doIKnowTheSecret" />
              <LogoAve v-else />
            </div>
          </header>
          <main>
            <div class="main page__main">
              <div class="main_wrapper">
                <EnterPasswordForm
                  v-if="!doIKnowTheSecret"
                  @form-submitted="onFormSubmit"
                >
                </EnterPasswordForm>
                <GoToUrlResParanoid
                  v-else
                />
              </div>
            </div>
          </main>
        </div>
        <footer>
          <PageFooter></PageFooter>
        </footer>
      </div>
    </div>
  </main>
</template>

<script>
  import Logo from '~/components/newcomponents/Logo.vue'
  import LogoAve from '~/components/newcomponents/LogoAve.vue'
  import ModeTrigger from '~/components/newcomponents/ModeTrigger.vue'
  import EnterPasswordForm from '~/components/newcomponents/EnterPasswordForm.vue'
  import PageFooter from '~/components/newcomponents/PageFooter.vue'
  import GoToUrlResParanoid from '~/components/newcomponents/GoToUrlResParanoid.vue'

  import sjcl from 'sjcl'

  export default {
    data () {
      return {
        progress: false,
        showMessage: '',
        error: '',
        encryptedMessage: null,
        modalMessage: {
          link: 'https://4xxi.com',
          password: ''
        },
        secret: {}
      }
    },
    head: {
      title: 'VENI, VIDI, ENCRYPTED',
      meta: [
        {charset: 'utf-8'},
        {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      ],
      script: [
        {src: '/assets/custom.js'},
      ],
    },
    computed: {
      doIKnowTheSecret () {
        return Object.keys(this.secret).length
      }
    },
    methods: {
      onFormSubmit (pass) {
        this.showMessage = this.decrypt(pass)
        if (this.showMessage) {
          this.$store.dispatch('decrypted', this.secret)
        }
      },
      decrypt (pass) {
        try {
          this.secret = JSON.parse(sjcl.decrypt(pass.password, atob(this.encryptedMessage)))
          return true
        } catch (e) {
          this.error = e.message
        }
        return false
      },
      /* onFormSubmit (data) {
        this.progress = true
        this.showMessage = true
        let encryptedMessage = sjcl.encrypt(data['password'], JSON.stringify({
          'secretMessage': data['secretMessage'],
          'files': data['files'],
        })).toString()

        axios.post(process.env.baseApiUrl + `/api/messages`,
          {
            'encryptedMessage': btoa(encryptedMessage)
          },
        ).then(response => {
          this.progress = false
          this.showModalMessage(response.data.id, data['password'])
        }).catch(e => {
          console.log(e)
          this.progress = false
          this.showMessage = false
        })
      }, */
      showModalMessage (id, password) {
        let props = this.$router.resolve({
          name: 'messages-id',
          params: {id: id},
        })
        this.modalMessage = {
          link: window.location.origin + props.href,
          password: password,
        }
        this.showMessage = true
      },
      close () {
        this.showMessage = false
      },
      closeAndRefresh () {
        this.showMessage = false
      },
    },
    validate ({params}) {
      // Must be a number
      return /^\w{32}$/.test(params.id)
    },
    created () {
      this.$store.dispatch('readMessage', this.$route.params.id)
        .then(() => (this.encryptedMessage = this.$store.state.message.encryptedMessage))
    },
    components: {
      Logo,
      LogoAve,
      ModeTrigger,
      EnterPasswordForm,
      PageFooter,
      GoToUrlResParanoid
    }
  }
</script>

<style>
</style>
