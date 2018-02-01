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
      v-if="$store.state.requestInProgress"
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
                <!--<DecryptForm @form-submitted="onFormSubmit"></DecryptForm>-->
                <EncryptForm @form-submitted="onFormSubmit"></EncryptForm>
                <!--<EncryptResult @encryptedResult="$store.state.encryptedResult"></EncryptResult>-->
                <!--<EncryptResult></EncryptResult>-->
                <!--<GoToUrl @form-submitted="onFormSubmit"></GoToUrl>-->
                <!--<GoToUrlRes></GoToUrlRes>-->
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
  import LogoBig from '~/components/newcomponents/LogoBig.vue'
  import ModeTrigger from '~/components/newcomponents/ModeTrigger.vue'
  import EncryptForm from '~/components/newcomponents/EncryptForm.vue'
  import EncryptResult from '~/components/newcomponents/EncryptResult.vue'
  import DecryptForm from '~/components/newcomponents/DecryptForm.vue'
  import GoToUrl from '~/components/newcomponents/GoToUrl.vue'
  import GoToUrlRes from '~/components/newcomponents/GoToUrlRes.vue'
  import PageFooter from '~/components/newcomponents/PageFooter.vue'
  import ThrowFiles from '~/components/newcomponents/ThrowFiles.vue'
  import WaitLoader from '~/components/newcomponents/WaitLoader.vue'
  import GitHubCat from '~/components/newcomponents/GitHubCat.vue'

  import sjcl from 'sjcl'
  import action from '../../utils/action'

  export default {
    components: {
      Logo,
      LogoBig,
      ModeTrigger,
      EncryptForm,
      EncryptResult,
      DecryptForm,
      GoToUrl,
      GoToUrlRes,
      PageFooter,
      ThrowFiles,
      WaitLoader,
      GitHubCat
    },
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
    created () {
      this.$store.subscribe((mutation, state) => {
        if (mutation.type === action.CREATED_MESSAGE ||
        mutation.type === action.CREATED_PARANOID_MESSAGE) {
          this.$router.push('/newdesign/encrypted')
        }
      })
    },
    computed: {
      isParanoiaOn () {
        return this.$store.state.privateMode
      }
    },
    methods: {
      onFormSubmit (data) {
        // console.log(data)
        this.progress = true
        this.showMessage = true
        let encryptedMessage = {
          'encryptedMessage': btoa(sjcl.encrypt(data['password'], JSON.stringify({
            'secretMessage': data['secretMessage'],
            'files': data['files'],
          })).toString()),
          'minutesLimit': data['minutesLimit']['value'],
          'queriesLimit': data['queriesLimit']['value'],
        }
        if (this.$store.state.privateMode) {
          this.$store.dispatch('createParanoidMessage', encryptedMessage)
        } else {
          this.$store.dispatch('createMessage', encryptedMessage)
        }
        this.$store.dispatch('applyPassword', data['password'])
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
  }
</script>

<style>
</style>
