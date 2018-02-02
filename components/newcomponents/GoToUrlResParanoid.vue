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
      :class="{
        'encrypt-result__textarea': true,
        'textarea': true,
        'textarea_paranoid': isParanoiaOn
      }"
      title="Message"
    >
      {{$store.state.message.secretMessage}}
    </textarea>
    <div class="get-pass__files-list">
      <div
        v-if="Object.keys($store.state.message.files).length > 0"
        v-for="file in $store.state.message.files"
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
          class="main__btn main__btn_mrl btn btn_paranoid"
        >
          Copy text
        </button>
        <button
          v-if="Object.keys($store.state.message.files).length > 0"
          class="main__btn btn btn_paranoid"
          @click.prevent="downloadAll"
        >
          Download all files
        </button>
      </div>
      <nuxt-link
        to="/newdesign"
        class="main__link main__link_crypt main__link_crypt_grey"
      >
        Create New Encryption
      </nuxt-link>
    </div>
  </div>
</template>

<script>
  import FileSaver from 'file-saver'
  const dataURItoBlob = function (dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    let byteString = atob(dataURI.split(',')[1])

    // separate out the mime component
    let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

    // write the bytes of the string to an ArrayBuffer
    let ab = new ArrayBuffer(byteString.length)

    // create a view into the buffer
    let ia = new Uint8Array(ab)

    // set the bytes of the buffer to the correct values
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i)
    }
    // write the ArrayBuffer to a blob, and you're done
    return new Blob([ab], {type: mimeString})
  }

  export default {
    computed: {
      isParanoiaOn () {
        return this.$store.state.privateMode
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
        console.log(id)
        let file = this.$store.state.message.files[id]
        FileSaver.saveAs(dataURItoBlob(file.body), file.name)
      },
      downloadAll () {
        Object.keys(this.$store.state.message.files).forEach(id => this.downloadFile(id))
      },
    },
  }
</script>
