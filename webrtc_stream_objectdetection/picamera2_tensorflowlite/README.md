# Tensorflow installation 



**Issue 1** Version outdated error on tensorflow
	
	ImportError: This version of TensorFlow Datasets requires TensorFlow version >= 2.1.0; Detected an installation of version 1.14.0. Please upgrade TensorFlow to proceed.

**solution**

	python3 -m  pip install "tensorflow>=2.0.0"  --user

Then start 

	python -m notebook

## References 

- https://github.com/raspberrypi/picamera2/tree/main/examples/tensorflow

- https://www.digikey.com/en/maker/projects/how-to-perform-object-detection-with-tensorflow-lite-on-raspberry-pi/b929e1519c7c43d5b2c6f89984883588