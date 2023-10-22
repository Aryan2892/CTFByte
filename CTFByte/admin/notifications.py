from flask import render_template

from CTFByte.admin import admin
from CTFByte.models import Notifications
from CTFByte.utils.decorators import admins_only


@admin.route("/admin/notifications")
@admins_only
def notifications():
    notifs = Notifications.query.order_by(Notifications.id.desc()).all()
    return render_template("admin/notifications.html", notifications=notifs)
