<template>
  <div class="header__mode-trigger mode-trigger">
    <div class="mode-trigger__cond" v-bind:class="{ 'mode-trigger__cond_paranoid': $store.state.privateMode }">Paranoia
      Mode: <span class="mode-trigger__cond_js">{{ $store.state.privateMode ? 'ON' : 'OFF' }}</span>
    </div>
    <div @click="$store.commit('TOGGLE_MODE')" class="mode-trigger__trigger trigger">
      <div class="trigger__thumb" v-bind:class="{ 'trigger__thumb_paranoid': $store.state.privateMode }">
        <div class="trigger__stripe trigger__stripe_left"></div>
        <div class="trigger__stripe trigger__stripe_right"></div>
      </div>
    </div>
    <div v-if="!this.disabled" class="mode-trigger__desc">
      Switch it if you don't want to use a server
      <img src="~assets/img/arrow.svg" alt="arrow" class="mode-trigger__arrow">
    </div>
  </div>
</template>
<script>
  export default {
    props: ['disabled'],
  }
</script>
