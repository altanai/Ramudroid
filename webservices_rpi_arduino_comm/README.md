# Python Flash Server 

Ramudroid Exposes webservices for outside world include web console 
Webservices are translated to 
- SPI commands to be shared with Arduino to manually control driving unit  or 
- GPIO pins to control cleaning unit 

## Setup
Install dependencies
```
pip install -r requirements.tx
```
or manually install required libs like for install python flash framework 
```
sudo apt-get install python3-flask
```
or RPIO
```
pip install RPi.GPIO
```

## Run 

$ export FLASK_APP=move.py
$ export FLASK_ENV=production

```
$ env FLASK_ENV=development FLASK_APP=move.py flask run
 * Serving Flask app "move.py" (lazy loading)
 * Environment: development
 * Debug mode: on
 * Running on http://127.0.0.1:5000/ (Press CTRL+C to quit)
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 293-266-999

```

## Debugging 

**Issue1** git clone git@github.com:altanai/Ramudroid.git
Cloning into 'Ramudroid'...
git@github.com: Permission denied (publickey).
fatal: Could not read from remote repository.
Please make sure you have the correct access rights
and the repository exists.
**solution** Looks inside the .ssh folder do u see prov and pub key , if not then generate one
```
pi@raspberrypi:~ $ ssh-keygen
Generating public/private rsa key pair.
Enter file in which to save the key (/home/pi/.ssh/id_rsa): 
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
Your identification has been saved in /home/pi/.ssh/id_rsa.
Your public key has been saved in /home/pi/.ssh/id_rsa.pub.
The key fingerprint is:
SHA256:AnVGnPAXJrh4k1XZyX9kVRJGKZ5p9j5rs8DbmwxU1HI pi@raspberrypi
The key's randomart image is:
+---[RSA 2048]----+
|      o==o++ o*+=|
|     ..++o..=oo.E|
|    .. +. .. =.= |
|    ..=  .  *.. .|
|     ...S  o.. . |
|       .   o  .  |
|            +.   |
|             *=. |
|            ..B* |
+----[SHA256]-----+
```
now the folder should have prov and pub keys like 
```
pi@raspberrypi:~ $ ls ~/.ssh
id_rsa  id_rsa.pub  known_hosts
```
Now add the key to github projects "deploy Keys" such as https://github.com/altanai/Ramudroid/settings/keys 
(only owner can this)

**Issue2** Could not open a connection to your authentication agent.
**solution** start the evl agent and add key 
```
pi@raspberrypi:~ $  eval "$(ssh-agent -s)"   
Agent pid 943
pi@raspberrypi:~ $ ssh-add ~/.ssh/id_rsa
Identity added: /home/pi/.ssh/id_rsa (pi@raspberrypi)
```

**Issue3**  * Serving Flask app "move" (lazy loading)
 * Environment: production
   WARNING: Do not use the development server in a production environment.