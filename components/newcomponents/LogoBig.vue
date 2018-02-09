<template>
  <nuxt-link to="/" class="logo__link">
    <div
      :class="{
        'header__logo': true,
        'logo': true,
        'logo_big': true,
        'logo_paranoid': isParanoiaOn
      }"
    >
      <img
        v-if="isParanoiaOn"
        class="logo__icon"
        src="~assets/img/logo-big-paranoid.svg"
        alt="logo"
      >
      <img
        v-else
        class="logo__icon"
        src="~assets/img/logo-big.svg"
        alt="logo"
      >
      <div class="logo__desc">
        <div class="logo__header">Ave Caesar</div>
      </div>
    </div>
  </nuxt-link>
</template>

<script>
  export default {
    computed: {
      isParanoiaOn () {
        return this.$store.state.privateMode
      }
    }
  }
</script>
