<template>
  <div class="get-pass">
    <div
      for="message"
      class="get-pass__title web-textlabel-18"
    >
      It's your secret
    </div>
    <textarea
      ref="message"
      v-model="$store.state.message.secretMessage"
      :class="{
        'encrypt-result__textarea': true,
        'textarea': true,
        'textarea_no-files': !hasFiles,
        'textarea_paranoid': isParanoiaOn
      }"
      title="Message"
    ></textarea>
    <div class="get-pass__files-list">
      <div
        v-if="Object.keys($store.state.message.files).length > 0"
        v-for="file in $store.state.message.files"
        v-bind:key="file.id"
      >
        <a
          @click.prevent="downloadFile(file.id)"
          :href="file.body"
          :download="file.name"
          :class="{
            'get-pass__file': true,
            'file': true,
            'file_paranoid': isParanoiaOn
          }"
        >
          <div class="file__inner">
            <span class="file__type-icon">{{file.ext}}</span>
            <span class="file__type-name">{{file.name}}</span>
          </div>
          <div
            :class="{
              'get-pass__link': true,
              'web-14': true,
              'get-pass__link_paranoid': isParanoiaOn,
            }"
          >
            Download
          </div>
        </a>
      </div>
    </div>
    <div class="main__inner">
      <div>
        <button
          @click.prevent="copy('message', $event)"
          :class="{
            'main__btn': true,
            'main__btn_mrl': true,
            'btn': true,
            'btn_paranoid': isParanoiaOn
          }"
        >
          Copy text
        </button>
        <button
          v-if="hasFiles"
          :class="{
            'main__btn': true,
            'btn': true,
            'btn_paranoid': isParanoiaOn
          }"
          @click.prevent="downloadAll"
        >
          Download all files
        </button>
      </div>
      <nuxt-link
        to="/"
        class="main__link main__link_crypt main__link_crypt_grey"
      >
        Create New Encryption
      </nuxt-link>
    </div>
  </div>
</template>

<script>
  import FileSaver from 'file-saver'
  import JSZip from 'jszip'
  import {dataURItoBlob} from '../utils'

  export default {
    computed: {
      isParanoiaOn () {
        return this.$store.state.privateMode
      },
      hasFiles () {
        return Object.keys(this.$store.state.message.files).length > 0
      }
    },
    methods: {
      copy (ref, event) {
        this.$refs[ref].select()
        document.execCommand('copy')
        event.target.classList.add('btn__green')
        event.target.innerText = 'Copied'
      },
      downloadFile (id) {
        return new Promise((resolve, reject) => {
          try {
            let file = this.$store.state.message.files[id]
            resolve(FileSaver.saveAs(dataURItoBlob(file.body), file.name))
          } catch (error) {
            reject(error)
          }
        })
      },
      downloadAll () {
        let zip = new JSZip()
        zip.file('message.txt', this.$store.state.message.secretMessage)
        Object.keys(this.$store.getters.files).forEach((id) => {
          let file = this.$store.getters.files[id]
          zip.file(file.name, file.body.split('base64,')[1], {base64: true})
        })
        zip.generateAsync({type: 'blob'}).then(c => FileSaver.saveAs(c, 'secret-message_' + Date.now() + '.zip'))
      },
    },
  }
</script>
