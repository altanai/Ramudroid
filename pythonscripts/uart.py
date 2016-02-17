import serial
ser = serial.Serial ("/dev/ttyAMA0")    #Open named port 
ser.baudrate = 115200                     #Set baud rate to 9600
#data = ser.read(10)                     #Read ten characters from serial port to data
ser.write(ser.read(1))                         #Send back the received data
ser.write('A')
ser.write('B')
#ser.close()        
