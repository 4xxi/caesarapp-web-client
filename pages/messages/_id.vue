<template>
  <main class="page page--pattern">
    <div class="page-wrapper container">
      <section class="main main--pass">
        <section class="main__body">
          <Logo></Logo>
          <WaitLoader v-if="!encryptedMessage.length" class="loader"></WaitLoader>
          <div v-bind:class="{ 'hide': !encryptedMessage.length}" class="main__body-wrap">
            <form ref="form" @submit.prevent="decryptMessage" action="#" method="POST" class="main__form">
              <div class="main__password">
                <div class="main__password-wrap main__password-wrap--show">
                  <label for="password" class="main__password-title subtitle">Text Password</label>
                  <input @change="checkPasswordError" ref="password" v-model="password" required type="password"
                         class="main__password-input"
                         id="password"
                         name="password"
                         placeholder="Type">
                  <p v-if="!error" class="main__password-note">
                    You should have been given this password with the link to this text
                  </p>
                  <p v-if="error" style="color: red" class="main__password-note error">
                    {{ error }}
                  </p>
                </div>
              </div>
              <button type="submit" class="main__btn btn">Display Message</button>
            </form>
            <div class="main__secret">
              <p class="main__secret-text"><b>Secret Text</b></p>
              <textarea readonly spellcheck="false" class="main__secret-text" title="Secret Text">
                {{ encryptedMessage}}
              </textarea>
            </div>
          </div>


        </section>
        <aside class="main__info info">
          <p class="info__title">
                    <span class="info__icon-wrap">
                      <svg class="info__icon" width="61" height="64">
                        <use xlink:href="#icon-caesar-head"></use>
                      </svg>
                    </span>
            <span class="info__title-text">Veni, Vidi, Encrypted</span>
          </p>
          <p class="info__text">
            We built KeySafe so customers could securely send passwords and logins to us without
            them living in our help desk software forever. We hope it is useful for you as well.
          </p>
          <p class="info__list-title">Great for:</p>
          <ul class="info__list">
            <li class="info__list-item">Sending login details to support</li>
            <li class="info__list-item">Passing secret URL’s to coworkers</li>
            <li class="info__list-item">Sharing passwords with coworkers</li>
          </ul>
          <div class="info__copyright">
            <a href="https://4xxi.com/" class="info__logo-link">
              <svg class="info__logo" width="32" height="32">
                <use xlink:href="#icon-4xxi-logo"></use>
              </svg>
            </a>
            <p class="info__copyright-text">
              Enjoy! Build by <a href="https://4xxi.com/" class="info__copyright-link">4xxi</a> team <br>
              See our terms of service. © Copyright 2017</p>
          </div>
        </aside>
      </section>
    </div>
    <Modal @modal-close="closeAndRefresh" v-bind:is-active="this.showMessage" v-bind:message="modalMessage"></Modal>
  </main>
</template>
<style>
  textarea.main__secret-text {
    background: #fff;
    padding: 0;
    margin: 0;
    width: 100%;
    height: 150px;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.5;
    color: #343942;
    letter-spacing: .04em;
  }

  .loader {
    position: absolute;
    left: 30%;
    top: 50%;
    transform: translate(-50px, -40px);
    background: #fff;
  }

  .hide {
    visibility: hidden;
  }
</style>
<script>
  import Info from '~/components/Info.vue'
  import Modal from '~/components/DecryptedMessageModal.vue'
  import WaitLoader from '~/components/WaitLoader.vue'
  import Logo from '~/components/Logo.vue'

  import axios from 'axios'
  import sjcl from 'sjcl'

  export default {
    components: {
      Info,
      Modal,
      WaitLoader,
      Logo,
    },
    validate ({params}) {
      // Must be a number
      return /^\w{32}$/.test(params.id)
    },
    data () {
      return {
        error: '',
        encryptedMessage: '',
        password: '',
        showMessage: false,
        modalMessage: {
          'secretMessage': '',
          'files': false,
        },
      }
    },
    created () {
      if (!this.$isServer) {
        let _this = this
        document.addEventListener('keyup', function (e) {
          if (e.keyCode === 27 && _this.encryptedMessage.length > 0) { // escape key maps to keycode `27`
            _this.close()
          }
        })
      }
      axios.get(process.env.baseApiUrl + `/api/messages/` + this.$route.params.id).then(response => {
        this.encryptedMessage = response.data.encryptedMessage
      }).catch(e => {
        this.$router.push('/404')
      })
    },
    methods: {
      reset () {
        Object.assign(this.$data, this.$options.data.call(this))
      },
      decryptMessage () {
        this.error = false
        this.showMessage = this.decrypt()
      },
      decrypt () {
        try {
          this.modalMessage = JSON.parse(sjcl.decrypt(this.password, atob(this.encryptedMessage)))
          return true
        } catch (e) {
          this.error = 'Wrong password'
        }
        return false
      },
      close () {
        this.showMessage = false
        this.modalMessage = {}
        this.password = ''
      },
      closeAndRefresh () {
        this.$router.push('/')
      },
      checkPasswordError (e) {
        if (e.target.value.length === 0) {
          this.error = false
        }
      },
    },
    head: {
      title: 'VENI, VIDI, ENCRYPTED'
    },
  }
</script>
