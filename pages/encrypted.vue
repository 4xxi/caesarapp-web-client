<template>
  <main
    :class="{
      'page': true,
      'page_pattern': true,
      'page_pattern_paranoid': isParanoiaOn
    }"
  >
    <div
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
            </div>
          </header>
          <main>
            <div class="main page__main">
              <div class="main_wrapper">
                <EncryptResultParanoid
                  v-if="this.$store.state.privateMode"
                />
                <EncryptResult v-else></EncryptResult>
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
  import Logo from '~/components/LogoAve.vue'
  import ModeTrigger from '~/components/ModeTrigger.vue'
  import EncryptResult from '~/components/EncryptResult.vue'
  import EncryptResultParanoid from '~/components/EncryptResultParanoid.vue'
  import PageFooter from '~/components/PageFooter.vue'
  import GitHubCat from '~/components/GitHubCat.vue'

  import sjcl from 'sjcl'
  import axios from 'axios'

  export default {
    data () {
      return {
        progress: false,
        showMessage: false,
        modalMessage: {
          link: 'https://4xxi.com',
          password: '',
        },
      }
    },
    created () {
      if (!('id' in this.$store.state.encryptedResult || 'data' in this.$store.state.encryptedResult)) {
        this.$router.replace('/')
      }
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
        this.progress = true
        this.showMessage = true
        let encryptedMessage = sjcl.encrypt(data['password'], JSON.stringify({
          'secretMessage': data['secretMessage'],
          'files': data['files'],
        })).toString()
        console.log('test')
        axios.post(process.env.baseApiUrl + `/api/messages`,
          {
            'encryptedMessage': btoa(encryptedMessage),
            'minutesLimit': data['minutesLimit']['value'],
            'queriesLimit': data['queriesLimit']['value'],
          },
        ).then(response => {
          this.progress = false
          this.showModalMessage(response.data.id, data['password'])
        }).catch(e => {
          console.log(e)
          this.progress = false
          this.showMessage = false
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
      EncryptResult,
      PageFooter,
      EncryptResultParanoid,
      GitHubCat
    },
  }
</script>

<style>
</style>
