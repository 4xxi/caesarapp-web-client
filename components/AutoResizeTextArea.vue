<template>
  <textarea :readonly="!!readonly ">{{value}}</textarea>
</template>
<script>
  import autosize from 'autosize'

  export default {
    props: ['value', 'readonly'],
    mounted () {
      autosize(this.$el)
    },
    methods: {
      copy () {
        this.$el.select()
        document.execCommand('copy')
      },
    },
  }
</script>
