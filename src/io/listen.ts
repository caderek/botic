import MouseClickHook from "./internal/MouseClickHook.js";
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

    get up() {
      return new MouseUpDownHook(state, "mouseup");
    },

    get down() {
      return new MouseUpDownHook(state, "mousedown");
    },

    get wheel() {
      return new MouseWheelHook(state);
    },
  },
};

export default listen;
