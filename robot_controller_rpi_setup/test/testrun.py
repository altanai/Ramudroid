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
#
# go straight
print("go straight")
ser.write("2".encode("ascii"))
time.sleep(5)
#
# # encounter garbage to pick
# print("encounter garbage to pick")
# ser.write("6".encode("ascii"))
# time.sleep(3)
# ser.write("7".encode("ascii"))
#
# # go straight
# print("go straight")
# time.sleep(5)

# avoid obstruction from right side
print("avoid obstruction from right side")
ser.write("5".encode("ascii"))
ser.write("2".encode("ascii"))
time.sleep(2)

# ser.write("4".encode("ascii"))
# ser.write("2".encode("ascii"))
# time.sleep(3)
#
# ser.write("4".encode("ascii"))
# ser.write("2".encode("ascii"))
# time.sleep(2)
#
# ser.write("5".encode("ascii"))
# ser.write("2".encode("ascii"))
#
# # go straight
# print("go straight")
# time.sleep(5)
#
# # encounter garbage to pick
# print("encounter garbage to pick")
# ser.write("6".encode("ascii"))
# time.sleep(3)
# ser.write("7".encode("ascii"))
#
# # go straight and stop
# print("go straight ans stop")
# time.sleep(5)
# ser.write("1".encode("ascii"))
