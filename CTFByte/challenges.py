from flask import Blueprint, redirect, render_template, request, url_for

from CTFByte.constants.config import ChallengeVisibilityTypes, Configs
from CTFByte.utils.config import is_teams_mode
from CTFByte.utils.dates import ctf_ended, ctf_paused, ctf_started
from CTFByte.utils.decorators import (
    during_ctf_time_only,
    require_complete_profile,
    require_verified_emails,
)
from CTFByte.utils.decorators.visibility import check_challenge_visibility
from CTFByte.utils.helpers import get_errors, get_infos
from CTFByte.utils.user import authed, get_current_team

challenges = Blueprint("challenges", __name__)


@challenges.route("/challenges", methods=["GET"])
@require_complete_profile
@during_ctf_time_only
@require_verified_emails
@check_challenge_visibility
def listing():
    if (
        Configs.challenge_visibility == ChallengeVisibilityTypes.PUBLIC
        and authed() is False
    ):
        pass
    else:
        if is_teams_mode() and get_current_team() is None:
            return redirect(url_for("teams.private", next=request.full_path))

    infos = get_infos()
    errors = get_errors()

    if Configs.challenge_visibility == ChallengeVisibilityTypes.ADMINS:
        infos.append("Challenge Visibility is set to Admins Only")

    if ctf_started() is False:
        errors.append(f"{Configs.ctf_name} has not started yet")

    if ctf_paused() is True:
        infos.append(f"{Configs.ctf_name} is paused")

    if ctf_ended() is True:
        infos.append(f"{Configs.ctf_name} has ended")

    return render_template("challenges.html", infos=infos, errors=errors)
