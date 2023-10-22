import CTFByte from "../CTFByte";
import $ from "jquery";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import nunjucks from "nunjucks";
import { Howl } from "howler";
import events from "../events";
import config from "../config";
import styles from "../styles";
import times from "../times";
import { default as helpers } from "../helpers";

dayjs.extend(advancedFormat);

CTFByte.init(window.init);
window.CTFByte = CTFByte;
window.helpers = helpers;
window.$ = $;
window.dayjs = dayjs;
window.nunjucks = nunjucks;
window.Howl = Howl;

$(() => {
  styles();
  times();
  events(config.urlRoot);
});
