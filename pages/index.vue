<template>
  <main class="page page--pattern">
    <div class="page-wrapper container">
      <section class="main">
        <section class="main__body">
          <Logo></Logo>
          <div class="main__body-wrap">
            <EncryptForm @form-submitted="onFormSubmit"></EncryptForm>
          </div>
        </section>
        <aside class="main__info info">
          <Info></Info>
        </aside>
      </section>
    </div>
    <Modal @modal-close="closeAndRefresh" v-bind:is-progress="progress" v-bind:is-active="showMessage"
           v-bind:message="modalMessage"></Modal>
  </main>
</template>

<script>
  import EncryptForm from '~/components/EncryptForm.vue'
  import Info from '~/components/Info.vue'
  import Modal from '~/components/EncryptedMessageModal.vue'
  import Logo from '~/components/Logo.vue'

  import sjcl from 'sjcl'
  import axios from 'axios'

  export default {
    components: {
      EncryptForm,
      Info,
      Modal,
      Logo,
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
      link: [
        {rel: 'stylesheet', href: '/assets/custom.css'},
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
