import AllHook from "./internal/AllHook.js";
import MouseClickHook from "./internal/MouseClickHook.js";
import MouseMoveHook from "./internal/MouseMoveHook.js";
import MousePressReleaseHook from "./internal/MousePressReleaseHook.js";
import MouseWheelHook from "./internal/MouseScrollHook.js";

const state = {
  isRunning: false,
};

const listen = {
  mouse: {
    get click() {
      return new MouseClickHook(state);
    },

    get press() {
      return new MousePressReleaseHook(state, "mousedown");
    },

    get release() {
      return new MousePressReleaseHook(state, "mouseup");
    },

    get scroll() {
      return new MouseWheelHook(state);
    },

    get move() {
      return new MouseMoveHook(state);
    },
  },
  key: {
    get press() {
      return 1;
    },
    get release() {
      return 1;
    },
  },
  get all() {
    return new AllHook(state);
  },
};

export default listen;
