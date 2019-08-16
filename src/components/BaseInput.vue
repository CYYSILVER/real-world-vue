<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <input :value="value" v-on="listeners" v-bind="$attrs" />
  </div>
</template>

<script>
import formFieldMixin from '@/mixins/formFieldMixin'
export default {
  mixins: [formFieldMixin],
  inheritAttrs: false,
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue
      }
    }
  },
  created() {
    // console.log(this.$attrs)
    // console.log(this.$listeners)
  }
}
</script>

<style></style>
