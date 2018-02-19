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
    /* created () {
      this.$store.subscribe((mutation, state) => {
        if (mutation.type === action.CREATED_MESSAGE ||
        mutation.type === action.REQUEST_COMPLETE) {
          this.$router.push('/encrypted')
        }
      })
    }, */
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
        this.$store.commit('REQUEST_IN_PROGRESS')
        const thisStore = this.$store
        const thisRouter = this.$router
        this.progress = true
        this.showMessage = true

        function encryptMessage (thisStore, thisRouter) {
          instance.encrypt(data).then((message) => {
            let encryptedMessage = {
              'encryptedMessage': message,
              'minutesLimit': data['minutesLimit']['value'],
              'queriesLimit': data['queriesLimit']['value'],
            }
            if (thisStore.state.privateMode) {
              thisStore.dispatch('createParanoidMessage', encryptedMessage).then(() => {
                thisStore.commit('REQUEST_COMPLETE')
                thisRouter.push('/encrypted')
              })
            } else {
              thisStore.dispatch('createMessage', encryptedMessage).then(() => {
                thisStore.commit('REQUEST_COMPLETE')
                thisRouter.push('/encrypted')
              })
            }
            thisStore.dispatch('applyPassword', data['password'])
          })
        }
        encryptMessage(thisStore, thisRouter)
        // let encryptedMessage = {
        //   'encryptedMessage': instance.encrypt(data),
        //   'minutesLimit': data['minutesLimit']['value'],
        //   'queriesLimit': data['queriesLimit']['value'],
        // }
        // let encryptedMessage = {
        //   'encryptedMessage': await btoa(sjcl.encrypt(data['password'], JSON.stringify({
        //     'secretMessage': data['secretMessage'],
        //     'files': data['files'],
        //   })).toString()),
        //   'minutesLimit': data['minutesLimit']['value'],
        //   'queriesLimit': data['queriesLimit']['value'],
        // }
        // let encryptedMessage = {
        //   'encryptedMessage': btoa(sjcl.encrypt(data['password'], JSON.stringify({
        //     'secretMessage': data['secretMessage'],
        //     'files': data['files'],
        //   })).toString()),
        //   'minutesLimit': data['minutesLimit']['value'],
        //   'queriesLimit': data['queriesLimit']['value'],
        // }
        // if (this.$store.state.privateMode) {
        //   this.$store.dispatch('createParanoidMessage', encryptedMessage).then(() => {
        //     this.$store.commit('REQUEST_COMPLETE')
        //     this.$router.push('/encrypted')
        //   })
        // } else {
        //   this.$store.dispatch('createMessage', encryptedMessage)
        // }
        // this.$store.dispatch('applyPassword', data['password'])
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
