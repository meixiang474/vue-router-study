import install, { Vue } from "./install";
import createMatcher from "./create-matcher";
import HashHistory from "./history/HashHistory";
import BrowserHistory from "./history/BrowserHistory";

class VueRouter {
  constructor(options) {
    this.matcher = createMatcher(options.routes || []);
    this.mode = options.mode || "hash";
    switch (this.mode) {
      case "hash":
        this.history = new HashHistory(this);
        break;
      case "history":
        this.history = new BrowserHistory(this);
        break;
    }
    this.beforeHooks = [];
  }
  match(location) {
    return this.matcher.match(location);
  }
  init(app) {
    const history = this.history;
    const setupHashListener = () => {
      history.setupListener();
    };
    history.transitionTo(history.getCurrentLocation(), setupHashListener);
    history.listen((route) => {
      app._route = route;
    });
  }
  push(location) {
    window.location.hash = location;
  }
  beforeEach(fn) {
    this.beforeHooks.push(fn);
  }
}

VueRouter.install = install;
export default VueRouter;
