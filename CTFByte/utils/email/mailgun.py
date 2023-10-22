from CTFByte.utils.email.providers.mailgun import MailgunEmailProvider


def sendmail(addr, text, subject):
    print(
        "CTFByte.utils.email.mailgun.sendmail will raise an exception in a future minor release of CTFByte and then be removed in CTFByte v4.0"
    )
    return MailgunEmailProvider.sendmail(addr, text, subject)
