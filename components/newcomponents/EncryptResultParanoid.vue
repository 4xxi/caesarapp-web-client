<template>
  <div class="encrypt-result">
    <div class="encrypt-result__title encrypt-result__title_paranoid web-textlabel-18">
      Use the temporary encrypted link below to retrieve the secret.
    </div>
    <textarea cols="10" ref="link_message" class="encrypt-result__textarea textarea" title="Message">
Follow the link and enter the password
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
URL: {{baseUrl}}/view/decrypt
Password: {{$store.state.encryptedResult.password}}
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Securely created with {{baseUrl}}</textarea>
    <div class="main__inner">
      <div>
        <button @click.prevent="copy('link_message', $event)" class="main__btn main__btn_mb btn btn_paranoid">Copy URL & Password</button>
      </div>
    </div>
    <div class="encrypt-result__title encrypt-result__title_paranoid web-textlabel-18">
      It's encrypted text, you may to share it via email or chat.
    </div>
    <textarea cols="10" ref="data_message" class="encrypt-result__textarea textarea" title="Message">{{$store.state.encryptedResult.data}}</textarea>
    <div class="main__inner">
      <div>
        <button @click.prevent="copy('data_message', $event)" class="main__btn main__btn btn btn_paranoid">Copy Encrypted Text</button>
      </div>
      <a href="#" class="main__link main__link_crypt main__link_crypt_grey">
        Create New Encryption
      </a>
    </div>
  </div>
</template>

<script>
  import hostname from '../../utils/hostname'

  export default {
    data: () => ({
      baseUrl: hostname,
    }),
    methods: {
      copy (ref, event) {
        this.$refs[ref].select()
        document.execCommand('copy')
        event.target.classList.add('btn__green')
        event.target.innerText = 'Copied'
      },
    },
  }
</script>
