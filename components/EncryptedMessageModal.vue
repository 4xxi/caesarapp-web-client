<template>
  <div>
    <div v-bind:class="{ 'overlay-show': isActive}" class="overlay"></div>
    <div v-bind:class="{ 'message-open': isActive}" class="message container">
      <div class="message__head head">
        <svg class="head__icon" width="80" height="84">
          <use xlink:href="#icon-caesar-head"></use>
        </svg>
        <p class="head__title">
          <span class="head__upper-text">Ave Caesar!</span><br>
          Use the temporary encrypted link below to retrieve the text
        </p>
      </div>
      <div class="message__body result">
        <WaitLoader v-if="isProgress"></WaitLoader>
        <div v-else>
          <div class="result__info js-result-text">
            <p class="result__text">Follow the link and enter the password</p>
            <div class="result__result-wrap">
              <router-link to="go"/>
              <textarea readonly ref="shared-message" class="result__result-text" wrap="soft"
                        title="Shared message">URL: {{message.link}}&#13;&#10;Password: {{message.password}}</textarea>
            </div>
            <p class="result__text">Securely created with https://caesarapp.4xxi.com</p>
          </div>
          <div class="result__actions actions">
            <div class="actions__left">
              <button @click="copy" class="actions__btn btn js-btn-copy-result" type="button">Copy all</button>
            </div>
            <div class="actions__right">
              <a href="#" @click.prevent="close" class="actions__link">Close and create a new link</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import WaitLoader from '~/components/WaitLoader.vue'

  export default {
    components: {
      WaitLoader,
    },
    sharedMessage: '#shared-message',
    props: ['is-active', 'is-progress', 'message'],
    methods: {
      copy () {
        this.$refs['shared-message'].select()
        document.execCommand('copy')
      },
      close () {
        this.$emit('modal-close')
      },
    },

  }
</script>
