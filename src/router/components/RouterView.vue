<script>
export default {
  name: "RouterView",
  render() {
    const route = this._routerRoot._route
    if (!route) return
    const { component } = route
    return <component />
  }
}
</script>
