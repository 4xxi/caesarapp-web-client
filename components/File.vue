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
  import filesizeParser from 'filesize-parser'
  import worker from 'workerize-loader!../utils/worker'

  let instance
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
    mounted () {
      instance = worker()
    },
    computed: {
      isParanoiaOn () {
        return this.$store.state.privateMode
      },
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
        this.handleFile(files)
      },
      onFileChange (e) {
        let files = e.target.files || e.dataTransfer.files
        this.handleFile(files)
        e.target.value = ''
      },
      handleFile (files) {
        let filesKeys = Object.keys(files)
        filesKeys.filter(k => files[k].size <= this.maxSizeInBtyes).map(k => this.readFile(files[k]))
        filesKeys.filter(k => files[k].size > this.maxSizeInBtyes).map(k => this.makeErrorFile(files[k]))
      },
      makeErrorFile (file) {
        file.error = 'Size limit ' + this.maxSize
        this.$emit('file-error', file)
      },
      readFile: function (file) {
        instance.readFile(file).then(userFile => this.$emit('file-added', userFile))
      }
    },
  }
</script>
