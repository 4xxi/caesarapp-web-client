<template>
  <div>
    <div v-bind:class="{ 'overlay-show': isActive}" class="overlay overlay--blue"></div>
    <div v-bind:class="{ 'container message-open': isActive}" class="message container">
      <div class="message__head head head--white">
        <svg class="head__icon" width="80" height="84">
          <use xlink:href="#icon-caesar-head"></use>
        </svg>
        <p class="head__title">
          <span class="head__upper-text">Ave Caesar!</span> Here is your secret text
        </p>
      </div>
      <div class="message__body get-pass">
        <input readonly ref="message" class="get-pass__title" v-bind:value="message.secretMessage" title="Shared text"/>
        <div v-for="file in message.files" class="get-pass__files-list">
          <a @click.prevent="downloadFile(file.id)" v-bind:href="file.body" v-bind:download="file.name"
             class="get-pass__file file">
            <span class="file__type-icon">{{file.ext}}</span>
            <span class="file__type-name">{{file.name}}</span>
            <svg class="file__download-icon" width='17' height='20'>
              <use xlink:href="#icon-download"></use>
            </svg>
          </a>
        </div>
        <div class="get-pass__actions actions">
          <div class="actions__left">
            <button @click.prevent="copy" class="actions__btn btn">Copy text</button>
            <button v-if="hasFiles" @click.prevent="downloadAll" class="actions__btn btn">
              <svg class="btn__icon" width="11" height="15">
                <use xlink:href="#icon-arrow-down"></use>
              </svg>
              Download all files
            </button>
          </div>
          <div class="actions__right">
            <a @click.prevent="close" href="#" class="actions__link">Close and go to vault.4xxi.com</a>
          </div>
        </div>
      </div>
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
    props: ['is-active', 'message'],
    data () {
      return {
        'hasFiles': Object.keys(this.message.files).length,
      }
    },
    methods: {
      copy () {
        this.$refs['message'].select()
        document.execCommand('copy')
      },
      close () {
        this.$emit('modal-close')
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
