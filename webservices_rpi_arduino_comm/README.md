# Python Flash Server 

install python flash framework 
```
sudo apt-get install python3-flask
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