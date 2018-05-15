<template>
  <main class="page page_pattern">
    <div class="page__wrapper">
      <div class="container">
        <div class="container__inner">
          <header>
            <div class="header page__header">
              <Logo v-if="!isDecrypted"/>
              <LogoAve v-else/>
            </div>
          </header>
          <main>
            <div class="main page__main">
              <div class="main_wrapper">
                <EnterPasswordForm
                  v-if="!isDecrypted"
                  v-bind:error-message="errorMessage"
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
  import Logo from '~/components/Logo.vue'
  import LogoAve from '~/components/LogoAve.vue'
  import ModeTrigger from '~/components/ModeTrigger.vue'
  import EnterPasswordForm from '~/components/EnterPasswordForm.vue'
  import PageFooter from '~/components/PageFooter.vue'
  import GoToUrlResParanoid from '~/components/DecryptedResult.vue'
  import worker from 'workerize-loader!../../utils/worker'
  // import action from '../../utils/action'

  let instance

  export default {
    data () {
      return {
        progress: false,
        showMessage: '',
        errorMessage: '',
        modalMessage: {
          link: 'https://4xxi.com',
          password: '',
        },
        message: null,
      }
    },
    computed: {
      encryptedMessage () {
        return this.$store.state.message.message
      },
      isDecrypted () {
        return this.message
      },
    },
    mounted () {
      instance = worker()
    },
    methods: {
      onFormSubmit ({password}) {
        instance.decrypt(password, this.encryptedMessage).then((message) => {
          if (message.hasOwnProperty('secretMessage')) {
            this.$store.dispatch('decrypted', message)
            this.message = true
          } else {
            this.errorMessage = 'Wrong password'
          }
        })
      },
      decrypt (password) {
        return instance.decrypt(password, this.encryptedMessage).then((message) => {
          this.message = message
        })
      },
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
      return /^\w{40}$/.test(params.id)
    },
    async fetch ({store, params, error}) {
      try {
        await store.dispatch('readMessage', params.id)
      } catch (e) {
        error({statusCode: 404, message: e.statusText})
      }
    },
    components: {
      Logo,
      LogoAve,
      ModeTrigger,
      EnterPasswordForm,
      PageFooter,
      GoToUrlResParanoid,
    },
  }
</script>

<style>
</style>
