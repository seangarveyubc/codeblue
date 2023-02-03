from firebase_admin import messaging, credentials
import firebase_admin


class FCMUtils:
    def __init__(self):
        creds = credentials.Certificate(
            './firebase-ppk.json')
        default_app = firebase_admin.initialize_app(creds)

    def send_to_token(self, registration_token):
        message = messaging.Message(
            notification=messaging.Notification(
                title="CARDIAC ARREST DETECTED! ",
                body="911 will be alerted soon",
            ),
            token=registration_token
        )
        response = messaging.send(message)

        return response