<template>
  <div class="d-flex flex-column" style="margin-bottom: 20px;">
    <div class="mx-auto" ref="telegram"></div>
  </div>
</template>

<script>
export default {
  name: "TelegramAuth",
  props: {
    mode: {
      type: String,
      required: true,
      validator(v) { return ['callback', 'redirect'].includes(v); }
    },
    telegramLogin: {
      type: String,
      required: true,
      validator(v) { return v.endsWith('bot') || v.endsWith('Bot'); }
    },
    redirectUrl: {
      type: String,
      default: ''
    },
    requestAccess: {
      type: String,
      default: 'read',
      validator(v) { return ['read', 'write'].includes(v); }
    },
    size: {
      type: String,
      default: 'large',
      validator(v) { return ['small', 'medium', 'large'].includes(v); }
    },
    userpic: {
      type: Boolean,
      default: true
    },
    radius: {
      type: String
    }
  },
  methods: {
    onTelegramAuth(user) {
      this.$emit('callback', user);
    }
  },
  mounted() {
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://telegram.org/js/telegram-widget.js?19';
    script.setAttribute('data-size', this.size);
    script.setAttribute('data-userpic', this.userpic);
    script.setAttribute('data-telegram-login', this.telegramLogin);
    script.setAttribute('data-request-access', this.requestAccess);
    if (this.radius) { script.setAttribute('data-radius', this.radius); }
    if (this.mode === 'callback') {
      window.onTelegramAuth = this.onTelegramAuth;
      script.setAttribute('data-onauth', 'window.onTelegramAuth(user)');
    } else {
      script.setAttribute('data-auth-url', this.redirectUrl);
    }
    this.$refs.telegram.appendChild(script);
  }

}
</script>
