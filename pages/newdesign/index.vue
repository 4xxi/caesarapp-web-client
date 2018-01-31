<template>
  <main
    class="page page_pattern"
    v-bind:class="{
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
      class="page__wrapper"
      v-bind:class="{
        'page_pattern_paranoid': isParanoiaOn
      }"
    >
      <a
        href="https://github.com/4xxi/caesarapp-server"
        class="github-corner"
        aria-label="View source on Github"
      >
        <svg
          width="80"
          height="80"
          viewBox="0 0 250 250"
          :style="gitHubCatStyle"
          aria-hidden="true"
        >
          <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
          <path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
                fill="currentColor"
                style="transform-origin: 130px 106px;"
                class="octo-arm"
          >
          </path>
          <path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
                fill="currentColor"
                class="octo-body"
          >
          </path>
        </svg>
      </a>
      <style>.github-corner:hover .octo-arm{animation:octocat-wave 560ms ease-in-out}@keyframes octocat-wave{0%,100%{transform:rotate(0)}20%,60%{transform:rotate(-25deg)}40%,80%{transform:rotate(10deg)}}@media (max-width:500px){.github-corner:hover .octo-arm{animation:none}.github-corner .octo-arm{animation:octocat-wave 560ms ease-in-out}}</style>
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
    },
    data () {
      return {
        progress: false,
        showMessage: false,
        modalMessage: {
          link: 'https://4xxi.com',
          password: '',
        },
        gitHubCatStyleNormal: {
          fill: '#005ee0',
          color: '#fff',
          position: 'absolute',
          top: '0',
          border: '0',
          right: '0'
        },
        gitHubCatStylePrivate: {
          fill: '#fff',
          color: '#242424',
          position: 'absolute',
          top: '0',
          border: '0',
          right: '0'
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
      gitHubCatStyle () {
        return this.isParanoiaOn ? this.gitHubCatStylePrivate : this.gitHubCatStyleNormal
      },
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
