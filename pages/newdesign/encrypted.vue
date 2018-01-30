<template>
  <main
    class="page page_pattern"
    v-bind:class="{ 'page_pattern_paranoid': $store.state.privateMode}">
    <div class="page__wrapper"
         v-bind:class="{ 'page__wrapper_paranoid': $store.state.privateMode}">
      <div class="container">
        <div class="container__inner">
          <header>
            <div class="header page__header">
              <Logo></Logo>
              <ModeTriggerParanoid></ModeTriggerParanoid>
            </div>
          </header>
          <main>
            <div class="main page__main">
              <div class="main_wrapper">
                <EncryptResultParanoid v-if="this.$store.state.privateMode"></EncryptResultParanoid>
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
  import Logo from '~/components/newcomponents/LogoAve.vue'
  import ModeTrigger from '~/components/newcomponents/ModeTrigger.vue'
  import EncryptResult from '~/components/newcomponents/EncryptResult.vue'
  import EncryptResultParanoid from '~/components/newcomponents/EncryptResultParanoid.vue'
  import ModeTriggerParanoid from '~/components/newcomponents/ModeTriggerParanoid.vue'
  import PageFooter from '~/components/newcomponents/PageFooter.vue'

  import sjcl from 'sjcl'
  import axios from 'axios'

  export default {
    created () {
      if (!('id' in this.$store.state.encryptedResult || 'data' in this.$store.state.encryptedResult)) {
        this.$router.replace('/')
      }
    },
    components: {
      Logo,
      ModeTrigger,
      EncryptResult,
      PageFooter,
      EncryptResultParanoid,
      ModeTriggerParanoid
    },
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
        this.progress = true
        this.showMessage = true
        let encryptedMessage = sjcl.encrypt(data['password'], JSON.stringify({
          'secretMessage': data['secretMessage'],
          'files': data['files'],
        })).toString()

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
  }
</script>

<style>
</style>
