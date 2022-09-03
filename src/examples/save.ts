import logUpdate from "log-update";
import listen from "../io/listen.js";

listen.key.press.ArrowDown.ctrl.do((e) => {
  logUpdate(JSON.stringify(e, null, 2));
});

listen.key.press.ArrowUp.all.do((e) => {
  logUpdate(JSON.stringify(e, null, 2));
});

listen.key.press.code(57376).do(() => {
  logUpdate("Mute key pressed!");
});

listen.any.do((e) => {
  logUpdate(JSON.stringify(e, null, 2));
});

// @todo
// listen.mouse.click.any.mod;
// listen.key.press.any.mod;
