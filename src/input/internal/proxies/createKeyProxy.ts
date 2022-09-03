import KeyPressReleaseHook from "../hooks/KeyPressReleaseHook.js";
import getKeyError from "../errors/getKeyError.js";

import { KeycodeByName } from "../../constants.js";
import { KeyName } from "../../types";

/**
 * Creates proxy object with properties as:
 * - keyboard keys names as getters,
 * - "any" getter that represents any key,
 * - code(keycode) method,
 *
 * @returns Instance of key hook
 */
const createKeyProxy = (type: "keydown" | "keyup") => {
  return new Proxy(
    {},
    {
      get(_, prop) {
        if (prop === "code") {
          return (keycode: number) => new KeyPressReleaseHook(type, keycode);
        }

        if (prop === "any") {
          return new KeyPressReleaseHook(type);
        }

        if (!KeycodeByName.hasOwnProperty(prop)) {
          throw getKeyError(prop);
        }

        let keycode: number = KeycodeByName[prop as KeyName];
        return new KeyPressReleaseHook(type, keycode);
      },
    }
  ) as Record<KeyName, KeyPressReleaseHook> & {
    any: KeyPressReleaseHook;
    code(keycode: number): KeyPressReleaseHook;
  };
};

export default createKeyProxy;
