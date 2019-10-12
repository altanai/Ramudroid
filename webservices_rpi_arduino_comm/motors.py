'''
Raspberry Pi GPIO Status and Control for Ramudroid movement
'''

import time
import serial
ser = serial.Serial ("/dev/ttyS0")    #Open named port 
ser.baudrate = 115200                   #Set baud rate to 9600 or 115200
ser.writeTimeout = 0
ser.timeout = 30
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

@app.route("/move/<actiontype>")
def action(actiontype):
	print(" ........... received input ")
	cmd = 0 
	if actiontype == 'stop':
		cmd = "1"
		print(" o stop ")
	elif actiontype == 'forward':
		cmd = "2"
		print(" ^ forward ")
	else:
   		print(" X unmatched")

	# cmd = cmd + '\r\n'
	time.sleep(5)
	ser.write(repr(cmd).encode('utf-8'))

	return "done"

if __name__ == "__main__":
   app.run(host='192.168.0.5', port=80, debug=True)