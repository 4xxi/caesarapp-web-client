<template>
  <div>
    <form @submit.prevent="onFormSubmit" action="#" method="POST" class="main__form">
      <div class="main__drop-file drop-file">
        <div class="drop-file__wrap">
          <label for="text" class="drop-file__title subtitle web-textlabel-18 ">Text or Image to Encrypt and Expire</label>
          <div class="drop-file__row">
                  <textarea required v-model="secretMessage" id="text" cols="30" rows="4" class="textarea drop-file__textarea"
                            placeholder="Divide et Impera"
                            name="message"></textarea>
            <File maxSize="250 KB" @file-added="onFileAdd" @file-error="onFileError"></File>

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
        <p class="main__password-text web-18" v-bind:style="{ display: !customPassword ? 'block' : 'none' }">
          The password for access will be generated randomly,
          but you can <a href="#" class="main__link js-show-password-link web-18" @click.prevent="customPassword = true">create your own</a>.
        </p>
        <div class="main__password-wrap" v-bind:style="{ display: customPassword ? 'block' : 'none' }">
          <label for="passphrase" class="main__password-title subtitle web-textlabel-18">Password</label>
          <input v-model="password" type="password" class="main__password-input" id="passphrase" name="passphrase"
                 placeholder="Hoc Voluerunt">
          <p class="main__password-note">
            You can leave this field empty and the password will be generated
            randomly
          </p>
        </div>
      </div>
      <button type="submit" class="main__btn btn btn_paranoid">Create Private Encryption</button>
      <a href="#" class="main__link main__link_crypt main__link_crypt_paranoid">or Decrypt</a>
    </form>
  </div>
</template>

<script>
  import Vue from 'vue'
  import generatePassword from 'password-generator'
  import File from '~/components/File.vue'

  import Multiselect from 'vue-multiselect'
  import 'vue-multiselect/dist/vue-multiselect.min.css'
  import 'assets/css/multiselect.css'

  export default {
    components: {
      File,
      Multiselect,
    },
    data: () => ({
      'options': {
      },
      'secretMessage': '',
      'password': '',
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
