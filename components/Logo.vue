<template>
  <nuxt-link to="/" class="logo__link">
    <div
      class="header__logo logo"
      v-bind:class="{ 'logo_paranoid': this.paranoid }">

      <img v-if="!this.paranoid" class="logo__icon"
           alt="logo" src="~/assets/img/logo.svg">
      <img v-else class="logo__icon"
           alt="logo" src="~/assets/img/logo-paranoid.svg">
      <div class="logo__desc">
        <div class="logo__header">Caesar App</div>
        <div class="logo__slogan">Veni, Vidi, Encrypted</div>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
  export default {
    props: ['paranoid']
  }
</script>
