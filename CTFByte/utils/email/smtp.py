from CTFByte.utils.email.providers.smtp import SMTPEmailProvider


def sendmail(addr, text, subject):
    print(
        "CTFByte.utils.email.smtp.sendmail will raise an exception in a future minor release of CTFByte and then be removed in CTFByte v4.0"
    )
    return SMTPEmailProvider.sendmail(addr, text, subject)
