import install from './install'
import createMatcher from '../vue-router/create-matcher'
import HashHistory from '../vue-router/history/hashHistory'
import BrowserHistory from '../vue-router/history/browserHistory'
class VueRouter {
  constructor(options) {
    this.matcher = createMatcher(options.routes || [])
    this.mode = options.mode
    switch(this.mode) {
      case 'hash':
        this.history = new HashHistory(this)
        break
      case 'history':
        this.history = new BrowserHistory(this)
    }
    this.beforeHooks = []
  }
  match(location) {
    return this.matcher.match(location)
  }
  init(app) {
    const history = this.history
    let setupHashListener = () => {
      history.setupListener()
    }
    history.transitionTo(history.getCurrentLocation(), setupHashListener)
    history.listen((route) => {
      app._route = route
    })
  }
  push(location) {
    window.location.hash = location
  }
  beforeEach(fn) {
    this.beforeHooks.push(fn)
  }
}
VueRouter.install = install
export default VueRouter