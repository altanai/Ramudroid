# Robot's Micrcontroller 

Using arduino Uno microcontroller board on ATmega328

**Why shoudl we control DC motors using Arduino ?**
Raspbian is not fit for real-time operations since program cannot be run strictly routinely based on the same clock cycle.
MCU such as Arduno maintains clock cycle precision.


## controlling motors using arduino 

Arduino will generate a PWM ( pulse width modulation) signal that will control the speed of the motor by simply controlling the input voltage to the motor


