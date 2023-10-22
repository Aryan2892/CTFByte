from flask_restx import Resource

from CTFByte.api.v1.statistics import statistics_namespace
from CTFByte.models import Teams
from CTFByte.utils.decorators import admins_only


@statistics_namespace.route("/teams")
class TeamStatistics(Resource):
    @admins_only
    def get(self):
        registered = Teams.query.count()
        data = {"registered": registered}
        return {"success": True, "data": data}
