import KeyTypeAction from "./actions/KeyTypeAction.js";
import type from "./actions/type.js";
import createKeyPressReleaseProxy from "./proxies/createKeyPressReleaseProxy.js";
import createKeyTapProxy from "./proxies/createKeyTapProxy.js";

/** Sends global keyboard events. */
const keyboard = {
  /** Uses pressing of the key. */
  get press() {
    return createKeyPressReleaseProxy("down");
  },

  /** Uses releasing of the key. */
  get release() {
    return createKeyPressReleaseProxy("up");
  },

  /** Uses releasing of the key. */
  get tap() {
    return createKeyTapProxy();
  },

  /** Types provided text. */
  get type() {
    return new KeyTypeAction();
  },
};

export default keyboard;
