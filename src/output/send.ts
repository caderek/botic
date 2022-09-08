import { mouse, Button } from "@nut-tree/nut-js";
import MouseAction from "./internal/actions/MouseAction.js";

/** Sends global input events. */
const send = {
  /** Sends global mouse events. */
  mouse: {
    /** Uses mouse click. */
    click: {
      /** Uses left mouse button. */
      get left() {
        return new MouseAction(Button.LEFT, "click");
      },
      /** Uses right mouse button. */
      get right() {
        return new MouseAction(Button.RIGHT, "click");
      },
      /** Uses middle mouse button. */
      get middle() {
        return new MouseAction(Button.MIDDLE, "click");
      },
    },

    /** Uses pressing of the mouse button. */
    press: {
      /** Uses left mouse button. */
      get left() {
        return new MouseAction(Button.LEFT, "pressButton");
      },
      /** Uses right mouse button. */
      get right() {
        return new MouseAction(Button.RIGHT, "pressButton");
      },
      /** Uses middle mouse button. */
      get middle() {
        return new MouseAction(Button.MIDDLE, "pressButton");
      },
    },

    /** Uses releasing of the mouse button. */
    release: {
      /** Uses left mouse button. */
      get left() {
        return new MouseAction(Button.LEFT, "releaseButton");
      },
      /** Uses right mouse button. */
      get right() {
        return new MouseAction(Button.RIGHT, "releaseButton");
      },
      /** Uses middle mouse button. */
      get middle() {
        return new MouseAction(Button.MIDDLE, "releaseButton");
      },
    },

    /** Uses the mouse scroll. */
    scroll: {
      async down(amount: number) {
        await mouse.scrollDown(amount);
      },
      async up(amount: number) {
        await mouse.scrollUp(amount);
      },
      async right(amount: number) {
        await mouse.scrollRight(amount);
      },
      async left(amount: number) {
        await mouse.scrollLeft(amount);
      },
    },

    /** Moves the mouse. */
    get move() {
      return true;
    },
  },
  /** Sends global keyboard events. */
  key: {
    /** Uses pressing of the key. */
    get press() {
      return true;
    },

    /** Uses releasing of the key. */
    get release() {
      return true;
    },
  },
  /** Types provided text. */
  get text() {
    return true;
  },
};

export default send;
