export default class HistoryBase {
  constructor({ routerTable }) {
    this.routerTable = routerTable
  }
  listen(cb) {
    this.cb = cb
  }
  transitionTo(target) {
    const route = this.routerTable.match(target)
    // console.log(route)
    this.current = route
    this.cb(this.current)
  }
}
