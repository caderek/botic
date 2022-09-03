import UniversalHook from "./internal/hooks/UniversalHook.js";
import MouseClickHook from "./internal/hooks/MouseClickHook.js";
import MouseMoveHook from "./internal/hooks/MouseMoveHook.js";
import MousePressReleaseHook from "./internal/hooks/MousePressReleaseHook.js";
import MouseScrollHook from "./internal/hooks/MouseScrollHook.js";
import createKeyProxy from "./internal/proxies/createKeyProxy.js";

import { MouseButton } from "./constants.js";

/** Listens for global input events. */
const listen = {
  /** Listens for global mouse events. */
  mouse: {
    /** Registers mouse click. */
    click: {
      /** Registers any mouse button. */
      get any() {
        return new MouseClickHook(MouseButton.ANY);
      },
      /** Registers left mouse button. */
      get left() {
        return new MouseClickHook(MouseButton.LEFT);
      },
      /** Registers right mouse button. */
      get right() {
        return new MouseClickHook(MouseButton.RIGHT);
      },
      /** Registers middle mouse button. */
      get middle() {
        return new MouseClickHook(MouseButton.MIDDLE);
      },
    },

    /** Registers pressing of the mouse button. */
    press: {
      /** Registers any mouse button. */
      get any() {
        return new MousePressReleaseHook("mousedown", MouseButton.ANY);
      },
      /** Registers left mouse button. */
      get left() {
        return new MousePressReleaseHook("mousedown", MouseButton.LEFT);
      },
      /** Registers right mouse button. */
      get right() {
        return new MousePressReleaseHook("mousedown", MouseButton.RIGHT);
      },
      /** Registers middle mouse button. */
      get middle() {
        return new MousePressReleaseHook("mousedown", MouseButton.MIDDLE);
      },
    },

    /** Registers releasing of the mouse button. */
    release: {
      /** Registers any mouse button. */
      get any() {
        return new MousePressReleaseHook("mouseup", MouseButton.ANY);
      },
      /** Registers left mouse button. */
      get left() {
        return new MousePressReleaseHook("mouseup", MouseButton.LEFT);
      },
      /** Registers right mouse button. */
      get right() {
        return new MousePressReleaseHook("mouseup", MouseButton.RIGHT);
      },
      /** Registers middle mouse button. */
      get middle() {
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
