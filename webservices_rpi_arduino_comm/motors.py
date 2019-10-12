'''
Raspberry Pi GPIO Status and Control for Ramudroid movement
'''

import time
import serial
ser = serial.Serial ("/dev/ttyAMA0")    #Open named port 
ser.baudrate = 115200                   #Set baud rate to 9600 or 115200
ser.timeout = 1
ser.bytesize = serial.EIGHTBITS
ser.parity = serial.PARITY_NONE
ser.stopbits = serial.STOPBITS_ONE
# ser.open()

from flask import Flask, render_template, request
app = Flask(__name__, template_folder='templates')

@app.route("/")
def index():

	templateData = {
      	'title' 	: 'Motors output Status!',
      	'action'	: "none"
    }

	return render_template('index.html', **templateData)

@app.route("/<action>")
def action(cmd):

	if action == 'stop':
		cmd = "1"
		print(" o stop ")
	if action == 'forward':
		cmd = "2"
		print(" ^ forward ")

	time.sleep(5)
	ser.write(cmd.encode()) 
	#ser.close()
	templateData = {
      	'title' 	: 'GPIO output Status!',
      	'action'  	: action
    }

	return render_template('index.html', **templateData)

# @app.route("/<rtype>/<action>")
# def action(rtype, action):
# 	if rtype == 'rstop':
# 		actuator = rstop
# 	if rtype == 'rforward':
# 		actuator = rforward
# 	if rtype == 'rback':
# 		actuator = rback
# 	if rtype == 'rleft':
#    		actuator = rleft
# 	if rtype == 'rright':
# 		actuator = rright

# 	if action == "on":
# 		GPIO.output(actuator, GPIO.HIGH)
# 	if action == "off":
# 		GPIO.output(actuator, GPIO.LOW)
		     
# 	rstopSts 	= GPIO.input(rstop)
# 	rforwardSts = GPIO.input(rforward)
# 	rbackSts 	= GPIO.input(rback)
# 	rleftSts 	= GPIO.input(rback)
# 	rrightSts 	= GPIO.input(rback)

# 	templateData = {
#               	'title' 	: 'GPIO output Status!',
#               	'rstop'  	: rstopSts,
#               	'rforward'  : rforwardSts,
#               	'rback'  	: rbackSts,
# 				'rleft'  	: rleftSts,
#                 'rright'  	: rrightSts
#         }

# 	return render_template('index.html', **templateData)

if __name__ == "__main__":
   app.run(host='192.168.0.5', port=80, debug=True)