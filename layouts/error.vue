<template>
  <main class="page page_aux page_pattern">
    <div v-if="error.statusCode === 404" class="aux">
      <div class="aux__side aux__left">
        <div class="aux__logo">Caesar App</div>
      </div>
      <div class="aux__side aux__center">
        <div class="aux__block">
          <img src="~/assets/img/logo-dead.svg" alt="logo" class="aux__icon">
          <div class="aux__desc">There's nothing here, Brutus.</div>
          <nuxt-link to="/" class="aux__link">Go home!</nuxt-link>
        </div>
      </div>
      <div class="aux__side aux__right">
        <div class="aux__type">{{error.statusCode}}</div>
      </div>
      <div class="aux-block">
      </div>
    </div>
    <div v-if="error.statusCode === 502" class="aux">
      <div class="aux__side aux__left">
        <div class="aux__logo">Caesar App</div>
      </div>
      <div class="aux__side aux__center">
        <div class="aux__block">
          <img src="~/assets/img/logo-dead.svg" alt="logo" class="aux__icon">
          <div class="aux__desc">Hey, Brutus! It seems that we have some problems. Come back later.</div>
        </div>
      </div>
      <div class="aux__side aux__right">
        <div class="aux__type">{{error.statusCode}}</div>
      </div>
      <div class="aux-block">
      </div>
    </div>
  </main>
</template>

<script>
  export default {
    props: ['error']
  }
</script>
