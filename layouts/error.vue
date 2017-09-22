<template>
  <main class="page-wrapper page-wrapper--center container">
    <section class="error">
      <svg class="error__icon" width="115" height="120">
        <use xlink:href="#icon-caesar-head-dead"></use>
      </svg>
      <p class="error__text">
        There's nothing here, Brutus.<br>
        <nuxt-link class="error__link" to="/">Go home!</nuxt-link>
      </p>
    </section>
  </main>
</template>

<style>
  #__nuxt {
    width: 100%;
    max-width: 1030px;
    padding-right: 25px;
    padding-left: 25px;
    margin: 0 auto;
  }
</style>
<script>
  export default {
    props: ['error'],
    head: {
      bodyAttrs: {
        'class': 'page page--blue',
      },
      title: 'Et tu, 404?'
    },
  }
</script>
