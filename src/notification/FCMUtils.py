from firebase_admin import messaging, credentials
import firebase_admin


class FCMUtils:
    def __init__(self):
        creds = credentials.Certificate(
            './firebase-ppk.json')
        default_app = firebase_admin.initialize_app(creds)

    def send_to_token(self, registration_token, title, body):
        message = messaging.Message(
            notification=messaging.Notification(
                title=title,
                body=body,
            ),
            token=registration_token
        )
        response = messaging.send(message)

        return response