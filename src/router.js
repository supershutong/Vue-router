import Vue from "vue"
// import Router from "vue-router"
import Router from "./router/router"
import Foo from "./pages/Foo"
import Bar from "./pages/Bar"

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: "/foo",
      component: Foo,
      beforeEnter(to, from, next) {
        console.log("/foo.beforeEnter", to, from)
        next()
      }
    },
    { path: "/bar", component: Bar }
  ]
})

router.beforeEach((to, from, next) => {
  console.log("router.beforeEach", to, from)
  next(false)
})

router.beforeResolve((to, from, next) => {
  console.log("router.beforeResolve", to, from)
  next()
})

router.afterEach((to, from) => {
  console.log("router.afterEach", to, from)
})

export default router
