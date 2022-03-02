# camera capture 

Rapiberry Pi Camera Model and Setup 
- https://www.raspberrypi.com/documentation/computers/compute-module.html#attaching-a-raspberry-pi-camera-module

# WebRTC stream 


# Object Detection 

## Tensorflow Lite 

Tensorflow is an end-to-end open-source machine learning platform

Tensorflow Lite is the power optimized version of Tensorflow which is design to run on embedded/edge devices mobile phones, tablets, Raspberry PI. 
It does so using **Quantization**by converting the model weights and activations from a float 32 bit to an 8-bit integer. 
Tensorflow lite is composed of two packages:

- Interpreter: provides inference
- Converter: To convert a TensorFlow model post-training to TensorFlow lite using quantization. 

Tensorflow Lite can’t train models , can only convert existing models. 


## Google Coral USB

Google Coral USB is basically a computer chip, called the Edge TPU.
It is specialized in inferencing for object detection, reduding the time 
