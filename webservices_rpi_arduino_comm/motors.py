'''
Raspberry Pi GPIO Status and Control for Ramudroid movement
'''

import time
import serial
ser = serial.Serial ("/dev/serial0")    #Open named port 
ser.baudrate = 115200                #Set baud rate to 9600 or 115200
# ser.writeTimeout = 0
# ser.timeout = 30
ser.bytesize = serial.EIGHTBITS
ser.parity = serial.PARITY_NONE
ser.stopbits = serial.STOPBITS_ONE
# ser.open()

from flask import Flask, render_template, request
from flask_cors import CORS, cross_origin

app = Flask(__name__, template_folder='templates')
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route("/")
def index():
	templateData = {
      	'title' 	: 'Motors output Status!',
      	'action'	: "none"
    }

	return render_template('index.html', **templateData)

@app.route("/move/<actiontype>")
@cross_origin()
def action(actiontype):
	print("action "+ actiontype)
	cmd = "0"
	if actiontype == 'stop':
		cmd = "1"
		print(" o stop ")
	elif actiontype == 'forward':
		cmd = "2"
		print(" ^ forward ")
	elif actiontype == 'back':
		cmd = "3"
		print(" v back ")
	elif actiontype == 'left':
		cmd = "4"
		print(" < left ")
	elif actiontype == 'right':
		cmd = "5"
		print(" > right ")
	elif actiontype == 'brushon':
		cmd = "6"
		print(" Brush On *** ")
	elif actiontype == 'brushoff':
		cmd = "7"
		print(" Brush Off ooo ")
	else:
   		print(" X unmatched")

	#cmd = cmd + '\r\n'
	time.sleep(1)
	# print("send  "+ ascii(cmd))
	ser.write(cmd.encode("ascii"))

	return "done"

if __name__ == "__main__":
   app.run(host='192.168.0.5', port=80, debug=True)
