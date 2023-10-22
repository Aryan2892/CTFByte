import $ from "jquery";
import events from "core/events";
import CTFByte from "core/CTFByte";

$(() => {
  events(CTFByte.config.urlRoot);
});
