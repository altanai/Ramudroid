import time
import serial
ser = serial.Serial ("/dev/serial0")    # Open named port
ser.baudrate = 115200                   # Set baud rate to 38400, 57600, 9600, 115200
# ser.timeout = 0.1  # Read timeout in seconds
# ser.write_timeout = 0.1  # Write timeout in seconds
ser.bytesize = serial.EIGHTBITS
ser.parity = serial.PARITY_NONE
ser.stopbits = serial.STOPBITS_ONE
# ser.open()

## command dictionary
# 1 - stop
# 2 - forward
# 3 - back
# 4 - left
# 5 - right
# 6 - brush on
# 7 - brush off

class Ramudroid:
    def __init__(robject, mode, version):
        robject.mode = mode
        robject.version = version

    def moveForward(self,t):
        print("go straight")
        ser.write("2".encode("ascii"))
        time.sleep(t)
        ser.write("1".encode("ascii"))

    def moveBackward(self, t):
        print("go backward")
        ser.write("3".encode("ascii"))
        time.sleep(t)
        ser.write("1".encode("ascii"))

    def stop(self,t):
        print("stop")
        ser.write("1".encode("ascii"))
        time.sleep(t)

    def turnRight(self,t):
        print("go right")
        ser.write("5".encode("ascii"))
        time.sleep(t)
        ser.write("1".encode("ascii"))

    def turnLeft(self, t):
        print("go left")
        ser.write("4".encode("ascii"))
        time.sleep(t)
        ser.write("1".encode("ascii"))

    def brushOn(self, t):
        print("brush on")
        ser.write("6".encode("ascii"))
        time.sleep(t)
        ser.write("1".encode("ascii"))

    def brushOff(self, t):
        print("brush off")
        ser.write("7".encode("ascii"))
        time.sleep(t)
        ser.write("1".encode("ascii"))

    def commander(self, action, t):
        return {
            'forward': self.moveForward(t),
            'backward': self.moveBackward(t),
            'right': self.turnRight(t),
            'left': self.turnLeft(t),
            'stop': self.stop(t),
            'brushOn' : self.brushOn(t),
            'brushOff': self.brushOff(t)
        }[action]

rdroid = Ramudroid("debug", 7)

rdroid.commander("brushOn",4)
rdroid.commander("brushOff",4)

# rdroid.commander("backward",4)
# rdroid.commander("right",4)
# rdroid.commander("forward",4)

# rdroid.stop(1)