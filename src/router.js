import Vue from "vue"
// import Router from "vue-router"
import Router from "./router/router"
import Foo from "./pages/Foo"
import Bar from "./pages/Bar"

Vue.use(Router)

export default new Router({
  routes: [
    { path: "/foo", component: Foo },
    { path: "/bar", component: Bar }
  ]
})
