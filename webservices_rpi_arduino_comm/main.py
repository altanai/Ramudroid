'''
Raspberry Pi GPIO Status and Control for Ramudroid movement
'''
import time
import sys
print(sys.path)
import serial
ser = serial.Serial ("/dev/serial0")    #Open named port 
ser.baudrate = 115200                   #Set baud rate to 38400, 57600, 9600, 115200
# ser.timeout = 0.1  # Read timeout in seconds
# ser.write_timeout = 0.1  # Write timeout in seconds
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
	try:
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

		# cmd = cmd + '\r\n'
		# time.sleep(1)
		ser.write(cmd.encode("ascii"))
	except Exception as e:
		print('Motor Communication error...:' + str(e))
	return "done"

if __name__ == "__main__":
   app.run(host='0.0.0.0', port=80, debug=True)