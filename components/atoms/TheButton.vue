<template>
  <button
    class="button"
    :data-type="type"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot/>
  </button>
</template>

<script>
  export default {
    props: {
      disabled: {
        type: Boolean,
        default: false,
      },
      type: {
        type: String,
        default: 'default',
      },
    },
  }
</script>

<style lang="scss" scoped>
  /* スタイルをここに入れてく */
  button{
    &[data-type="default"] {
      background-color: #47494e;
    }
    &[data-type="login"] {
      background-color: #ff4500;
    }
  }
</style>
