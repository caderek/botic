import $ from "../index.js";

$.listen.key.press.Ctrl.do((e) => {
  console.log(e.key);
});

// @todo - no listen signal on lone modifiers
