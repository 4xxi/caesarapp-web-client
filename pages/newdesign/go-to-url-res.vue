<template>
  <main class="page page_pattern">
    <div class="page__wrapper">
      <div class="container">
        <div class="container__inner">
          <header>
            <div class="header page__header">
              <LogoBig></LogoBig>
            </div>
          </header>
          <main>
            <div class="main page__main">
              <div class="main_wrapper">
                <GoToUrlRes @form-submitted="onFormSubmit"></GoToUrlRes>
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
  import LogoBig from '~/components/LogoBig.vue'
  import ModeTrigger from '~/components/ModeTrigger.vue'
  import GoToUrlRes from '~/components/newcomponents/GoToUrlRes.vue'
  import PageFooter from '~/components/PageFooter.vue'

  import sjcl from 'sjcl'
  import axios from 'axios'

  export default {
    components: {
      LogoBig,
      ModeTrigger,
      GoToUrlRes,
      PageFooter
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
