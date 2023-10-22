from wtforms import TextAreaField
from wtforms.validators import InputRequired

from CTFByte.forms import BaseForm
from CTFByte.forms.fields import SubmitField


class SendEmailForm(BaseForm):
    text = TextAreaField("Message", validators=[InputRequired()])
    submit = SubmitField("Send")
