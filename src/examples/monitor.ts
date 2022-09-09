import logUpdate from "log-update";
import $ from "../index.js";

$.listen.any.do((e) => {
  logUpdate(JSON.stringify(e, null, 2));
});
