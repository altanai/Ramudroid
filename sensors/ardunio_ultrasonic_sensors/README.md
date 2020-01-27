# Ultrasonic Sensor HC – SR04

Ultrasonic Transmitter and Receiver module 
uses sonar to determine distance 
non-contact range detection with high accuracy and stable readings

distance = (traveltime/2) x speed of sound

The speed of sound is: 343m/s = 0.0343 cm/uS = 1/29.1 cm/uS

## Features 

Power Supply :+5V DC
Quiescent Current : <2mA
Working Current: 15mA
Effectual Angle: <15°
Ranging Distance : 2cm – 400 cm/1″ – 13ft
Resolution : 0.3 cm
Measuring Angle: 30 degree
Trigger Input Pulse width: 10uS
Dimension: 45mm x 20mm x 15mm

## Pins 

VCC: +5VDC
Trig : Trigger (INPUT)
Echo: Echo (OUTPUT)
GND: GND

## NewPing Lib 

Works with many different ultrasonic sensor models: SR04, SRF05, SRF06, DYP-ME007 & Parallax PING)))™

Constructor 
```
NewPing sonar(trigger_pin, echo_pin [, max_cm_distance]);
```
Functions 

sonar.ping();
Send a ping, returns the echo time in microseconds or 0 (zero) if no ping echo within set distance limit

sonar.ping_in(); 
Send a ping, returns the distance in inches or 0 (zero) if no ping echo within set distance limit

sonar.ping_cm(); 
Send a ping, returns the distance in centimeters or 0 (zero) if no ping echo within set distance limit

sonar.ping_median(iterations); 
Do multiple pings (default=5), discard out of range pings and return median in microseconds

sonar.convert_in(echoTime); 
Converts microseconds to distance in inches

sonar.convert_cm(echoTime); 
Converts microseconds to distance in centimeters

sonar.ping_timer(function); 
Send a ping and call function to test if ping is complete.

sonar.check_timer(); 
Check if ping has returned within the set distance limit.

timer_us(frequency, function); 
Call function every frequency microseconds.

timer_ms(frequency, function); 
Call function every frequency milliseconds.

timer_stop(); 
Stop the timer.

Ref :
https://playground.arduino.cc/Code/NewPing/
