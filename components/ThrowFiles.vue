<template>
  <div class="page__wrapper page__wrapper_modal aux_throw-pilums">
    <img src="~/assets/img/hand.svg" alt="hand with pilum" class="aux__icon">
    <div class="aux__desc aux__desc_blue">Throw pilums!</div>
  </div>
</template>
<script>
  // @dragover="$store.commit('throwFiles', true)" @dragleave="$store.commit('throwFiles', false)"
  export default {
    created () {
      if (!this.$isServer) {
        // let _this = this
        let counter = 0
        document.addEventListener('dragenter', function dragEnter (e) {
          if (e.target === document && !counter) {
            console.log('dragEnter')
          }
          counter++
        }, false)
        document.addEventListener('dragleave', function dragLeave (e) {
          counter--
          if (e.target === document && !counter) {
            console.log('dragleave')
          }
        }, false)
      }
    },
  }
</script>
