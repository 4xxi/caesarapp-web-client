<template>
  <div>
    <form @submit.prevent="onFormSubmit" action="#" method="POST" class="main__form">
      <div class="main__drop-file drop-file">
        <div class="drop-file__wrap">
          <label for="text" class="drop-file__title subtitle web-textlabel-18 ">Encrypted text</label>
          <div class="drop-file__row">
            <textarea
              required
              v-model="encryptedMessage"
              id="text"
              cols="30"
              rows="4"
              :class="{
                'textarea': true,
                'drop-file__textarea': true,
                'drop-file__textarea_decrypt': true,
                'drop-file__textarea_paranoid': isParanoiaOn
              }"
              placeholder="Paste text here"
              name="message"
            >
            </textarea>
          </div>
        </div>
      </div>
      <div class="main__password main__password_decrypt">
        <div class="main__password-wrap">
          <label for="passphrase" class="main__password-title subtitle web-textlabel-18">Password</label>
          <input
            required
            v-model="password"
            type="password"
            :class="{
              'main__password-input': true,
              'main__password-input_paranoid': isParanoiaOn
            }"
            id="passphrase"
            name="passphrase"
            placeholder="Hoc Voluerunt"
          >
          <p class="main__password-note">
            You should have been given this password with the link to this text
            randomly
          </p>
        </div>
      </div>
      <button
        type="submit"
        :class="{
            'main__btn': true,
            'btn': true,
            'btn_paranoid': isParanoiaOn
        }"
      >
        Display Message
      </button>
      <div class="main__link-wrap">
        <span
          :class="{
            'main__or': true,
            'main__or_paranoid': isParanoiaOn
          }"
        >
          or
        </span>
        <router-link
          to="/"
          :class="{
              'main__link': true,
              'main__link_crypt': true,
              'main__link_crypt_paranoid': isParanoiaOn,
          }">
          Encrypt
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    data: () => ({
      encryptedMessage: '',
      password: '',
    }),
    computed: {
      isParanoiaOn () {
        return this.$store.state.privateMode
      }
    },
    methods: {
      onFormSubmit: function (e) {
        let formData = {
          'encryptedMessage': this.$data['encryptedMessage'],
          'password': this.$data['password'],
        }
        this.$emit('form-submitted', formData)
      }
    }
  }
</script>

<style scoped>
  .drop-file__wrap {
    margin-bottom: 0;
  }
</style>
