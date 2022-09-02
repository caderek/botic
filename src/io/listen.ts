import UniversalHook from "./internal/UniversalHook.js";
import MouseClickHook from "./internal/MouseClickHook.js";
import MouseMoveHook from "./internal/MouseMoveHook.js";
import MousePressReleaseHook from "./internal/MousePressReleaseHook.js";
import MouseWheelHook from "./internal/MouseScrollHook.js";

const listen = {
  mouse: {
    get click() {
      return new MouseClickHook();
    },

    get press() {
      return new MousePressReleaseHook("mousedown");
    },

    get release() {
      return new MousePressReleaseHook("mouseup");
    },

    get scroll() {
      return new MouseWheelHook();
    },

    get move() {
      return new MouseMoveHook();
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
    return new UniversalHook();
  },
};

export default listen;
