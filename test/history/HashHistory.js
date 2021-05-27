function ensureSlash() {
  if(window.location.hash) {
    return 
  }
  window.location.hash = '/'
}
export default class Hashhistory extends History {
  constructor(router) {
    super(router)
    ensureSlash()
  }
  getCurrentLocation() {
    return window.location.hash.slice(1)
  }
  setupListener() {
    window.addEventListener('hashchange', () => {
      this.transitionTo(this.getCurrentLocation())
    })
  }
}