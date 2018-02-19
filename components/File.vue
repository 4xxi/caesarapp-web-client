<template>
  <div
    :class="{ 'drop-file__file--active': isActive}"
    class="drop-file__file"
    @dragleave="onDragleave"
    @dragenter="onDragenter"
    @drop="onDrop"
  >
    <input
      multiple
      @change="onFileChange"
      type="file"
      class="drop-file__file-input"
    >
    <p
      :class="{
        'drop-file__label': true,
        'drop-file__label_paranoid': isParanoiaOn
      }"
    >
      <svg
        :class="{
          'drop-file__icon': true,
          'drop-file__icon_paranoid': isParanoiaOn
        }"
        width="27"
        height="20">
        <use xlink:href="#icon-upload"></use>
      </svg>
      Drop Files or <span class="drop-file__label-link">Browse</span></p>
  </div>
</template>
<script>
  import Vue from 'vue'
  import filesizeParser from 'filesize-parser'

  export default {
    props: ['max-size'],
    data () {
      return {
        isActive: false,
      }
    },
    created () {
      this.maxSizeInBtyes = filesizeParser(this.maxSize)
    },
    computed: {
      isParanoiaOn () {
        return this.$store.state.privateMode
      }
    },
    methods: {
      onDragenter (e) {
        this.$data['isActive'] = true
      },
      onDragleave (e) {
        this.$data['isActive'] = false
      },
      onDrop (e) {
        this.$data['isActive'] = false
        let files = e.target.files || e.dataTransfer.files
        console.log(files)
      },
      onFileChange (e) {
        let files = e.target.files || e.dataTransfer.files
        this.handleFile(files)
        e.target.value = ''
      },
      handleFile (files) {
        for (let i = 0, f; (f = files[i]); i++) {
          if (f.size >= this.maxSizeInBtyes) {
            this.makeErrorFile(f)
          } else {
            this.readFile(f)
          }
        }
      },
      makeErrorFile (file) {
        file.error = 'Size limit ' + this.maxSize
        this.$emit('file-error', file)
      },
      readFile (file) {
        let userFile = {
          id: new Date().getTime(),
          ext: file.name.split('.').pop(),
          name: file.name,
          body: '',
        }

        let reader = new FileReader()
        let that = this
        reader.onload = function (readerEvt) {
          userFile['body'] = readerEvt.target.result
          that.$emit('file-added', userFile)
        }
        reader.readAsDataURL(file)
      },
      removeFile (id) {
        Vue.delete(this.files, id)
      },
    },
  }
</script>
