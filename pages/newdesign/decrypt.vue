<template>
  <main
    class="page page_pattern page_pattern_paranoid">
    <div class="page__wrapper page__wrapper_paranoid">
      <div class="container">
        <div class="container__inner">
          <header>
            <div class="header page__header">
              <Logo></Logo>
              <ModeTrigger @disabled="true"></ModeTrigger>
            </div>
          </header>
          <main>
            <div class="main page__main">
              <div class="main_wrapper">
                <DecryptForm @form-submitted="onFormSubmit"></DecryptForm>
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
  import ModeTrigger from '~/components/newcomponents/ModeTrigger.vue'
  import DecryptForm from '~/components/newcomponents/DecryptForm.vue'
  import PageFooter from '~/components/newcomponents/PageFooter.vue'

  import sjcl from 'sjcl'
  import action from '../../utils/action'

  export default {
    components: {
      Logo,
      ModeTrigger,
      DecryptForm,
      PageFooter,
    },
    created () {
      this.$store.dispatch('toggleMode', true)
      this.$store.subscribe((mutation, state) => {
        if (mutation.type === action.DECRYPTED) {
          this.$router.push('/newdesign/messages/paranoid')
        }
      })
    },
    data () {
      return {
        progress: false,
        showMessage: false,
        error: false,
        modalMessage: {
          link: 'https://4xxi.com',
          password: '',
        },
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
    methods: {
      onFormSubmit (data) {
        let decryptResult = this.decrypt(data)
        if (decryptResult) {
          this.$store.dispatch('decrypted', decryptResult)
        }
      },
      close () {
        this.showMessage = false
      },
      closeAndRefresh () {
        this.showMessage = false
      },
      decrypt (data) {
        try {
          return JSON.parse(sjcl.decrypt(data.password, atob(data.encryptedMessage)))
        } catch (e) {
          this.error = e.message
        }
        return false
      },
    },
  }
</script>

<style>
</style>
