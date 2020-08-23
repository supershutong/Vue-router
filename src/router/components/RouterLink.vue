<template>
  <a @click="jump">
    <slot />
  </a>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      required: true
    }
  },
  methods: {
    jump() {
      const router = this._routerRoot._router
      router.push(this.to)
    }
  }
}
</script>

<style scoped>
a {
  color: blue;
  padding: 10px;
  text-decoration: underline;
}
</style>
