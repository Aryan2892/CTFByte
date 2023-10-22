import CTFByte from "core/CTFByte";
import nunjucks from "nunjucks";
import $ from "jquery";

window.challenge = new Object();

function loadChalTemplate(challenge) {
  $.getScript(CTFByte.config.urlRoot + challenge.scripts.view, function() {
    $.get(CTFByte.config.urlRoot + challenge.templates.create, function(
      template_data
    ) {
      const template = nunjucks.compile(template_data);
      $("#create-chal-entry-div").html(
        template.render({
          nonce: CTFByte.config.csrfNonce,
          script_root: CTFByte.config.urlRoot
        })
      );

      $.getScript(CTFByte.config.urlRoot + challenge.scripts.create, function() {
        $("#create-chal-entry-div form").submit(function(event) {
          event.preventDefault();
          const params = $("#create-chal-entry-div form").serializeJSON();
          CTFByte.fetch("/api/v1/challenges", {
            method: "POST",
            credentials: "same-origin",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify(params)
          }).then(function(response) {
            if (response.success) {
              window.location =
                CTFByte.config.urlRoot + "/admin/challenges/" + response.data.id;
            }
          });
        });
      });
    });
  });
}

$.get(CTFByte.config.urlRoot + "/api/v1/challenges/types", function(response) {
  $("#create-chals-select").empty();
  const data = response.data;
  const chal_type_amt = Object.keys(data).length;
  if (chal_type_amt > 1) {
    const option = "<option> -- </option>";
    $("#create-chals-select").append(option);
    for (const key in data) {
      const challenge = data[key];
      const option = $("<option/>");
      option.attr("value", challenge.type);
      option.text(challenge.name);
      option.data("meta", challenge);
      $("#create-chals-select").append(option);
    }
    $("#create-chals-select-div").show();
  } else if (chal_type_amt == 1) {
    const key = Object.keys(data)[0];
    $("#create-chals-select").empty();
    loadChalTemplate(data[key]);
  }
});

function createChallenge(_event) {
  const challenge = $(this)
    .find("option:selected")
    .data("meta");
  loadChalTemplate(challenge);
}

$(() => {
  $("#create-chals-select").change(createChallenge);
});
