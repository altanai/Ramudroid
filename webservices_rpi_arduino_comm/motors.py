'''
Raspberry Pi GPIO Status and Control for Ramudroid movement
'''
import RPi.GPIO as GPIO

import serial
ser = serial.Serial ("/dev/ttyAMA0")    #Open named port 
ser.baudrate = 115200                   #Set baud rate to 9600

from flask import Flask, render_template, request
app = Flask(__name__, template_folder='templates')

@app.route("/")
def index():

	templateData = {
              	'title' 	: 'Motors output Status!',
              	'action'	: "none"
        }

	return render_template('index.html', **templateData)

@app.route("/stop")
def stop():
	ser.write('1')
	#ser.close()
	templateData = {
              	'title' 	: 'GPIO output Status!',
              	'action'  	: 'stop',
        }

	return render_template('index.html', **templateData)

@app.route("/forward")
def stop():
	ser.write('2')
	#ser.close()
	templateData = {
              	'title' 	: 'GPIO output Status!',
              	'action'  	: 'forward',
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