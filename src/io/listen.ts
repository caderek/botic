import MouseClickHook from "./internal/MouseClickHook.js";
import MouseMoveHook from "./internal/MouseMoveHook.js";
import MouseUpDownHook from "./internal/MouseUpDownHook.js";
import MouseWheelHook from "./internal/MouseWheelHook.js";

const state = {
  isRunning: false,
};

const listen = {
  mouse: {
    get click() {
      return new MouseClickHook(state);
    },

    get press() {
      return new MouseUpDownHook(state, "mousedown");
    },

    get release() {
      return new MouseUpDownHook(state, "mouseup");
    },

    get scroll() {
      return new MouseWheelHook(state);
    },

    get move() {
      return new MouseMoveHook(state);
    },
  },
};

export default listen;
