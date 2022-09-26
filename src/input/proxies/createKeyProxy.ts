import KeyPressReleaseHook from "../hooks/KeyPressReleaseHook.js";
import { KeyError } from "../../common/errors/errors.js";
import { KeysInput } from "../../common/constants.js";
import { KeyInputName } from "../../common/types";

/**
 * Creates proxy object with properties as:
 * - keyboard keys names as getters,
 * - "any" getter that represents any key,
 *
 * @returns Instance of key hook
 */
const createKeyProxy = (type: "keydown" | "keyup") => {
  return new Proxy(
    {},
    {
      get(_, prop) {
        if (prop === "any") {
          return new KeyPressReleaseHook(type);
        }

        if (!KeysInput.hasOwnProperty(prop)) {
          throw new KeyError(prop);
        }

        let keycode: number = KeysInput[prop as KeyInputName];
        return new KeyPressReleaseHook(type, keycode);
      },
    }
  ) as Record<KeyInputName, KeyPressReleaseHook> & {
    any: KeyPressReleaseHook;
  };
};

export default createKeyProxy;
