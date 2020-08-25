import { runQueue } from "../util/async"

export default class HistoryBase {
  constructor(router) {
    this.router = router
    this.routerTable = router.routerTable
  }

  listen(cb) {
    this.cb = cb
  }

  transitionTo(target) {
    const route = this.routerTable.match(target)

    this.confirmTransition(route, () => {
      this.updateRoute(route)
    })
  }

  confirmTransition(route, onComplete, onAbort) {
    if (route === this.current) return
    const queue = [
      ...this.router.beforeHooks,
      route.beforeEnter,
      route.component.beforeRouteEnter?.bind(route.instance),
      ...this.router.resolveHooks
    ]

    const iterator = (hook, next) => {
      hook(route, this.current, to => {
        if (to === false) {
          onAbort && onAbort(to)
        } else {
          next(to)
        }
      })
    }

    runQueue(queue, iterator, () => onComplete())
  }

  updateRoute(route) {
    const from = this.current
    this.current = route
    this.cb(this.current)
    this.router.afterHooks.forEach(hook => {
      hook && hook(route, from)
    })
  }
}
