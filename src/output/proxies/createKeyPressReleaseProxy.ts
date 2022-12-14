import KeyPressReleaseAction from "../actions/KeyPressReleaseAction.js";
import { KeyError } from "../../common/errors/errors.js";
import { Keys } from "../../common/constants.js";
import { KeyName } from "../../common/types";

/**
 * Creates proxy object with properties as:
 * - keyboard keys names as getters,
 *
 * @returns Instance of key press/release action
 */
const createKeyPressReleaseProxy = (type: "down" | "up") => {
  return new Proxy(
    {},
    {
      get(_, prop) {
        if (!Keys.hasOwnProperty(prop)) {
          throw new KeyError(prop);
        }

        let keycode: number = Keys[prop as KeyName];
        return new KeyPressReleaseAction(type, keycode);
      },
    }
  ) as Record<KeyName, KeyPressReleaseAction>;
};

export default createKeyPressReleaseProxy;
