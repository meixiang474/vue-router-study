export default {
  name: "router-view",
  functional: true,
  render(h, ctx) {
    let { parent, data } = ctx;
    let route = parent.$route;
    let depth = 0;
    data.routerView = true;
    while (parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++;
      }
      parent = parent.$parent;
    }
    let record = route.matched[depth];
    if (!record) {
      return h();
    }
    return h(record.component, data);
  },
};
