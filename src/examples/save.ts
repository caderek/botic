import logUpdate from "log-update";
import listen from "../input/listen.js";

listen.any.do((event) => {
  logUpdate(JSON.stringify(event, null, 2));
});
