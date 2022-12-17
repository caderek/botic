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
        return new MouseClickHook(MouseButton.Any);
      },
      /** Registers left mouse button. */
      get Left() {
        return new MouseClickHook(MouseButton.Left);
      },
      /** Registers right mouse button. */
      get Right() {
        return new MouseClickHook(MouseButton.Right);
      },
      /** Registers middle mouse button. */
      get Middle() {
        return new MouseClickHook(MouseButton.Middle);
      },
    },

    /** Registers pressing of the mouse button. */
    press: {
      /** Registers any mouse button. */
      get Any() {
        return new MousePressReleaseHook("mousedown", MouseButton.Any);
      },
      /** Registers left mouse button. */
      get Left() {
        return new MousePressReleaseHook("mousedown", MouseButton.Left);
      },
      /** Registers right mouse button. */
      get Right() {
        return new MousePressReleaseHook("mousedown", MouseButton.Right);
      },
      /** Registers middle mouse button. */
      get Middle() {
        return new MousePressReleaseHook("mousedown", MouseButton.Middle);
      },
    },

    /** Registers releasing of the mouse button. */
    release: {
      /** Registers any mouse button. */
      get Any() {
        return new MousePressReleaseHook("mouseup", MouseButton.Any);
      },
      /** Registers left mouse button. */
      get Left() {
        return new MousePressReleaseHook("mouseup", MouseButton.Left);
      },
      /** Registers right mouse button. */
      get Right() {
        return new MousePressReleaseHook("mouseup", MouseButton.Right);
      },
      /** Registers middle mouse button. */
      get Middle() {
        return new MousePressReleaseHook("mouseup", MouseButton.Middle);
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
