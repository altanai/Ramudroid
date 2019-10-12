import serial
import time
 
s = serial.Serial('/dev/ttyAMA0', 115200) # change name, if needed
s.open()
time.sleep(5) # the Arduino is reset after enabling the serial connectio, therefore we have to wait some seconds
 
s.write("test")
try:
    while True:
        response = s.readline()
        print(response)
except KeyboardInterrupt:
    s.close()