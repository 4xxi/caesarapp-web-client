<template>
  <nuxt-link to="/newdesign" class="logo__link">
    <div class="header__logo logo" v-bind:class="{ 'logo_paranoid': $store.state.privateMode }">

      <img v-if="!$store.state.privateMode" class="logo__icon"
           alt="logo" src="~/assets/img/logo.svg">
      <img v-else class="logo__icon"
           alt="logo" src="~/assets/img/logo-paranoid.svg">

      <div class="logo__desc">
        <div class="logo__header">Ave Caesar!</div>
      </div>
    </div>
  </nuxt-link>
</template>
