import { mouse as rawMouse, Button } from "@nut-tree/nut-js";
import MouseClickAction from "./internal/actions/MouseClickAction.js";
import MousePressReleaseAction from "./internal/actions/MousePressReleaseAction.js";
import MouseScrollAction from "./internal/actions/MouseScrollAction.js";
import MouseMoveAction from "./internal/actions/MouseMoveAction.js";
import goto from "./internal/actions/goto.js";

import { Point } from "./types";

/** Sends global mouse events. */
const mouse = {
  /** Uses mouse click. */
  click: {
    /** Uses left mouse button. */
    get left() {
      return new MouseClickAction(Button.LEFT);
    },
    /** Uses right mouse button. */
    get right() {
      return new MouseClickAction(Button.RIGHT);
    },
    /** Uses middle mouse button. */
    get middle() {
      return new MouseClickAction(Button.MIDDLE);
    },
  },

  /** Uses pressing of the mouse button. */
  press: {
    /** Uses left mouse button. */
    get left() {
      return new MousePressReleaseAction(Button.LEFT, "pressButton");
    },
    /** Uses right mouse button. */
    get right() {
      return new MousePressReleaseAction(Button.RIGHT, "pressButton");
    },
    /** Uses middle mouse button. */
    get middle() {
      return new MousePressReleaseAction(Button.MIDDLE, "pressButton");
    },
  },

  /** Uses releasing of the mouse button. */
  release: {
    /** Uses left mouse button. */
    get left() {
      return new MousePressReleaseAction(Button.LEFT, "releaseButton");
    },
    /** Uses right mouse button. */
    get right() {
      return new MousePressReleaseAction(Button.RIGHT, "releaseButton");
    },
    /** Uses middle mouse button. */
    get middle() {
      return new MousePressReleaseAction(Button.MIDDLE, "releaseButton");
    },
  },

  /** Uses the mouse scroll. */
  scroll: {
    get down() {
      return new MouseScrollAction("scrollDown");
    },
    get up() {
      return new MouseScrollAction("scrollUp");
    },
    get right() {
      return new MouseScrollAction("scrollRight");
    },
    get left() {
      return new MouseScrollAction("scrollLeft");
    },
  },

  get position(): Promise<Point> {
    return rawMouse.getPosition().then((pos) => ({ ...pos }));
  },

  /** Sets the mouse position. */
  goto,

  /** Moves the mouse. */
  get move() {
    return new MouseMoveAction();
  },
};

export default mouse;
