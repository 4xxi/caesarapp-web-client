<template>
  <div class="encrypt-result">
    <div class="encrypt-result__title web-textlabel-18">
      Use the temporary encrypted link below to retrieve the secret
    </div>
    <textarea cols="10" ref="message" class="encrypt-result__textarea textarea" title="Message">
Follow the link and enter the password
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
URL: {{baseUrl}}/messages/{{$store.state.encryptedResult.id}}
Password: {{$store.state.encryptedResult.password}}
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Securely created with {{baseUrl}}</textarea>
    <div class="main__inner">
      <div>
        <button @click.prevent="copy" class="main__btn main__btn btn">Copy All</button>
      </div>
      <nuxt-link
        class="main__link main__link_crypt main__link_crypt_grey"
        to="/"
      >
        Create New Encryption
      </nuxt-link>
    </div>
  </div>
</template>

<script>
  export default {
    computed: {
      baseUrl () {
        return this.$env.BASE_URL
      }
    },
    methods: {
      copy () {
        this.$refs['message'].select()
        document.execCommand('copy')
        event.target.classList.add('btn__green')
        event.target.innerText = 'Copied'
      },
    },
  }
</script>
