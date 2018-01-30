<template>
  <div class="encrypt-result">
    <div class="encrypt-result__title web-textlabel-18">
      Use the temporary encrypted link below to retrieve the secret
    </div>
    <div class="encrypt-result__textarea textarea">
      <div class="textarea__header">Follow the link and enter the password</div>
      <div class="textarea__delimiter">- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</div>
      <div class="textarea__body">
        <div class="textarea__url">URL: https://vault.4xxi.com/view/7220b4f66f306f00a3cb1cb14f665908</div>
        <div class="textarea__password">Password: FSociety</div>
      </div>
      <div class="textarea__delimiter">- - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</div>
      <div class="textarea__footer">Securely created with https://vault.4xxi.com</div>
    </div>
    <div class="main__inner">
      <div>
        <button @click.prevent="copy" class="main__btn main__btn main__btn_mb btn btn_paranoid">Copy Encrypted Text</button>
      </div>
      <a href="#" class="main__link main__link_crypt main__link_crypt_grey">
        Create New Encryption
      </a>
    </div>
    <div class="prompt">
      <div class="prompt__desc">
        Don’t forget to copy
        url and password
        <img src="~/assets/img/arrow-white.svg" alt="" class="prompt__arrow prompt__arrow"></div>
    </div>
    <div class="encrypt-result__textarea textarea textarea_copied textarea_mt">
      eyJpdiI6IlBFNUFFOWFHQ1MyMzdMOWMxem5IckEiLCJzYWx0IjoiWTF1aDhKeWErMmciLCJjdCI6InNTeFM3VDJFYnI0S2wvd1FWZVphMEEifQ==eyJpdiI6IlBFNUFFOWFHQ1MyMzdMOWMxem5IckEiLCJzYWx0IjoiWTF1aDhKeWErMmciLCJjdCI6InNTeFM3VDJFYnI0S2wvd1FWZVphMEEifQ==eyJpdiI6IlBFNUFFOWFHQ1MyMzdMOWMxem5IckEiLCJzYWx0IjoiWTF1aDhKeWErMmciLCJjdCI6InNTeFM3VDJFYnI0S2wvd1FWZVphMEEifQ==eyJpdiI6IlBFNUFFOWFHQ1MyMzdMOWMxem5IckEiLCJzYWx0IjoiWTF1aDhKeWErMmciLCJjdCI6InNTeFM3VDJFYnI0S2wvd1FWZVphMEEifQ==eyJpdiI6IlBFNUFFOWFHQ1MyMzdMOWMxem5IckEiLCJzYWx0IjoiWTF1aDhKeWErMmciLCJjdCI6InNTeFM3VDJFYnI0S2wvd1FWZVphMEEifQ==eyJpdiI6IlBFNUFFOWFHQ1MyMzdMOWMxem5IckEiLCJzYWx0IjoiWTF1aDhKeWErMmciLCJjdCI6InNTeFM3VDJFYnI0S2wvd1FWZVphMEEifQ==eyJpdiI6IlBFNUFFOWFHQ1MyMzdMOWMxem5IckEiLCJzYWx0IjoiWTF1aDhKeWErMmciLCJjdCI6InNTeFM3VDJFYnI0S2wvd1FWZVphMEEifQ==eyJpdiI6IlBFNUFFOWFHQ1MyMzdMOWMxem5IckEiLCJzYWx0IjoiWTF1aDhKeWErMmciLCJjdCI6InNTeFM3VDJFYnI0S2wvd1FWZVphMEEifQ==
    </div>
    <div class="main__inner">
      <div>
        <button @click.prevent="copy" class="main__btn main__btn btn btn__green">
          <img src="~/assets/img/icon-check.svg" alt="check"> Copied</button>
      </div>
    </div>
  </div>
</template>
