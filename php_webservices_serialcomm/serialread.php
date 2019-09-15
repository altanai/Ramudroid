

arduino = serial.Serial('/dev/ttyS0',
                     baudrate=115200,
                     bytesize=serial.EIGHTBITS,
                     parity=serial.PARITY_NONE,
                     stopbits=serial.STOPBITS_ONE,
                     timeout=1,
                     xonxoff=0,
                     rtscts=0
                     )
# Toggle DTR to reset Arduino
arduino.setDTR(False)
sleep(1)

arduino.flushInput()
arduino.setDTR(True)

with arduino:
    while True:
     
        print(arduino.readline())

