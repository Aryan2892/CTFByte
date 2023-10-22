import CTFByte from "core/CTFByte";
import $ from "jquery";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import nunjucks from "nunjucks";
import { Howl } from "howler";
import events from "core/events";
import times from "core/times";
import styles from "../styles";
import { default as helpers } from "core/helpers";

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
  events(CTFByte.config.urlRoot);
});
