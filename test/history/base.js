function createRoute(record, location) {
  let matched = []
  if(record) {
    while(record) {
      matched.unshift(record)
      record = record.parent
    }
  }
  return {
    matched,
    ...location
  }
}
function runQueue(queue, iterator, callback) {
  function next(index) {
    if(index >= queue.length) {
      return callback()
    }
    iterator(queue[index], () => next(index + 1))
  }
  next(0)
}
export default class History {
  constructor(router) {
    this.router = router
    this.current = createRoute(null, {
      path: '/'
    })
  }
  transitionTo(location, complete) {
    let current = this.router.match(location)
    if(this.current.path === location && this.current.matched.length === current.matched.length){
      return
    }
    let queue = this.router.beforeHooks
    const iterator = (hook, next) => {
      hook(current, this.current, next)
    }
    runQueue(queue, iterator, () => {
      this.current = current
      this.cb && this.cb(current)
      complete && complete()
    })
  }
  listen(cb) {
    this.cb = cb
  }
}