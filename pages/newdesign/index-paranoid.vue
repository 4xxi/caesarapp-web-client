<template>
  <main class="page page_pattern page_pattern_paranoid">
    <div class="page__wrapper page__wrapper_paranoid">
      <div class="container">
        <div class="container__inner">
          <header>
            <div class="header page__header">
              <LogoParanoid></LogoParanoid>
              <ModeTriggerParanoid></ModeTriggerParanoid>
            </div>
          </header>
          <main>
            <div class="main page__main">
              <div class="main_wrapper">
                <!--<DecryptForm @form-submitted="onFormSubmit"></DecryptForm>-->
                <EncryptFormParanoid @form-submitted="onFormSubmit"></EncryptFormParanoid>
                <!--<EncryptResult></EncryptResult>-->
                <!--<GoToUrl @form-submitted="onFormSubmit"></GoToUrl>-->
                <!--<GoToUrlRes></GoToUrlRes>-->
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
   import LogoParanoid from '~/components/newcomponents/LogoParanoid.vue'
   import LogoBig from '~/components/LogoBig.vue'
   import ModeTriggerParanoid from '~/components/newcomponents/ModeTriggerParanoid.vue'
   import EncryptFormParanoid from '~/components/newcomponents/EncryptFormParanoid.vue'
   import EncryptResult from '~/components/EncryptResult.vue'
   import DecryptForm from '~/components/DecryptForm.vue'
   import EnterPasswordForm from '~/components/EnterPasswordForm.vue'
   import GoToUrlRes from '~/components/newcomponents/GoToUrlRes.vue'
   import PageFooter from '~/components/PageFooter.vue'

   import sjcl from 'sjcl'

   export default {
     components: {
       LogoParanoid,
       LogoBig,
       ModeTriggerParanoid,
       EncryptFormParanoid,
       EncryptResult,
       DecryptForm,
       EnterPasswordForm,
       GoToUrlRes,
       PageFooter
     },
     data () {
       return {
         progress: false,
         showMessage: false,
         modalMessage: {
           link: 'https://4xxi.com',
           password: '',
         },
       }
     },
     head: {
       title: 'VENI, VIDI, ENCRYPTED',
       meta: [
         {charset: 'utf-8'},
         {name: 'viewport', content: 'width=device-width, initial-scale=1'},
       ],
       script: [
         {src: '/assets/custom.js'},
       ],
     },
     methods: {
       onFormSubmit (data) {
         this.progress = true
         this.showMessage = true
         let encryptedMessage = sjcl.encrypt(data['password'], JSON.stringify({
           'secretMessage': data['secretMessage'],
           'files': data['files'],
         })).toString()
         console.log(encryptedMessage)
       },
       showModalMessage (id, password) {
         let props = this.$router.resolve({
           name: 'messages-id',
           params: {id: id},
         })
         this.modalMessage = {
           link: window.location.origin + props.href,
           password: password,
         }
         this.showMessage = true
       },
       close () {
         this.showMessage = false
       },
       closeAndRefresh () {
         this.showMessage = false
       },
     },
   }
</script>

<style>
</style>
