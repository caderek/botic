import UniversalHook from "./internal/UniversalHook.js";
import MouseClickHook from "./internal/MouseClickHook.js";
import MouseMoveHook from "./internal/MouseMoveHook.js";
import MousePressReleaseHook from "./internal/MousePressReleaseHook.js";
import MouseScrollHook from "./internal/MouseScrollHook.js";
import KeyPressReleaseHook from "./internal/KeyPressReleaseHook.js";

import { KeyName } from "./internal/types";
import { KeycodeByName } from "./internal/constants.js";

const getKeyError = (key: string | Symbol) => {
  return new Error(
    `Key <${String(
      key
    )}> is not defined. For custom keys, use .keycode(code) method.`
  );
};

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
      return new MouseScrollHook();
    },

    get move() {
      return new MouseMoveHook();
    },
  },
  key: {
    get press() {
      return new Proxy(
        {},
        {
          get(_, prop) {
            if (prop === "code") {
              return (keycode: number) =>
                new KeyPressReleaseHook("keydown", keycode);
            }

            if (!KeycodeByName.hasOwnProperty(prop)) {
              throw getKeyError(prop);
            }

            let keycode: number = KeycodeByName[prop as KeyName];
            return new KeyPressReleaseHook("keydown", keycode);
          },
        }
      ) as Record<KeyName, KeyPressReleaseHook> & {
        code(keycode: number): KeyPressReleaseHook;
      };
    },

    get release() {
      return 1;
    },
  },
  get any() {
    return new UniversalHook();
  },
};

export default listen;
