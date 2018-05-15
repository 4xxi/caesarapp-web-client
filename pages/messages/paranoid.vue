<template>
  <main
    :class="{
      'page': true,
      'page_pattern': true,
      'page_pattern_paranoid': true
    }"
  >
    <div
      :class="{
        'page__wrapper': true,
        'paranoid': true
     }"
    >
      <GitHubCat />
      <div class="container">
        <div class="container__inner">
          <header>
            <div class="header page__header">
              <LogoBigParanoid/>
            </div>
          </header>
          <main>
            <div class="main page__main">
              <div class="main_wrapper">
                <DecryptedResult @form-submitted="onFormSubmit"></DecryptedResult>
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
  import LogoBigParanoid from '~/components/LogoBigParanoid.vue'
  import DecryptedResult from '~/components/DecryptedResult.vue'
  import PageFooter from '~/components/PageFooter.vue'
  import GitHubCat from '~/components/GitHubCat.vue'

  import sjcl from 'sjcl'
  import axios from 'axios'

  export default {
    components: {
      LogoBigParanoid,
      DecryptedResult: DecryptedResult,
      PageFooter,
      GitHubCat
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

        axios.post(process.env.baseApiUrl + `/api/messages`,
          {
            'encryptedMessage': btoa(encryptedMessage),
            'secondsLimit': data['secondsLimit']['value'],
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
