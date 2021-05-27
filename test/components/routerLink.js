export default {
  name: "router-link",
  functional: true,
  props: {
    to: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
    },
  },
  render(h, ctx) {
    let tag = ctx.tag || "a";
    const clickHandler = () => {
      ctx.parent.$router.push(ctx.props.to);
    };
    return h(tag, { on: { click: clickHandler } }, ctx.slots().default);
  },
};
