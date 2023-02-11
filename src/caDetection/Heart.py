## This class serves as a representation of a heart
# It will be passed points, where it will do signal processing
# It's first major use is to help determine if the signal being received is representative of cardiac data
# It will do this by ensuring that the data received is within proper ranges

from pynufft import NUFFT
import numpy as np
import matplotlib.pyplot as plt
import time
import statistics
import scipy.fftpack
import scipy.signal as signal

class Heart:

    def __init__(self, name, minHeartRate, maxHeartRate):
        self.name = name
        self.minHeartRate = minHeartRate
        self.maxHeartRate = maxHeartRate

        self.peakTimes = []
        self.peakValues = []
        self.troughTimes = []
        self.troughValues = []

        self.peakMeans = []
        self.troughMeans = []

        self.peakStdDevs = []
        self.troughStdDevs = []

        self.peakHealthy = []
        self.troughHealthy = []

        #self.fiveSecondMarks = []

    """
    CHECK FUNCTIONS
    """
    # Will be used to check for both peaks and troughs to ensure that they are both in proper ranges
    # Need to ensure that there is a 'tight' baseline
    # Need to ensure that new values that are added are within a healthy range of that baseline
    # Need to include metrics like
    def maximaAnalysis(self, type):
        # print("---------------------------------------")

        # Calculating and updating metrics
        if type == "peak":
            # Collecting baseline points
            if (len(self.peakTimes) <= 8):
                return "Calculating peak baseline (" + str(len(self.peakTimes)) + "/8), more maxima needed..."
            #Baseline acquired
            peakMean = statistics.mean(self.peakValues[:-1])
            peakStdDev = statistics.pstdev(self.peakValues[:-1])
            self.peakMeans.append(peakMean)
            self.peakStdDevs.append(peakStdDev)
            return "Healthy peak" if self.peakValues[-1] < (peakMean + peakStdDev) and self.peakValues[-1] > (peakMean - peakStdDev) else "Unhealthy peak."
        else:
            # Collecting baseline points
            if (len(self.troughTimes) <= 8):
                return "Calculating trough baseline (" + str(len(self.troughTimes)) + "/8), more minima needed..."
            #Baseline acquired
            troughMean = statistics.mean(self.troughValues[:-1])
            troughStdDev = statistics.pstdev(self.troughValues[:-1])
            self.troughMeans.append(troughMean)
            self.troughStdDevs.append(troughStdDev)
            return "Healthy peak" if self.troughValues[-1] < (troughMean + troughStdDev) and self.troughValues[-1] > (troughMean - troughStdDev) else "Unhealthy trough."

    """
    SIMPLE ADDER FUNCTIONS
    """
    # Adds the maximum to its respective variable
    def addMaxima(self, data, type):
        match type:
            case "peak":
                self.peakTimes.append(data[0])
                self.peakValues.append(data[1])
                return self.maximaAnalysis("peak")
            case "trough":
                self.troughTimes.append(data[0])
                self.troughValues.append(data[1])
                return self.maximaAnalysis("trough")
            case _:
                return "Invalid value type"


    #def addFiveSecondMark(self, data):
    #    self.fiveSecondMarks.append(data)

    def plotMaxima(self):
        peakMeans = np.array(self.peakMeans)
        peakStdDev = np.array(self.peakStdDevs)
        peakValues = np.array(self.peakValues)
        troughMeans = np.array(self.troughMeans)
        troughStdDev = np.array(self.troughStdDevs)
        troughValues = np.array(self.troughValues)
        peakUpperBounds = peakMeans + peakStdDev
        peakLowerBounds = peakMeans - peakStdDev
        troughUpperBounds = troughMeans + troughStdDev
        troughLowerBounds = troughMeans - troughStdDev


        plt.plot(peakMeans, 'g', peakLowerBounds, 'r', peakUpperBounds, 'r', peakValues, 'k', troughMeans, 'm', troughLowerBounds, 'c', troughUpperBounds, 'c', troughValues, 'b')
        plt.show()

    def low_pass_filter(self, data, cutoff, fs, order=5):
        nyquist = 0.5 * fs
        cutoff = cutoff / nyquist
        b, a = signal.butter(order, cutoff, 'lowpass')
        filtered_signal = signal.filtfilt(b, a, data)
        return filtered_signal

    """
    UNIFORM FOURIER TRANSFORM
    To be used on 10 second intervals to simulate incoming data
    " to appennd to the freqAverages for benchmarking
    """

    def FFT(self, data):
        # Low-pass filtering
        fs = 50  # Sample rate (Hz)
        cutoff = 3  # Cutoff frequency (Hz)
        order = 5  # Filter order
        data = self.low_pass_filter(data, cutoff, fs, order)
        # Normalizing the data
        data = data - np.mean(data)
        t = np.arange(0, 10.24, 0.02)
        # Trasnforming the data
        X = np.fft.fft(data)
        N = len(X)
        n = np.arange(N)
        T = N/50
        freq = n/T
        # Preparing for core-frequency-detection
        zipped = zip(freq, np.abs(X))
        zipped = list(zipped)
        # print(zipped)
        # Core frequency-detection
        highestFreq = 0
        highestVal = 0
        for i in range(len(zipped)):
            if zipped[i][0] > 0.5 and zipped[i][0] < 5.0:
                if zipped[i][1] > highestVal:
                    highestFreq = zipped[i][0]
                    highestVal = zipped[i][1]

        # At the end of the above loop, highestFreq will contain the strongest freq from the fourier transform
        print(highestFreq)
        print(str(60.0 * highestFreq) + " BPM")
        # Plotting
        # plt.figure(figsize = (12, 6))
        # plt.subplot(121)

        # plt.stem(freq, np.abs(X), 'b', \
        #         markerfmt=" ", basefmt="-b")
        # plt.xlabel('Freq (Hz)')
        # plt.ylabel('FFT Amplitude |X(freq)|')
        # plt.xlim(0.5, 10)

        # plt.subplot(122)
        # plt.plot(t, np.fft.ifft(X), 'r')
        # plt.xlabel('Time (s)')
        # plt.ylabel('Amplitude')
        # plt.tight_layout()
        # plt.show()

    """
    NON-UNIFORM DISCRETE FOURIER TRANSFORM
    To be used on 5 second intervals to simulate incoming data
    " to append to the freqAverages for benchmarking
    """

    # def NUFFT(self, data):
    #     data = data - np.mean(data)
    #     """
    #     Lin, Jyh-Miin.
    #     “Python Non-Uniform Fast Fourier Transform (PyNUFFT): An Accelerated Non-Cartesian MRI Package on a Heterogeneous Platform (CPU/GPU).”
    #     Journal of Imaging 4.3 (2018): 51.
    #     """
    #     nufftObj = NUFFT()
    #     om = np.random.randn(1512,1)
    #     Nd = (512,)
    #     Kd = (1024,)
    #     Jd = (12,)
    #     nufftObj.plan(om, Nd, Kd, Jd)

    #     plt.show()

    #     nufft_freq_data =nufftObj.forward(data)

    #     plt.figure(figsize = (12, 6))
    #     plt.subplot(121)
    #     plt.plot(om,np.absolute(nufft_freq_data), ".", label='abs')
    #     plt.xlabel('Freq (Hz)')
    #     plt.ylabel('NUFFT Amplitude |X(freq)|')
    #     plt.xlim(0.5, 5)

    #     plt.subplot(122)
    #     plt.plot(data,'r',label='original signal')
    #     plt.xlabel('Time (s)')
    #     plt.ylabel('Amplitude')
    #     plt.tight_layout()
    #     plt.show()

    #     plt.show()

    #     time.sleep(5)
