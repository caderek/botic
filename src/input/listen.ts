import UniversalHook from "./hooks/UniversalHook.js";
import MouseClickHook from "./hooks/MouseClickHook.js";
import MouseMoveHook from "./hooks/MouseMoveHook.js";
import MousePressReleaseHook from "./hooks/MousePressReleaseHook.js";
import MouseScrollHook from "./hooks/MouseScrollHook.js";
import createKeyProxy from "./proxies/createKeyProxy.js";

import { MouseButton } from "../common/constants.js";

/** Listens for global input events. */
const listen = {
  /** Listens for global mouse events. */
  mouse: {
    /** Registers mouse click. */
    click: {
      /** Registers any mouse button. */
      get Any() {
        return new MouseClickHook(MouseButton.ANY);
      },
      /** Registers left mouse button. */
      get Left() {
        return new MouseClickHook(MouseButton.LEFT);
      },
      /** Registers right mouse button. */
      get Right() {
        return new MouseClickHook(MouseButton.RIGHT);
      },
      /** Registers middle mouse button. */
      get Middle() {
        return new MouseClickHook(MouseButton.MIDDLE);
      },
    },

    /** Registers pressing of the mouse button. */
    press: {
      /** Registers any mouse button. */
      get Any() {
        return new MousePressReleaseHook("mousedown", MouseButton.ANY);
      },
      /** Registers left mouse button. */
      get Left() {
        return new MousePressReleaseHook("mousedown", MouseButton.LEFT);
      },
      /** Registers right mouse button. */
      get Right() {
        return new MousePressReleaseHook("mousedown", MouseButton.RIGHT);
      },
      /** Registers middle mouse button. */
      get Middle() {
        return new MousePressReleaseHook("mousedown", MouseButton.MIDDLE);
      },
    },

    /** Registers releasing of the mouse button. */
    release: {
      /** Registers any mouse button. */
      get Any() {
        return new MousePressReleaseHook("mouseup", MouseButton.ANY);
      },
      /** Registers left mouse button. */
      get Left() {
        return new MousePressReleaseHook("mouseup", MouseButton.LEFT);
      },
      /** Registers right mouse button. */
      get Right() {
        return new MousePressReleaseHook("mouseup", MouseButton.RIGHT);
      },
      /** Registers middle mouse button. */
      get Middle() {
        return new MousePressReleaseHook("mouseup", MouseButton.MIDDLE);
      },
    },

    /** Registers scrolling of the mouse wheel. */
    get scroll() {
      return new MouseScrollHook();
    },

    /** Registers movement of the mouse. */
    get move() {
      return new MouseMoveHook();
    },
  },
  /** Listens for global keyboard events. */
  key: {
    /** Registers pressing of the key. */
    get press() {
      return createKeyProxy("keydown");
    },

    /** Registers releasing of the key. */
    get release() {
      return createKeyProxy("keyup");
    },
  },
  /** Registers any input event. */
  get any() {
    return new UniversalHook();
  },
};

export default listen;
