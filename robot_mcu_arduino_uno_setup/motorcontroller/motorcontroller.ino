// connect motor controller pins to Arduino digital pins
// motor one
int enA = 10;
int in1 = 9;
int in2 = 8;
// motor two
int enB = 5;
int in3 = 7;
int in4 = 6;
int brh = 2 ;

  
void setup()
{
  // set all the motor control pins to outputs
  pinMode(enA, OUTPUT);
  pinMode(enB, OUTPUT);
  pinMode(in1, OUTPUT);
  pinMode(in2, OUTPUT);
  pinMode(in3, OUTPUT);
  pinMode(in4, OUTPUT);
  pinMode(brh, OUTPUT);

    // initialize serial communication at 9600 bits per second:
  Serial.begin(115200);
  digitalWrite(enA, HIGH);
  digitalWrite(enB, HIGH);
  digitalWrite(brh,HIGH);

}
void backward()
{
  // this function will run the motors in bakward direction at a fixed speed
  // turn on motor A
  Serial.println("back");
  digitalWrite(in1, HIGH);
  digitalWrite(in2, LOW);

  // turn on motor B
  digitalWrite(in3, HIGH);
  digitalWrite(in4, LOW);
}

void forward()
{
    // this function will run the motors in forward direction at a fixed speed
  // turn on motor A
//  Serial.println("forward");
  digitalWrite(in1, LOW);
  digitalWrite(in2, HIGH);
  // turn on motor B
  digitalWrite(in3, LOW);
  digitalWrite(in4, HIGH);
}

void right()
{
    // this function will run the motors in right direction at a fixed speed
  //  Serial.println("right");
  digitalWrite(in1, HIGH);
  digitalWrite(in2, LOW);
  digitalWrite(in3, LOW);
  digitalWrite(in4, HIGH);
}

void left()
{
    // this function will run the motors in left direction at a fixed speed
    //Serial.println("left");
  digitalWrite(in1, LOW);
  digitalWrite(in2, HIGH);
  digitalWrite(in3, HIGH);
  digitalWrite(in4, LOW);
}

void halt()
{
    // this function stop the motors
  // turn off motor 
  //Serial.println("stop");
  digitalWrite(in1, LOW);
  digitalWrite(in2, LOW);
  // turn off motor B
  digitalWrite(in3, LOW);
  digitalWrite(in4, LOW);
}


void speed(int velocity)
{
  if(velocity == 1)
    {  
        // set speed to 200 out of possible range 0~255
      analogWrite(enA, 80);
        // set speed to 200 out of possible range 0~255
      analogWrite(enB, 200);
    }
  if(velocity == 2)
      {
       // set speed to 200 out of possible range 0~255
        analogWrite(enA, 70);
      // set speed to 200 out of possible range 0~255
      analogWrite(enB, 160);
      }

   if(velocity == 3)
      {
       // set speed to 200 out of possible range 0~255
        analogWrite(enA, 52);
      // set speed to 200 out of possible range 0~255
      analogWrite(enB, 120);
      }
}

void serialRead(void)
{
  int incomingByte;
    if (Serial.available() > 0) {
    // read the incoming byte:
    incomingByte = Serial.read();

    Serial.println(incomingByte);
    switch(incomingByte)
    {
      case 50:
        forward();
        break;
      case 51:
        backward();
        break;
      case 52:
        left();
        break;
      case 53:
        right();
        break;
      case 49:
        halt();
        break;
      case 54:
        digitalWrite(brh,LOW);
        break;
      case 55:
        digitalWrite(brh,HIGH);
        break;
      default:
        halt();
     }
    }
}
void loop()
{ 
  serialRead();
 
}    
