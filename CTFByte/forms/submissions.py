from wtforms import SelectField, StringField
from wtforms.validators import InputRequired

from CTFByte.forms import BaseForm
from CTFByte.forms.fields import SubmitField


class SubmissionSearchForm(BaseForm):
    field = SelectField(
        "Search Field",
        choices=[
            ("provided", "Provided"),
            ("id", "ID"),
            ("account_id", "Account ID"),
            ("challenge_id", "Challenge ID"),
            ("challenge_name", "Challenge Name"),
        ],
        default="provided",
        validators=[InputRequired()],
    )
    q = StringField("Parameter", validators=[InputRequired()])
    submit = SubmitField("Search")
