## Light sensors 
detects light and creates a voltage difference. 
Types
 - Photoresistor , type of resistor whose resistance varies with change in light intensity
 - Photovoltaic cells , convert solar radiation into electrical energy
 - Phototubes
 - Phototransistors, 
 - CCD’s 

## Sound Sensor
detects sound and returns a voltage proportional to the sound level. robot can be designed to navigate based on the sound it receives. Complex implementation can further extend to speech and voice recognition using the  microphone
The small coltage diff reeived by sound sensors usually needs to be amplified to generate measurable voltage change.

## Temperature SensorTemperature Sensors
Tiny temperature sensor ICs provide voltage difference for a change in temperature. 
some ICs
- LM34
- LM35
- TMP35
- TMP36
- TMP37.

## Contact Sensor
require physical contact against other objects to trigger like 
Types 
- push button switch
- tactile bumper switch 
- Limit Switch , mostly used for obstacle avoidance robots. When these switches hit an obstacle, it triggers the robot to do a task, which can be reversing, turning, switching on a LED, Stopping etc. There are also capacitive contact sensors which react only to human touch
- Touch screen , Smart phones available these days use capacitive touch sensors. 

## Proximity Sensor
detect the presence of a nearby object within a given distance, without any physical contact. 
A transmitter transmits an electromagnetic radiation or creates an electrostatic field and a receiver receives and analyzes the return signal for interruptions. 

- Infrared (IR) Transceivers: IR LED transmits a beam of IR light and if it finds an obstacle, the light is simply reflected back which is captured by an IR receiver.
- Ultrasonic Sensor: generate high frequency sound waves; the received echo suggests an object interruption.
- Photoresistor: When an object comes in close proximity to the sensor, the amount of light changes which in turn changes the resistance of the Photoresistor. 
- Capacitive Proximity sensors : detects change in capacitance around it. 
- Inductive proximity sensor detects objects and distance through the use of induced magnetic field.

## Distance Sensor
- Ultrasonic Distance Sensors: The sensor emits an ultrasonic pulse and is captured by a receiver. Since the speed of sound is almost constant in air, which is 344m/s, the time between send and receive is calculated to give the distance between your robot and the obstacle. especially useful for underwater robots.
- Infrared Distance sensor: IR circuits are designed on triangulation principle for distance measurement. A transmitter sends a pulse of IR signals which is detected by the receiver if there is an obstacle and based on the angle the signal is received, distance is calculated. 
- Laser range Sensor: Laser light is transmitted and the reflected light is captured and analyzed. Distance is measured by calculating the speed of light and time taken for the light to reflect back to the receiver. useful for longer distances.
- Encoders:  convert angular position of a shaft or wheel into an analog or digital code.
- Stereo Camera: 2 cameras placed adjacent to each other can provide depth information using its stereo vision. Processing the data received from a camera is difficult for a robot with minimal processing power and memory. 
- There are other stretch and bend sensors which are also capable of measuring distance. But, their range is so limited that they are almost useless for mobile robots.

## Pressure Sensors
Tactile pressure sensors are useful in robotics as they are sensitive to touch, force and pressure.
Example - to design a robot hand we need to measure the amount of grip and pressure required to hold an object

## Tilt Sensors
Tilt sensors measure tilt of an object. In a typical analog tilt sensor, a small amount of mercury is suspended in a glass bulb. When mercury flows towards one end, it closes a switch which suggests a tilt.

## Navigation / Positioning Sensors
approximate the position of a robot, some for indoor positioning and few others for outdoor positioning.
- GPS (Global Positioning System): Satellites orbiting our earth transmit signals and a receiver on a robot acquires these signals and processes it. The processed information can be used to determine the approximate position and velocity of a robot. These GPS systems are extremely helpful for outdoor robots, but fail indoors.
- Digital Magnetic Compass: Similar to a handheld magnetic compass, Digital Magnetic compass provides directional measurements using the earth’s magnetic field which guides your robot in the right direction to reach its destination.  
- Localization: refers to the task of automatically determining the location of a robot in complex environment. Localization is based on external elements called landmarks which can be either artificially placed landmarks, or natural landmark. In the first approach, artificial landmarks or beacons are placed around the robot, and a robot’s sensor captures these signals to determine its exact location. Natural landmarks can be doors, windows, walls, etc. which are sensed by a robots sensor / vision system (Camera). Localization can be achieved using beacons which generate Wi-Fi, Bluetooth, Ultrasound, Infrared, Radio transmissions, Visible Light, or any similar signal.
- Acceleration Sensor: measures acceleration and tilt. There are two kinds of forces which can affect an accelerometer: Static force and Dynamic Force . 
	-- Static Force: Static force is the frictional force between any two objects. For example earth’s gravitational force is static which pulls an object towards it. Measuring this gravitational force can tell you how much your robot is tilting. This measurement is exceptionally useful in a balancing robot, or to tell you if your robot is driving uphill or on a flat surface.
	-- Dynamic force: Dynamic force is the amount of acceleration required to move an object. Measuring this dynamic force using an accelerometer tells you the velocity/speed at which your robot is moving. We can also measure vibration of a robot using an accelerometer, if in any case you need to.
Accelerometer comes in different flavors. Always select the one which is most appropriate for your robot. Some of the factors which you need to consider before selecting an accelerometer are:
Output Type: Analog or Digital
Number of Axis: 1,2 or 3
Accelerometer Swing: ±1.5g, ±2g, ±4g, ±8g, ±16g
Sensitivity: Higher or Lower (Higher the better)
Bandwidth
- Gyroscope : device which measures and helps maintain orientation using the principle of angular momentum.measure the rate of rotation around a particular axis. Gyroscope is especially useful when you want your robot to not depend on earth’s gravity for maintaining Orientation. (Unlike accelerometer)

## IMU
Inertial Measurement Units combine properties of two or more sensors such as Accelerometer, Gyro, Magnetometer, etc, to measure orientation, velocity and gravitational forces. 
capable of providing feedback by detecting changes in an objects orientation (pitch, roll and yaw), velocity and gravitational forces. Few IMUs go a step further and combine a GPS device providing positional feedback.

## Voltage Sensors
convert lower voltages to higher voltages, or vice versa.  
example : general Operational-Amplifier (Op-Amp) which accepts a low voltage, amplifies it, and generates a higher voltage output. 
Few voltage sensors are used to find the potential difference between two ends (Voltage Comparator). Even a simple LED can act as a voltage sensor which can detect a voltage difference and light up.

## Current Sensors
electronic circuits which monitor the current flow in a circuit and output either a proportional voltage or a current. Most current sensors output an analog voltage between 0V to 5V which can be processed further using a microcontroller.

## Humidity Sensors measures Humidity

## Gas sensors are designed to detect particular gases (detects gas leaks) 

## Potentiometers 

## Magnetic Field Sensors detect the strength of magnetic field around it.
