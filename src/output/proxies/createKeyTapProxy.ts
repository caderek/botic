import KeyTapAction from "../actions/KeyTapAction.js";
import { KeyError } from "../../common/errors/errors.js";
import { Keys } from "../../common/constants.js";
import { KeyName } from "../../common/types";

/**
 * Creates proxy object with properties as:
 * - keyboard keys names as getters,
 *
 * @returns Instance of key tap action
 */
const createKeyPressReleaseProxy = () => {
  return new Proxy(
    {},
    {
      get(_, prop) {
        if (!Keys.hasOwnProperty(prop)) {
          throw new KeyError(prop);
        }

        let keycode: number = Keys[prop as KeyName];
        return new KeyTapAction(keycode);
      },
    }
  ) as Record<KeyName, KeyTapAction>;
};

export default createKeyPressReleaseProxy;
