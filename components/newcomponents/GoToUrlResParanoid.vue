<template>
  <div class="get-pass">
    <div for="message" class="get-pass__title web-textlabel-18">It's your secret</div>
    <textarea disabled cols="10" ref="message" class="encrypt-result__textarea textarea" title="Message">{{$store.state.message.secretMessage}}</textarea>
    <div class="get-pass__files-list">
      <div v-if="Object.keys($store.state.message.files).length > 0" v-for="file in $store.state.message.files">
        <a href="#" @click.prevent="downloadFile(file.id)" v-bind:href="file.body" v-bind:download="file.name" class="get-pass__file file">
          <div class="file__inner">
            <span class="file__type-icon">{{file.ext}}</span>
            <span class="file__type-name">{{file.name}}</span>
          </div>
          <div class="get-pass__link web-14">Download</div>
        </a>
      </div>
    </div>
    <div class="main__inner">
      <div>
        <button @click.prevent="copy('message', $event)" class="main__btn main__btn_mrl btn btn_paranoid">Copy text</button>
        <button v-if="Object.keys($store.state.message.files).length > 0" class="main__btn btn btn_paranoid">
          Download all files
        </button>
      </div>
      <a href="/" class="main__link main__link_crypt main__link_crypt_grey">Create New Encryption</a>
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
    methods: {
      copy (ref, event) {
        this.$refs[ref].select()
        document.execCommand('copy')
        event.target.classList.add('btn__green')
        event.target.innerText = 'Copied'
      },
      downloadFile (id) {
        let file = this.message.files[id]
        FileSaver.saveAs(dataURItoBlob(file.body), file.name)
      },
      downloadAll () {
        Object.keys(this.message.files).forEach(id => this.downloadFile(id))
      },
    },
  }
</script>
