import KeyPressReleaseAction from "../actions/KeyPressReleaseAction.js";
import getKeyError from "../../common/errors/getKeyError.js";

import { KeycodeByName } from "../../common/constants.js";
import { KeyName } from "../../common/types";

/**
 * Creates proxy object with properties as:
 * - keyboard keys names as getters,
 * - "any" getter that represents any key,
 * - code(keycode) method,
 *
 * @returns Instance of key hook
 */
const createKeyPressReleaseProxy = (type: "down" | "up") => {
  return new Proxy(
    {},
    {
      get(_, prop) {
        if (prop === "code") {
          return (keycode: number) => new KeyPressReleaseAction(type, keycode);
        }

        if (!KeycodeByName.hasOwnProperty(prop)) {
          throw getKeyError(prop);
        }

        let keycode: number = KeycodeByName[prop as KeyName];
        return new KeyPressReleaseAction(type, keycode);
      },
    }
  ) as Record<KeyName, KeyPressReleaseAction> & {
    code(keycode: number): KeyPressReleaseAction;
  };
};

export default createKeyPressReleaseProxy;
