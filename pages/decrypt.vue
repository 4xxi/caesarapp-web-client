<template>
  <main
    :class="{
      'page': true,
      'page_pattern': true,
      'page_pattern_paranoid': true
    }"
  >
    <div
      :class="{
        'page__wrapper': true,
        'paranoid': true
      }"
    >
      <GitHubCat :paranoid="true" />
      <div class="container">
        <div class="container__inner">
          <header>
            <div class="header page__header">
              <Logo :paranoid="true"/>
            </div>
          </header>
          <main>
            <div class="main page__main">
              <div class="main_wrapper">
                <DecryptForm
                  @form-submitted="onFormSubmit"
                >
                </DecryptForm>
              </div>
            </div>
          </main>
        </div>
        <footer>
          <PageFooter />
        </footer>
      </div>
    </div>
  </main>
</template>

<script>
  import Logo from '~/components/Logo.vue'
  import DecryptForm from '~/components/DecryptForm.vue'
  import PageFooter from '~/components/PageFooter.vue'
  import GitHubCat from '~/components/GitHubCat.vue'

  import sjcl from 'sjcl'
  import action from '../utils/action'

  export default {
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
    created () {
      this.$store.subscribe((mutation, state) => {
        if (mutation.type === action.DECRYPTED) {
          this.$router.push('/messages/paranoid')
        }
      })
      this.$store.dispatch('REQUEST_IN_PROGRESS', false) // reset preloader
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
      isParanoiaOn () {
        return this.$store.state.privateMode
      }
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
    components: {
      Logo,
      DecryptForm,
      PageFooter,
      GitHubCat
    },
  }
</script>

<style>
</style>
