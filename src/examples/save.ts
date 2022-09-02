import { uIOhook, UiohookKey, UiohookMouseEvent } from "uiohook-napi";
import {
  screen,
  imageResource,
  mouse,
  getActiveWindow,
  getWindows,
  centerOf,
  Region,
  Window,
  Button,
  Point,
  keyboard,
  Key,
} from "@nut-tree/nut-js";
import logUpdate from "log-update";
import listen from "../io/listen.js";

listen.all.do((e) => {
  logUpdate(JSON.stringify(e, null, 2));
});
