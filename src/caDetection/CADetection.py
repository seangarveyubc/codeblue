"""
DETAILS

    - Signal
        - Is sending data every 0.02s, or 50HZ
        - For a regular heart beat signal, one can expect that there is between 1 and 3 peaks/second
            - Any more, or any less could/should signal that the user is either
                - Not in a healthy range
                - Not wearing their sensor properly
            - Based on healthy cardiac signals from test data (1Hz, 60BPM)
                - @ T = 0.00s -> Peak
                - @ T = 0.15s -> Trough
                - @ T = 1.00s -> Peak
            - Based on healthy cardiac signals from test data (2Hz, 120BPM)
                - @ T = 0.00s -> Peak
                - @ T = 0.08s -> Trough
                - @ T = 0.50s -> Peak
            - Based on healthy cardiac signals from test data (3Hz, 180BPM)
                - @ T = 0.00s -> Peak
                - @ T = 0.08s -> Trough
                - @ T = 0.33s -> Peak

    - Algorithm
        - The algorithm will listen for the first two data points before starting to analyze for detection
            - Based on the test data, this will account for 0.06s of "unanalyzed" data
        - The algorithm will monitor signals in two fashions
            - Peak detection & monitoring
                - Peak height
                    - In relation to the average signal height
                    - In relation to the average trough depth
                - Peak-to-peak distance
                    - In relation to previous peaks
                - Absolute peak height
                    - In relation to a signal value of 0
            - Fourier transform
                - Discrete, non-uniform
                - Used to ensure that the signal frequencey is within a health range
                    - Between 1 & 3 Hz (60-180 BPM)
            - Based on othe nature of the signal, the smallest window that we can use is 3 data points to determine a peak (0.06s)
                - Since the distance between a peak and a trough can be 0.08s
"""

""" IMPORTS """
import numpy as np
import time
from Heart import Heart

""" CORE FUNCTION DEFINTION """
def isMaxima(signalVals):
    #print("full = " + str(signalVals))
    #print("mid = " + str(signalVals[mid]))
    #print("left = " + str(signalVals[0:mid]))
    #print("right = " + str(signalVals[mid+1:windowSize]))
    if (all(x < signalVals[mid] for x in signalVals[0:mid])) and (all(x < signalVals[mid] for x in signalVals[mid+1:windowSize])):
        return "peak"
    elif (all(x > signalVals[mid] for x in signalVals[0:mid])) and (all(x > signalVals[mid] for x in signalVals[mid+1:windowSize])):
        return "trough"
    return ""

""" KEY VARIABLE/STRUCTURE DEFINTIONS """
name = "Sean's Heart"
minHeartRate = 60
maxHeartRate = 180
timeCol = 0
signalCol = 1
windowSize = 13
mid = windowSize // 2
peakLog = []

""" DATA PREPPING """
sensorData = np.genfromtxt('sensor_data.csv', delimiter=',')
sensorData = np.delete(sensorData, (0), axis=0)
sensorData2 = np.genfromtxt('sensor_data2.csv', delimiter=',')
sensorData2 = np.delete(sensorData2, (0), axis=0)

"""
Test NUFFT
"""
heart = Heart(name, minHeartRate, maxHeartRate)

for i in range(len(sensorData2)//512):
    heart.FFT(sensorData2[i*512:(i+1)*512, 1])
    #heart.NUFFT(sensorData[i*512:(i+1)*512, 1])

""" SENSOR SIMULATION """
for i in range(windowSize, len(sensorData)-(windowSize-1)):
    # Grab the current 3-value window
    timeVals = sensorData[0:i, 0] if (i <= windowSize) else sensorData[i-windowSize:i, 0]
    signalVals = sensorData[0:i, 1] if (i <= windowSize) else sensorData[i-windowSize:i, 1]

    #print("time: " + str(timeVals))
    #print("signal: " + str(signalVals))

    #  Check for peak
    type = isMaxima(signalVals)
    status = ""
    if(type == "peak"):
        # print("Logging peak...")
        status = heart.addMaxima((timeVals[mid], signalVals[mid]), type)
        #print("Status: " + status)
    elif(type == "trough"):
        # print("Logging trough...")
        status = heart.addMaxima((timeVals[mid], signalVals[mid]), type)
        #print("Status: " + status)

    # Call API with 'status'
    # time.sleep(0.002)
