<template>
  <div class="get-pass">
    <div for="text" class="get-pass__title web-textlabel-18">It's your secret</div>
    <div class="textarea">Control is an illusuion</div>
    <div class="get-pass__files-list">
      <a href="#" class="get-pass__file file">
        <div class="file__inner">
          <span class="file__type-icon">JPG</span>
          <span class="file__type-name">Caesar’sMother</span>
        </div>
        <div class="get-pass__link web-14">Download</div>
      </a>
      <a href="#" class="get-pass__file file">
        <div class="file__inner">
          <span class="file__type-icon">DOC</span>
          <span class="file__type-name">Letter to the traitor Brutus</span>
        </div>
        <div class="get-pass__link web-14">Download</div>
      </a>
      <a href="#" class="get-pass__file file">
        <div class="file__inner">
          <span class="file__type-icon">html</span>
          <span class="file__type-name">Leave me here</span>
        </div>
        <div class="get-pass__link web-14">Download</div>
      </a>
    </div>
    <div class="main__inner">
      <div>
        <button @click.prevent="copy" class="main__btn main__btn_mrl btn">Copy text</button>
        <button class="main__btn btn">
          Download all files
        </button>
      </div>
      <a href="#" class="main__link main__link_crypt main__link_crypt_grey">Create New Encryption</a>
    </div>
  </div>
</template>
