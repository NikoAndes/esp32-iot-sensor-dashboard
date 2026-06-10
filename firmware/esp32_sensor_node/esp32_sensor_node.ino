/*
 * ESP32 IoT Sensor Node
 * Author: Nicolas Isaza Sierra (NikoAndes)
 * Simulates temperature and humidity sensor data.
 * Outputs JSON via Serial every 2 seconds.
 * Structured for DHT22/BMP280 integration.
 */

#include <Arduino.h>

#define SERIAL_BAUD   115200
#define READ_INTERVAL 2000

float temperature   = 0.0;
float humidity      = 0.0;
String deviceStatus = "OK";
int readingCount    = 0;
unsigned long lastReadTime = 0;

float simulateTemperature() {
  return 24.0 + ((float)random(-300, 300)) / 100.0;
}

float simulateHumidity() {
  return 60.0 + ((float)random(-1000, 1000)) / 100.0;
}

String getStatus(float temp, float hum) {
  if (temp > 33.0) return "WARN_TEMP_HIGH";
  if (temp < 19.0) return "WARN_TEMP_LOW";
  if (hum  > 78.0) return "WARN_HUM_HIGH";
  if (hum  < 42.0) return "WARN_HUM_LOW";
  return "OK";
}

void printJSON(float temp, float hum, String status) {
  Serial.print("{\"temperature\":");
  Serial.print(temp, 1);
  Serial.print(",\"humidity\":");
  Serial.print(hum, 1);
  Serial.print(",\"status\":\"");
  Serial.print(status);
  Serial.print("\",\"reading\":");
  Serial.print(readingCount);
  Serial.println("}");
}

void setup() {
  Serial.begin(SERIAL_BAUD);
  randomSeed(analogRead(0));
  delay(500);
  Serial.println("[INFO] ESP32 IoT Sensor Node started");
  Serial.println("[INFO] Mode: Simulated data - connect DHT22 for real readings");
}

void loop() {
  unsigned long now = millis();
  if (now - lastReadTime >= READ_INTERVAL) {
    lastReadTime = now;
    readingCount++;
    temperature  = simulateTemperature();
    humidity     = simulateHumidity();
    deviceStatus = getStatus(temperature, humidity);
    printJSON(temperature, humidity, deviceStatus);
  }
}
