from flask import Blueprint, render_template

from CTFByte.utils import config
from CTFByte.utils.config.visibility import scores_visible
from CTFByte.utils.decorators.visibility import (
    check_account_visibility,
    check_score_visibility,
)
from CTFByte.utils.helpers import get_infos
from CTFByte.utils.scores import get_standings
from CTFByte.utils.user import is_admin

scoreboard = Blueprint("scoreboard", __name__)


@scoreboard.route("/scoreboard")
@check_account_visibility
@check_score_visibility
def listing():
    infos = get_infos()

    if config.is_scoreboard_frozen():
        infos.append("Scoreboard has been frozen")

    if is_admin() is True and scores_visible() is False:
        infos.append("Scores are not currently visible to users")

    standings = get_standings()
    return render_template("scoreboard.html", standings=standings, infos=infos)
