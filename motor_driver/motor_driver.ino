// connect motor controller pins to Arduino digital pins
// motor one
int enA = 10;
int in1 = 9;
int in2 = 8;
// motor two
int enB = 5;
int in3 = 7;
int in4 = 6;
void setup()
{
  // set all the motor control pins to outputs
  pinMode(enA, OUTPUT);
  pinMode(enB, OUTPUT);
  pinMode(in1, OUTPUT);
  pinMode(in2, OUTPUT);
  pinMode(in3, OUTPUT);
  pinMode(in4, OUTPUT);

    // initialize serial communication at 9600 bits per second:
  Serial.begin(115200);
}
void backward()
{
  // this function will run the motors in bakward direction at a fixed speed
  // turn on motor A
  digitalWrite(in1, HIGH);
  digitalWrite(in2, LOW);
//  // set speed to 200 out of possible range 0~255
//  analogWrite(enA, 200);
  // turn on motor B
  digitalWrite(in3, HIGH);
  digitalWrite(in4, LOW);
//  // set speed to 200 out of possible range 0~255
//  analogWrite(enB, 200);

//  // now change motor directions
//  digitalWrite(in1, LOW);
//  digitalWrite(in2, HIGH); 
//  digitalWrite(in3, LOW);
//  digitalWrite(in4, HIGH);
//  delay(2000);
//  // now turn off motors
//  digitalWrite(in1, LOW);
//  digitalWrite(in2, LOW); 
//  digitalWrite(in3, LOW);
//  digitalWrite(in4, LOW);
}

void forward()
{
    // this function will run the motors in forward direction at a fixed speed
  // turn on motor A
  digitalWrite(in1, LOW);
  digitalWrite(in2, HIGH);

  // turn on motor B
  digitalWrite(in3, LOW);
  digitalWrite(in4, HIGH);
  
}

void right()
{
    // this function will run the motors in right direction at a fixed speed
  // turn on motor A
  digitalWrite(in1, HIGH);
  digitalWrite(in2, LOW);
//  // set speed to 200 out of possible range 0~255
//  analogWrite(enA, 200);
  // turn on motor B
  digitalWrite(in3, LOW);
  digitalWrite(in4, HIGH);
}

void left()
{
    // this function will run the motors in left direction at a fixed speed
  // turn on motor A
  digitalWrite(in1, LOW);
  digitalWrite(in2, HIGH);
//  // set speed to 200 out of possible range 0~255
//  analogWrite(enA, 200);
  // turn on motor B
  digitalWrite(in3, HIGH);
  digitalWrite(in4, LOW);
}

void halt()
{
    // this function stop the motors
  // turn off motor A
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

//void demoTwo()
//{
//  // this function will run the motors across the range of possible speeds
//  // note that maximum speed is determined by the motor itself and the operating voltage
//  // the PWM values sent by analogWrite() are fractions of the maximum speed possible
//  // by your hardware
//  // turn on motors
//  digitalWrite(in1, LOW);
//  digitalWrite(in2, HIGH); 
//  digitalWrite(in3, LOW);
//  digitalWrite(in4, HIGH);
//  // accelerate from zero to maximum speed
// 
// for (int i = 0; i < 256; i++) {
//analogWrite(enA, i);
//analogWrite(enB, i);
//delay(20);
//}
//// decelerate from maximum speed to zero
//for (int i = 255; i > 0; --i)
//  {
//    analogWrite(enA, i);
//    analogWrite(enB, i);
//    delay(20);
//  }
// 
//  
//  // now turn off motors
//  digitalWrite(in1, LOW);
//  digitalWrite(in2, LOW); 
//  digitalWrite(in3, LOW);
//  digitalWrite(in4, LOW); 
//}


void loop()
{
  speed(3);
  forward();
  delay(5000);
  backward();
  delay(5000);
  left();
  delay(5000);
  right();
  delay(5000);

}    
