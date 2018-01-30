<template>
  <main class="page page_pattern">
    <div class="page__wrapper">
      <div class="container">
        <div class="container__inner">
          <header>
            <div class="header page__header">
              <Logo></Logo>
              <ModeTrigger></ModeTrigger>
            </div>
          </header>
          <main>
            <div class="main page__main">
              <div class="main_wrapper">
                <DecryptForm>
                </DecryptForm>
              </div>
            </div>
          </main>
        </div>
        <footer>
          <PageFooter></PageFooter>
        </footer>
      </div>
    </div>
  </main>
</template>

<script>
  import Logo from '~/components/newcomponents/Logo.vue'
  import ModeTrigger from '~/components/newcomponents/ModeTrigger.vue'
  import DecryptForm from '~/components/newcomponents/DecryptForm.vue'
  import PageFooter from '~/components/newcomponents/PageFooter.vue'

  export default {
    components: {
      Logo,
      ModeTrigger,
      DecryptForm,
      PageFooter
    },
    validate ({params}) {
      // Must be a number
      return /^\w{32}$/.test(params.id)
    },
    created () {
      this.$store.dispatch('readMessage', this.$route.params.id)
    }
  }
</script>

<style>
</style>
