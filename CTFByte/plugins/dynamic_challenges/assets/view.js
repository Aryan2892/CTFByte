CTFByte._internal.challenge.data = undefined;

// TODO: Remove in CTFByte v4.0
CTFByte._internal.challenge.renderer = null;

CTFByte._internal.challenge.preRender = function() {};

// TODO: Remove in CTFByte v4.0
CTFByte._internal.challenge.render = null;

CTFByte._internal.challenge.postRender = function() {};

CTFByte._internal.challenge.submit = function(preview) {
  var challenge_id = parseInt(CTFByte.lib.$("#challenge-id").val());
  var submission = CTFByte.lib.$("#challenge-input").val();

  var body = {
    challenge_id: challenge_id,
    submission: submission
  };
  var params = {};
  if (preview) {
    params["preview"] = true;
  }

  return CTFByte.api.post_challenge_attempt(params, body).then(function(response) {
    if (response.status === 429) {
      // User was ratelimited but process response
      return response;
    }
    if (response.status === 403) {
      // User is not logged in or CTF is paused.
      return response;
    }
    return response;
  });
};
