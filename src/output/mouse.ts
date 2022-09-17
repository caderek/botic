import { mouse as rawMouse, Button } from "@nut-tree/nut-js";
import MouseClickAction from "./actions/MouseClickAction.js";
import MousePressReleaseAction from "./actions/MousePressReleaseAction.js";
import MouseScrollAction from "./actions/MouseScrollAction.js";
import MouseMoveAction from "./actions/MouseMoveAction.js";
import MouseDragAction from "./actions/MouseDragAction.js";
import goto from "./actions/goto.js";

import { Point } from "../common/types";

/** Sends global mouse events. */
const mouse = {
  /** Uses mouse click. */
  click: {
    /** Uses left mouse button. */
    get Left() {
      return new MouseClickAction(Button.LEFT);
    },
    /** Uses right mouse button. */
    get Right() {
      return new MouseClickAction(Button.RIGHT);
    },
    /** Uses middle mouse button. */
    get Middle() {
      return new MouseClickAction(Button.MIDDLE);
    },
  },

  /** Uses pressing of the mouse button. */
  press: {
    /** Uses left mouse button. */
    get Left() {
      return new MousePressReleaseAction("pressButton", Button.LEFT);
    },
    /** Uses right mouse button. */
    get Right() {
      return new MousePressReleaseAction("pressButton", Button.RIGHT);
    },
    /** Uses middle mouse button. */
    get Middle() {
      return new MousePressReleaseAction("pressButton", Button.MIDDLE);
    },
  },

  /** Uses releasing of the mouse button. */
  release: {
    /** Uses left mouse button. */
    get Left() {
      return new MousePressReleaseAction("releaseButton", Button.LEFT);
    },
    /** Uses right mouse button. */
    get Right() {
      return new MousePressReleaseAction("releaseButton", Button.RIGHT);
    },
    /** Uses middle mouse button. */
    get Middle() {
      return new MousePressReleaseAction("releaseButton", Button.MIDDLE);
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

  // /** Drags the mouse holding the left button. */
  // get drag() {
  //   return new MouseMoveDragAction("drag");
  // },

  /** Uses mouse click. */
  drag: {
    /** Uses left mouse button. */
    get Left() {
      return new MouseDragAction(Button.LEFT);
    },
    /** Uses right mouse button. */
    get Right() {
      return new MouseDragAction(Button.RIGHT);
    },
    /** Uses middle mouse button. */
    get Middle() {
      return new MouseDragAction(Button.MIDDLE);
    },
  },
};

export default mouse;
