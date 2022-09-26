import logUpdate from "log-update";
import $ from "../index.js";

const smooth = process.argv[2] === "smooth";

$.listen.any.do((e) => {
  if (e.type === "KEY_PRESSED" && e.key === "Escape") {
    process.exit();
  }

  if (smooth) {
    logUpdate(JSON.stringify(e, null, 2));
  } else {
    console.log(e);
  }
});
