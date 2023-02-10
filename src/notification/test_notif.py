from FCMUtils import FCMUtils

def main():
    messaging = FCMUtils()
    device_fcm__token = 'fHCSIiNfSP6YsZo51pvRvp:APA91bHJAj6kqTSOqiQmgr-Z2ropDCvpA3bbzURSXns24rUSu-FkeWrp25EmAInKa06owzZNZyUOl94u-3Oi0aAmAL5esZUpAi-kvyERjgg8J2VB43qrwLytz-LfdOIEJ4Znp7mscXJC'
    title = "CARDIAC ARREST DETECTED! "
    body = "911 will be alerted soon"

    messaging.send_to_token(device_fcm__token, title, body)

if __name__ == "__main__":
    main()