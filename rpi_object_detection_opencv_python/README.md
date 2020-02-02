# OpenCv python usuage for self driving robot

Although opencv is written in C++, we are using python lib bundle and program to have it compatible with other parts of 
robot's functioning such as communication with serail comm /dev/ttyAMA0 , which sends motor control commands to Arduino.




## check opencv installaion 

```python
import cv2
print(cv2.__version__)
```

## Debugging help 

**issue 1** 
```
build/CMakeFiles/CMakeTmp/CheckIncludeFile.c:1:10: fatal error: sys/videoio.h: No such file or directory
 #include <sys/videoio.h>
          ^~~~~~~~~~~~~~~
compilation terminated. 
```
**Solution** 

