<template>
  <div class="header__mode-trigger mode-trigger">
    <div
      :class="{
        'mode-trigger__cond': true,
        'mode-trigger__cond_paranoid': paranoiaMode
      }"
    >
      Paranoia Mode:
      <span
        class="mode-trigger__cond_js"
      >
        {{ paranoiaMode ? 'ON' : 'OFF' }}
      </span>
    </div>
    <div
      @click="$store.commit('TOGGLE_MODE')"
      class="mode-trigger__trigger trigger"
    >
      <div
        :class="{
          'trigger__thumb': true,
          'trigger__thumb_paranoid': paranoiaMode
        }"
      >
        <div class="trigger__stripe trigger__stripe_left"></div>
        <div class="trigger__stripe trigger__stripe_right"></div>
      </div>
    </div>
    <div
      v-if="!this.disabled"
      :class="{
        'mode-trigger__desc': true,
        'mode-trigger__desc_paranoid': paranoiaMode
      }"
    >
      {{modeTriggerText}}
      <img
        v-if="!paranoiaMode"
        src="~assets/img/arrow.svg"
        alt="arrow"
        class="mode-trigger__arrow"
      >
      <img
        v-if="paranoiaMode"
        src="~assets/img/arrowparanoid.svg"
        alt="arrow"
        class="mode-trigger__arrow"
      >
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      disabled: Boolean,
      paranoiaMode: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        text: {
          normalModeText: 'Switch it if you don\'t want to use a server',
          paranoiaModeText: 'In this mode, the data is stored \n' +
          'in your browser'
        }
      }
    },
    computed: {
      modeTriggerText () {
        return this.paranoiaMode ? this.text.paranoiaModeText : this.text.normalModeText
      }
    }
  }
</script>
