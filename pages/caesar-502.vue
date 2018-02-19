<template>
  <main class="page page_aux page_pattern">
    <div class="aux">
      <div class="aux__side aux__left">
        <div class="aux__logo">Caesar App</div>
      </div>
      <div class="aux__side aux__center">
        <div class="aux__block">
          <img src="~/assets/img/logo-dead.svg" alt="logo" class="aux__icon">
          <div class="aux__desc">Hey, Brutus! It seems that we have some problems. Come back later.</div>
        </div>
      </div>
      <div class="aux__side aux__right">
        <div class="aux__type">502</div>
      </div>
      <div class="aux-block">
      </div>
    </div>
  </main>
</template>

<script>
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
