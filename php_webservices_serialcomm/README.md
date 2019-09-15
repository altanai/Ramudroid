# PHP webservices server and communication to Arduino over serial 

start php server 
```
php -S localhost:8000
```

see ttyUSB comm report
```
cat /dev/ttyUSB0 > /var/www/m2m/rpiramudroid/capturefile
```