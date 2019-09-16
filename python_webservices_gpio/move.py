'''
Raspberry Pi GPIO Status and Control for Ramudroid movement
'''
import RPi.GPIO as GPIO
from flask import Flask, render_template, request
app = Flask(__name__)
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

#define actuators GPIOs
rstop = 21
rforward = 22
rback = 23
rleft = 24
rright = 25

#initialize GPIO status variables
rstopSts = 0
rforwardSts = 0
rbackSts = 0
rleftSts = 0
rrightSts = 0

# Define all pins as output
GPIO.setup(rstop, GPIO.OUT)   
GPIO.setup(rforward, GPIO.OUT) 
GPIO.setup(rback, GPIO.OUT) 
GPIO.setup(rleft, GPIO.OUT) 
GPIO.setup(rright, GPIO.OUT) 

# turn all OFF 
GPIO.output(rstop, GPIO.LOW)
GPIO.output(rforward, GPIO.LOW)
GPIO.output(rback, GPIO.LOW)
GPIO.output(rleft, GPIO.LOW)
GPIO.output(rright, GPIO.LOW)

@app.route("/")
def index():
	# Read Sensors Status
	rstopSts = GPIO.input(rstop)
	rforwardSts = GPIO.input(rforward)
	rbackSts = GPIO.input(rback)
	rleftSts = GPIO.input(rleft)
	rrightsts = GPIO.input(rright)

	templateData = {
              	'title' 	: 'GPIO output Status!',
              	'rstop'  	: rstopSts,
              	'rforward'  : rforwardSts,
              	'rback'  	: rbackSts,
				'rleft'  	: rleftSts,
                'rright'  	: rrightSts
        }

	return render_template('index.html', **templateData)
	
@app.route("/<rtype>/<action>")
def action(rtype, action):
	if rtype == 'rstop':
		actuator = rstop
	if rtype == 'rforward':
		actuator = rforward
	if rtype == 'rback':
		actuator = rback
	if rtype == 'rleft':
   		actuator = rleft
	if rtype == 'rright':
		actuator = rright

	if action == "on":
		GPIO.output(actuator, GPIO.HIGH)
	if action == "off":
		GPIO.output(actuator, GPIO.LOW)
		     
	rstopSts 	= GPIO.input(rstop)
	rforwardSts = GPIO.input(rforward)
	rbackSts 	= GPIO.input(rback)
	rleftSts 	= GPIO.input(rback)
	rrightSts 	= GPIO.input(rback)

	templateData = {
              	'title' 	: 'GPIO output Status!',
              	'rstop'  	: rstopSts,
              	'rforward'  : rforwardSts,
              	'rback'  	: rbackSts,
				'rleft'  	: rleftSts,
                'rright'  	: rrightSts
        }

	return render_template('index.html', **templateData)

if __name__ == "__main__":
   app.run(host='0.0.0.0', port=80, debug=True)