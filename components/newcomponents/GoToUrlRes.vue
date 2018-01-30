<template>
  <div class="get-pass">
    <div for="text" class="get-pass__title web-textlabel-18">It's your secret</div>
    <div class="textarea">Control is an illusuion</div>
    <div class="main__inner">
      <div>
        <button @click.prevent="copy" class="main__btn main__btn_mrl btn">Copy text</button>
      </div>
      <a href="#" class="main__link main__link_crypt main__link_crypt_grey">Create New Encryption</a>
    </div>
  </div>
</template>
