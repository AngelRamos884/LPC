#include <Wire.h>
#include "MAX30105.h"
 #include <ESP8266WiFi.h>
#include "heartRate.h"
//Configuraciones del wifi
//const char* ssid = "Test";
//const char* password = "root1234";
const char* ssid = "Linksys07009";
const char* password = "fidyzns1w3";
const char* WS_server = "192.168.1.114";

int serverPort=8080;
const char* room = "room_1";
const char* createdBy = "user_1";
MAX30105 particleSensor;
 WiFiClient client;
const byte RATE_SIZE = 4; //Increase this for more averaging. 4 is good.
byte rates[RATE_SIZE]; //Array of heart rates
byte rateSpot = 0;
long lastBeat = 0; //Time at which the last beat occurred
 
float beatsPerMinute;
int beatAvg;


void setup_wifi() {

  //delay(10);
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }


  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}


void setup() {
  pinMode(BUILTIN_LED, OUTPUT);     // Initialize the BUILTIN_LED pin as an output
  Serial.begin(115200);
  setup_wifi();
  
  //Inicializar conf de pulso
  // Initialize sensor
if (!particleSensor.begin(Wire, I2C_SPEED_FAST)) //Use default I2C port, 400kHz speed
{
Serial.println("MAX30105 was not found. Please check wiring/power. ");
while (1);
}
Serial.println("Place your index finger on the sensor with steady pressure.");
 
particleSensor.setup(); //Configure sensor with default settings
particleSensor.setPulseAmplitudeRed(0x0A); //Turn Red LED to low to indicate sensor is running
particleSensor.setPulseAmplitudeGreen(0); //Turn off Green LED

  
}

void loop() {
 
    
  long irValue = particleSensor.getIR();
 
  if (checkForBeat(irValue) == true)
  {
    //We sensed a beat!
    long delta = millis() - lastBeat;
    lastBeat = millis();
     
    beatsPerMinute = 60 / (delta / 1000.0);
 
    if (beatsPerMinute < 255 && beatsPerMinute > 20)
      {
        rates[rateSpot++] = (byte)beatsPerMinute; //Store this reading in the array
        rateSpot %= RATE_SIZE; //Wrap variable
         
        //Take average of readings
        beatAvg = 0;
        for (byte x = 0 ; x < RATE_SIZE ; x++)
        beatAvg += rates[x];
        beatAvg /= RATE_SIZE;
      }
  }
 
      Serial.print("IR=");
      Serial.print(irValue);
      Serial.print(", BPM=");
      Serial.print(beatsPerMinute);
      Serial.print(", Avg BPM=");
      Serial.print(beatAvg);
 
      if (irValue < 50000){
      Serial.print(" No finger?");
      
      Serial.println();
      }
      else{
        if(beatAvg > 1){
   client.connect(WS_server, serverPort);
   
   client.setNoDelay(.1);
    String json = "{\"pulse\" :"+ String(beatAvg)+ ", \"createdBy\" : "+String(createdBy)+ ", \"room\" : "+String(room)+"}";
    Serial.println(json);
    client.println(json); 
    client.flush();
    client.stop();
//    delay(10);
        }
        else  Serial.println("Pulso muy bajo");
      }
     //delay(2000);
  
}
