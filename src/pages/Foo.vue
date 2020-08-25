<template>
  <div>Foo</div>
</template>

<script>
export default {
  beforeRouteEnter(to, from, next) {
    console.log("foo.beforeRouteEnter", to, from)
    next()
  },
  beforeRouteResolve(to, from, next) {
    console.log("foo.beforeRouteResolve", to, from)
    next()
  },
  beforeRouteLeave(to, from, next) {
    console.log("foo.beforeRouteLeave", to, from)
    next()
  }
}
</script>
