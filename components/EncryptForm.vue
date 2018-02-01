<template>
  <div>
    <form @submit.prevent="onFormSubmit" action="#" method="POST" class="main__form">
      <div class="main__drop-file drop-file">
        <div class="drop-file__wrap">
          <label for="text" class="drop-file__title subtitle">Text or Image to Encrypt and Expire</label>
          <div class="drop-file__row">
                  <textarea required v-model="secretMessage" id="text" cols="30" rows="5" class="textarea drop-file__textarea"
                            placeholder="Type"
                            name="message"></textarea>
            <File maxSize="250 KB" @file-added="onFileAdd" @file-error="onFileError"></File>
          </div>
        </div>
      </div>
      <div class="main__expires expires">
        <p class="expires__title subtitle">Text Expires After</p>
        <div class="expires__row">
          <div class="expires__select-wrap expires__select-wrap--hours">
            <multiselect
              id="expires-hours" class="expires__select select" name="expires_at" placeholder="Select one"
              v-model="minutesLimit"
              label="name"
              :searchable="false"
              :allow-empty="false"
              :close-on-select="true"
              :show-labels="false"
              :options="options.minutesLimit">
            </multiselect>
          </div>
          <div class="expires__select-wrap expires__select-wrap--limits">
            <multiselect
              id="expires-limits" class="expires__select select" name="limit" placeholder="Select one"
              v-model="queriesLimit"
              label="name"
              :searchable="false"
              :allow-empty="false"
              :close-on-select="true"
              :show-labels="false"
              :options="options.queriesLimit">
            </multiselect>
          </div>
        </div>
      </div>
      <div class="main__files">
        <div v-for="file in files" class="main__file file-load">
          <span class="file-load__type-icon">{{ file.ext }}</span>
          <span class="file-load__title">{{ file.name }}</span>
          <button @click="removeFile(file.id)" type="button" class="file-load__del">Delete</button>
        </div>
        <div v-for="file in errorFiles" class="file-load__load file-load__load--error">
          <div class="file-load__load-left">
            <p class="file-load__load-title">{{ file.name }}</p>
            <p class="file-load__error">Error: {{ file.error }}</p>
          </div>
        </div>
      </div>
      <div class="main__password">
        <p class="main__password-text" v-bind:style="{ display: !customPassword ? 'block' : 'none' }">
          The password for access will be generated randomly,
          but <a href="#" class="main__link js-show-password-link" @click.prevent="customPassword = true">you can enter your own</a>.
        </p>
        <div class="main__password-wrap" v-bind:style="{ display: customPassword ? 'block' : 'none' }">
          <label for="passphrase" class="main__password-title subtitle">Password</label>
          <input v-model="password" type="password" class="main__password-input" id="passphrase" name="passphrase"
                 placeholder="This will be required to decrypt the text">
          <p class="main__password-note">
            You can leave this field empty and the password will be generated
            randomly
          </p>
        </div>
      </div>
      <button type="submit" class="main__btn btn">Create Private Encrypted Link</button>
    </form>
  </div>
</template>

<script>
  import Vue from 'vue'
  import generatePassword from 'password-generator'
  import File from '~/components/File.vue'

  import Multiselect from 'vue-multiselect'
  import 'vue-multiselect/dist/vue-multiselect.min.css'

  export default {
    components: {
      File,
      Multiselect,
    },
    data: () => ({
      'options': {
        'minutesLimit': [
          {
            'name': '10 minutes',
            'value': 10,
          },
          {
            'name': '12 hours',
            'value': 720,
          },
          {
            'name': '24 hours',
            'value': 1440,
          },
          {
            'name': '1 hour',
            'value': 2160,
          }],
        'queriesLimit': [
          {
            'name': 'No limit',
            'value': 0,
          },
          {
            'name': '1 time',
            'value': 1,
          },
          {
            'name': '10 times',
            'value': 10,
          },
          {
            'name': '50 times',
            'value': 50,
          }],
      },
      'secretMessage': '',
      'minutesLimit': {
        'name': '10 minutes',
        'value': 10,
      },
      'queriesLimit': {
        'name': 'No limit',
        'value': 0,
      },
      'password': 'nopassword',
      'files': {},
      'errorFiles': {},
      'customPassword': false,
    }),
    methods: {
      onFileChange: function (e) {
        let files = e.target.files || e.dataTransfer.files
        this.handleFile(files)
        e.target.value = ''
      },
      reset () {
        Object.assign(this.$data, this.$options.data.call(this))
      },
      onFormSubmit: function (e) {
        this.postMessage({
          'secretMessage': this.$data['secretMessage'],
          'password': this.$data['password'] || generatePassword(),
          'files': this.$data['files'],
          'minutesLimit': this.$data['minutesLimit'],
          'queriesLimit': this.$data['queriesLimit'],
        })
        this.reset()
      },
      postMessage: function (data) {
        this.$emit('form-submitted', data)
      },
      handleFile: function (files) {
        for (let i = 0, f; (f = files[i]); i++) {
          this.readFile(f)
        }
      },
      readFile: function (file) {
        let files = this.files
        let userFile = {
          id: new Date().getTime(),
          ext: file.name.split('.').pop(),
          name: file.name,
          body: '',
        }

        let reader = new FileReader()
        reader.onload = function (readerEvt) {
          userFile['body'] = readerEvt.target.result
          Vue.set(files, userFile.id, userFile)
          console.log(files)
        }
        reader.readAsDataURL(file)
      },
      onFileError (file) {
        Vue.set(this.errorFiles, file.id, file)
      },
      onFileAdd (file) {
        Vue.set(this.files, file.id, file)
      },
      removeFile (id) {
        Vue.delete(this.files, id)
      },
    },
  }
</script>
