import { clipboard } from "@nut-tree/nut-js";
import { UiohookKey } from "uiohook-napi";
import KeyTapAction from "./KeyTapAction.js";

async function type(phrase: string) {
  const temp = await clipboard.paste();
  await clipboard.copy(phrase);
  await new KeyTapAction(UiohookKey.V).Ctrl.send();
  await clipboard.copy(temp);
}

export default type;
