<template>
  <div>
    <form
      @submit.prevent="onFormSubmit"
      action="#"
      method="POST"
      class="main__form"
    >
       <div
         class="main__password"
       >
        <div
          class="main__password-wrap"
        >
          <label
            for="passphrase"
            class="main__password-title subtitle web-textlabel-18">
            Type Password
          </label>
          <input
            v-model="password"
            type="password"
            class="main__password-input"
            id="passphrase"
            name="passphrase"
            placeholder="Hoc Voluerunt"
          >
          <p
            class="main__password-note"
          >
            You should have been given this password with the link to this text
          </p>
        </div>
      </div>
      <button
        type="submit"
        class="main__btn btn"
      >
        Display Message
      </button>
      <nuxt-link
        to="/"
        class="main__link main__link_crypt"
      >
        or Encrypt
      </nuxt-link>
    </form>
  </div>
</template>

<script>
  export default {
    data: () => ({
      password: ''
    }),
    methods: {
      onFormSubmit: function (e) {
        let formData = {
          password: this.password
        }
        this.$emit('form-submitted', formData)
      }
    }
  }
</script>
