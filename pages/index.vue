<template>
  <main
    class="page page_pattern"
    :class="{
      'page_pattern_paranoid': isParanoiaOn,
      'page_modal':  $store.state.throwFiles}"
  >

    <ThrowFiles
      v-if="$store.state.throwFiles"
    >
    </ThrowFiles>
    <WaitLoader
      v-if="isPennding"
    >
    </WaitLoader>
    <div
      v-if="!$store.state.requestInProgress"
      :class="{
        'page__wrapper': true,
        'paranoid': isParanoiaOn
      }"
    >
      <GitHubCat />
      <div class="container">
        <div class="container__inner">
          <header>
            <div class="header page__header">
              <Logo></Logo>
              <ModeTrigger
                :paranoiaMode="isParanoiaOn"
              ></ModeTrigger>
            </div>
          </header>
          <main>
            <div class="main page__main">
              <div class="main_wrapper">
                <EncryptForm @form-submitted="onFormSubmit"></EncryptForm>
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
  import ModeTrigger from '~/components/ModeTrigger.vue'
  import EncryptForm from '~/components/EncryptForm.vue'
  import PageFooter from '~/components/PageFooter.vue'
  import ThrowFiles from '~/components/ThrowFiles.vue'
  import WaitLoader from '~/components/WaitLoader.vue'
  import GitHubCat from '~/components/GitHubCat.vue'

  // import sjcl from 'sjcl'
  import worker from 'workerize-loader!../utils/worker'
  /* import action from '../utils/action' */
  let instance

  export default {
    data () {
      return {
        progress: false,
        showMessage: false,
        modalMessage: {
          link: 'https://4xxi.com',
          password: '',
        }
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
    mounted () {
      instance = worker()
    },
    created () {
      this.$store.dispatch('REQUEST_IN_PROGRESS', false) // reset preloader
    },
    computed: {
      isParanoiaOn () {
        return this.$store.state.privateMode
      },
      isPennding () {
        return this.$store.state.requestInProgress
      }
    },
    methods: {
      onFormSubmit (data) {
        // const thisStore = this.$store
        // const thisRouter = this.$router
        this.progress = true
        this.showMessage = true
        this.$store.dispatch('REQUEST_IN_PROGRESS', true)
        instance.encrypt(data).then((message) => {
          let encryptedMessage = {
            'encryptedMessage': message,
            'minutesLimit': data['minutesLimit']['value'],
            'queriesLimit': data['queriesLimit']['value'],
          }
          this.$store.dispatch('applyPassword', data['password'])
          if (this.$store.state.privateMode) {
            this.$store.dispatch('createParanoidMessage', encryptedMessage).then(() => {
              this.$router.push('/encrypted')
            })
          } else {
            this.$store.dispatch('createMessage', encryptedMessage).then(() => {
              this.$router.push('/encrypted')
            })
          }
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
    components: {
      Logo,
      ModeTrigger,
      EncryptForm,
      PageFooter,
      ThrowFiles,
      WaitLoader,
      GitHubCat
    }
  }
</script>

<style>
</style>
