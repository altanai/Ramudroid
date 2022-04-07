# Self Driving/ Autonomous RPI Robot - Ramudroid

On device models for self driving due to 
- low Latency (Response time/Internet Speed)
- quick response ( edge) 

## Hardware
- Remote Control robot ( parts from RC Car)
- Raspberry Pi
- PI Camera Module
- L298N Dual Motor Controller
- External Battery
- 4x AA batteries

## Software 

- Node-red
- Tensorflow with Keras
- PiCamera libraries
- OpenCV


    pip install opencv-python

training.py :  save the camera frames and gpio status in csv as training data.
The images are from camera and csv from node red.
node red - controls the GPIO pins ( high / low )

- self driving : training of ANN(Artificial Neural Network) model 
outputs - training model (.h5 file) as the output in 

model-interaction.py : uses the model(.h5 file) and interact with the GPIO's and PI Camera's realtime feed.  To be excuted inside of RPI

**Refernces**
- https://github.com/dctian/DeepPiCar
- https://github.com/rodrigocava/mrrobot/
- https://github.com/RyanZotti/Self-Driving-Car
- https://projects.raspberrypi.org/en/projects/getting-started-with-picamera
- https://images.nvidia.com/content/tegra/automotive/images/2016/solutions/pdf/end-to-end-dl-using-px.pdf