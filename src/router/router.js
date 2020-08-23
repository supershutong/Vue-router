import Vue from "vue"
import RouterView from "./components/RouterView"
import RouterLink from "./components/RouterLink"

Vue.component("RouterView", RouterView)
Vue.component("RouterLink", RouterLink)

class RouterTable {
  constructor(routes) {
    this._pathMap = new Map()
    this.init(routes)
  }

  init(routes) {
    const addRoute = route => {
      this._pathMap.set(route.path, route)
      // children递归省略
      // if (route.children) {
      //   route.children.forEach(child => addRoute(child))
      // }
    }
    routes.forEach(route => addRoute(route))
  }

  match(path) {
    let find
    for (const key of this._pathMap.keys()) {
      // 忽略path中的正则等匹配方式，仅匹配String
      if (path === key) {
        find = key
        break
      }
    }
    return this._pathMap.get(find)
  }
}

import Html5Mode from "./history/html5"

export default class Router {
  constructor({ routes = [] }) {
    this.routerTable = new RouterTable(routes)
    this.history = new Html5Mode(this)
  }
  init(app) {
    const { history } = this
    history.listen(route => {
      app._route = route
    })
    history.transitionTo(history.getCurrentLoaction())
  }
  push(to) {
    this.history.push(to)
  }
}

Router.install = function() {
  Vue.mixin({
    beforeCreate() {
      if (this.$options.router !== undefined) {
        this._routerRoot = this
        this._router = this.$options.router
        this._router.init(this)
        Vue.util.defineReactive(this, "_route", this._router.history.current)
      } else {
        this._routerRoot = this.$parent && this.$parent._routerRoot
      }
    }
  })
}
