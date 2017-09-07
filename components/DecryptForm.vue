<template>
  <div>
    <form @submit.prevent="onFormSubmit" action="#" method="POST" class="main__form">
      <div class="main__password">
        <div class="main__password-wrap main__password-wrap--show">
          <label for="passphrase" class="main__password-title subtitle">Text Password</label>
          <input v-model="password" type="password" class="main__password-input" id="passphrase"  name="passphrase" placeholder="Type">
          <p class="main__password-note">
            You should have been given this password with the link to this text
          </p>
        </div>
      </div>
      <button type="submit" class="main__btn btn">Display Message</button>
    </form>
  </div>
</template>

<script>
  import Vue from 'vue'
  import generatePassword from 'password-generator'
  import sjcl from 'sjcl'
  import axios from 'axios'

  export default {
    data: function () {
      return {
        'secretMessage': '',
        'minutesLimit': 12,
        'queriesLimit': 0,
        'password': '',
        'files': {}
      }
    },
    methods: {
      onFormSubmit: function (e) {

      },
      getMessage: function (id) {
        axios.post(process.env.baseApiUrl + `/api/messages/`,
          {body: data}
        ).then(response => { console.log(response) }).catch(e => { console.log(e) })
      }
    }
  }
</script>
