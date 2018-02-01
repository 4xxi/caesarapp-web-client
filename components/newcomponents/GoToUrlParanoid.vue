<template>
  <div>
    <form @submit.prevent="onFormSubmit" action="#" method="POST" class="main__form">
      <div class="main__drop-file drop-file">
        <div class="drop-file__wrap">
          <label for="text" class="drop-file__title subtitle web-textlabel-18 ">Text or Image to Encrypt and Expire</label>
          <div class="drop-file__row">
                  <textarea required v-model="secretMessage" id="text" cols="30" rows="4" class="textarea drop-file__textarea drop-file__textarea_decrypt"
                            placeholder="Paste text here"
                            name="message"></textarea>

          </div>
        </div>
      </div>
      <div class="main__password main__password_decrypt">
        <div class="main__password-wrap">
          <label for="passphrase" class="main__password-title subtitle web-textlabel-18">Type Password</label>
          <input v-model="password" type="password" class="main__password-input" id="passphrase" name="passphrase"
                 placeholder="Hoc Voluerunt">
          <p class="main__password-note">
            You should have been given this password with the link to this text
          </p>
        </div>
      </div>
      <button type="submit" class="main__btn btn btn_paranoid">Display Message</button>
      <a href="#" class="main__link main__link_crypt main__link_crypt_grey">or Encrypt</a>
    </form>
  </div>
</template>

<script>
</script>
