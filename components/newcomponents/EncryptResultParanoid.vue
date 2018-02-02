<template>
  <div class="encrypt-result">
    <div class="encrypt-result__title encrypt-result__title_paranoid web-textlabel-18">
      Use the temporary encrypted link below to retrieve the secret.
    </div>
    <textarea
      ref="link_message"
      :class="{
        'encrypt-result__textarea': true,
        'textarea': true,
        'textarea_paranoid': isParanoiaOn
      }"
      title="Message"
    >
Follow the link and enter the password
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
URL: {{baseUrl}}/view/decrypt
Password: {{$store.state.encryptedResult.password}}
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Securely created with {{baseUrl}}
    </textarea>
    <div class="main__inner">
      <div>
        <div class="main__row-btn">
          <button
            @click.prevent="handlerForCopyBtns('link_message', $event)"
            class="main__btn main__btn_mb btn btn_paranoid"
          >
            Copy URL & Password
          </button>
        </div>
        <div
          v-if="isReminderEncOn"
          class="reminder reminder_url"
        >
          <img
            src="~assets/img/arrow-white.svg"
            class="reminder__arrow reminder__arrow_url"
          >
          <div
            class="reminder__desc reminder__desc_url"
          >
            Don’t forget to copy
            url and password
          </div>
        </div>
      </div>
    </div>
    <div class="encrypt-result__title encrypt-result__title_paranoid web-textlabel-18">
      It's encrypted text, you may to share it via email or chat.
    </div>
    <textarea
      ref="data_message"
      :class="{
        'encrypt-result__textarea': true,
        'textarea': true,
        'textarea_paranoid': isParanoiaOn
      }"
      title="Message"
    >{{$store.state.encryptedResult.data}}
    </textarea>
    <div class="main__inner">
      <div>
        <button
          @click.prevent="handlerForCopyBtns('data_message', $event)"
          class="main__btn main__btn btn btn_paranoid"
        >
          Copy Encrypted Text
        </button>
      </div>
      <nuxt-link
        to="/newdesign"
        class="main__link main__link_crypt main__link_crypt_grey"
      >
        Create New Encryption
      </nuxt-link>
      <div
        v-if="isReminderUrlOn"
        class="reminder reminder_enc"
      >
        <div
          class="reminder__desc reminder__desc_enc"
        >
          Don’t forget to copy
          the encrypted text
        </div>
        <img
          src="~assets/img/arrow-mirrored.svg"
          class="reminder__arrow reminder__arrow_enc"
        >
      </div>
    </div>
  </div>
</template>

<script>
  import hostname from '../../utils/hostname'

  export default {
    data: () => ({
      baseUrl: hostname,
      copyUrlFlag: false,
      copyEncFlag: false
    }),
    computed: {
      isParanoiaOn () {
        return this.$store.state.privateMode
      },
      isReminderUrlOn () {
        return this.copyUrlFlag && !this.copyEncFlag
      },
      isReminderEncOn () {
        return !this.copyUrlFlag && this.copyEncFlag
      }
    },
    methods: {
      copy (ref, event) {
        this.$refs[ref].select()
        document.execCommand('copy')
        event.target.classList.add('btn__green')
        event.target.innerText = 'Copied'
      },
      setBtnsFlags (ref) {
        ref === 'link_message' ? this.copyUrlFlag = true : this.copyEncFlag = true
      },
      handlerForCopyBtns (ref, event) {
        this.setBtnsFlags(ref)
        this.copy(ref, event)
      },
    },
  }
</script>
