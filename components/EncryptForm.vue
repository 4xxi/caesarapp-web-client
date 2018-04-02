<template>
  <div>
    <form
      @submit.prevent="onFormSubmit"
      action="#"
      method="POST"
      class="main__form"
      autocomplete="off"
    >
      <div class="main__drop-file drop-file">
        <div
          :class="{
            'drop-file__wrap': true,
            'drop-file__wrap_with-files': hasFiles
          }"
        >
          <label
            for="text"
            class="drop-file__title subtitle web-textlabel-18"
          >
            Text or Image to Encrypt and Expire
          </label>
          <div class="drop-file__row">
                  <textarea
                    required v-model="secretMessage"
                    id="text"
                    cols="30"
                    rows="4"
                    :class="{
                      'drop-file__textarea': true,
                      'drop-file__textarea_paranoid': isParanoiaOn
                    }"
                    placeholder="Divide et Impera"
                    name="message"
                  >
                  </textarea>
            <File
              maxSize="250 KB"
              @file-added="onFileAdd"
              @file-error="onFileError"
            >
            </File>

          </div>
        </div>
      </div>
      <div class="main__files">
        <div
          v-for="file in files"
          class="main__file file-load"
        >
          <span
            class="file-load__type-icon"
          >
            {{ file.ext }}
          </span>
          <span
            class="file-load__title"
          >
            {{ file.name }}
          </span>
          <button
            @click="removeFile(file.id)"
            type="button"
            class="file-load__del"
          >
            Delete
          </button>
        </div>
        <div
          v-for="file in errorFiles"
          class="file-load__load file-load__load--error"
        >
          <div class="file-load__load-left">
            <p class="file-load__load-title">
              {{ file.name }}
            </p>
            <p class="file-load__error">
              Error: {{ file.error }}
            </p>
          </div>
        </div>
      </div>
      <div
        v-if="!isParanoiaOn"
        class="main__expires expires"
      >
        <div class="expires__row">
          <div class="expires__select-wrap expires__select-wrap--hours">
            <div class="expires__title web-textlabel-18">Data Expires After</div>
            <multiselect
              id="expires-hours" class="expires__select select" name="expires_at" placeholder="Select one"
              v-model="minutesLimit"
              label="name"
              :searchable="false"
              :allow-empty="false"
              :close-on-select="true"
              :show-labels="false"
              :options="limits.minutesLimit">
            </multiselect>
          </div>
          <div class="expires__select-wrap expires__select-wrap--limits">
            <div class="expires__title web-textlabel-18">Number of Attempts</div>
            <multiselect
              id="expires-limits" class="expires__select select" name="limit" placeholder="Select one"
              v-model="queriesLimit"
              label="name"
              :searchable="false"
              :allow-empty="false"
              :close-on-select="true"
              :show-labels="false"
              :options="limits.queriesLimit">
            </multiselect>
          </div>
        </div>
      </div>
      <div class="main__password">
        <p class="main__password-text web-18" v-if="!customPassword">
          The password for access will be generated randomly,
          but you can
          <button
            :class="{
              'main__link': true,
              'main__link_btn': true,
              'main__link_btn_paranoid': isParanoiaOn,
              'js-show-password-link': true,
              'web-18': true
            }"
            @click.prevent="setPassword">create your own</button>.
        </p>
        <div class="main__password-wrap" v-if="customPassword">
          <label for="passphrase" class="main__password-title subtitle web-textlabel-18">Password</label>
          <input autofocus ref="password" v-model="password" type="password" class="main__password-input" :class="{
                      'main__password-input_paranoid': isParanoiaOn
                    }" id="passphrase" name="passphrase"
                 placeholder="Hoc Voluerunt" autocomplete="new-password">
          <p class="main__password-note">
            You can leave this field empty and the password will be generated
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
        Create Private Encryption
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
          to="/decrypt"
          :class="{
            'main__link': true,
            'main__link_crypt': true,
            'main__link_crypt_paranoid': isParanoiaOn,
        }">
          Decrypt
        </router-link>
      </div>
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
  import { mapState } from 'vuex'

  export default {
    props: ['formSubmitted'],
    data: () => ({
      'secretMessage': '',
      'minutesLimit': {
        'name': '10 minutes',
        'value': 10,
      },
      'queriesLimit': {
        'name': 'No limit',
        'value': 0,
      },
      'password': '',
      'files': {},
      'errorFiles': {},
      'customPassword': false,
    }),
    computed: {
      isParanoiaOn () {
        return this.$store.state.privateMode
      },
      hasFiles () {
        return Object.keys(this.files).length || Object.keys(this.errorFiles).length
      },
      ...mapState({
        limits: state => state.limits
      })
    },
    methods: {
      setPassword (e) {
        this.customPassword = true
      },
      onFileChange: function (e) {
        let files = e.target.files || e.dataTransfer.files
        this.handleFile(files)
        e.target.value = ''
      },
      reset () {
        Object.assign(this.$data, this.$options.data.call(this))
      },
      onFormSubmit: function (e) {
        let postData = {
          'secretMessage': this.$data['secretMessage'],
          'password': this.$data['password'] || generatePassword(),
          'files': this.$data['files'],
          'minutesLimit': this.$data['minutesLimit'],
          'queriesLimit': this.$data['queriesLimit'],
        }
        this.postMessage(postData)
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
    components: {
      File,
      Multiselect,
    }
  }
</script>
