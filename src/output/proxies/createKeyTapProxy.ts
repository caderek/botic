import KeyTapAction from "../actions/KeyTapAction.js";
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
const createKeyPressReleaseProxy = () => {
  return new Proxy(
    {},
    {
      get(_, prop) {
        if (prop === "code") {
          return (keycode: number) => new KeyTapAction(keycode);
        }

        if (!KeycodeByName.hasOwnProperty(prop)) {
          throw getKeyError(prop);
        }

        let keycode: number = KeycodeByName[prop as KeyName];
        return new KeyTapAction(keycode);
      },
    }
  ) as Record<KeyName, KeyTapAction> & {
    code(keycode: number): KeyTapAction;
  };
};

export default createKeyPressReleaseProxy;
