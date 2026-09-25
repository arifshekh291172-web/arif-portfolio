/*
 * Smart Agriculture Monitoring System
 * Author: Arif Shekh (AI/ML & IoT Developer)
 * Hardware Target: ESP32 / ESP8266 & Arduino
 * 
 * Sensors & Actuators:
 * - Soil Moisture Sensor: Analog Pin 34
 * - DHT11 (Temp & Humidity): Digital Pin 4
 * - LDR Light Sensor: Analog Pin 35
 * - Flame Detection Sensor: Digital Pin 18
 * - Relay Module (Water Pump): Digital Pin 26
 * - Buzzer Alarm: Digital Pin 27
 */

#include <WiFi.h>
#include <HTTPClient.h>

// Wi-Fi Credentials
const char* ssid = "WIFI_NETWORK_NAME";
const char* password = "WIFI_PASSWORD";

// Telemetry Server Endpoint
const char* serverUrl = "http://192.168.1.100:5000/api/telemetry";

// Pin Definitions
#define SOIL_PIN 34
#define LDR_PIN 35
#define FLAME_PIN 18
#define RELAY_PIN 26
#define BUZZER_PIN 27

// Thresholds
const int SOIL_DRY_THRESHOLD = 2800; // Analog value above which soil is dry
const int FLAME_TRIGGER_VALUE = LOW; // Flame sensors typically pull LOW on fire detection

void setup() {
  Serial.begin(115200);
  delay(1000);
  Serial.println("\n[IoT Agriculture] Initializing System...");

  pinMode(FLAME_PIN, INPUT);
  pinMode(RELAY_PIN, OUTPUT);
  pinMode(BUZZER_PIN, OUTPUT);

  // Default states (Active Low or High depending on module)
  digitalWrite(RELAY_PIN, LOW); // Pump OFF
  digitalWrite(BUZZER_PIN, LOW); // Buzzer OFF

  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  Serial.print("[WiFi] Connecting to ");
  Serial.println(ssid);

  int retries = 0;
  while (WiFi.status() != WL_CONNECTED && retries < 20) {
    delay(500);
    Serial.print(".");
    retries++;
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\n[WiFi] Connected successfully!");
    Serial.print("[WiFi] Local IP: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("\n[WiFi] Connection timed out. Running in standalone local autonomous mode.");
  }
}

void loop() {
  // 1. Read Soil Moisture (Analog 0 - 4095)
  int rawSoil = analogRead(SOIL_PIN);
  int soilMoisturePercent = map(rawSoil, 4095, 1200, 0, 100);
  soilMoisturePercent = constrain(soilMoisturePercent, 0, 100);

  // 2. Read Light Intensity (LDR)
  int rawLdr = analogRead(LDR_PIN);
  int lightPercent = map(rawLdr, 0, 4095, 0, 100);

  // 3. Read Flame Detection State
  int flameState = digitalRead(FLAME_PIN);
  bool fireHazard = (flameState == FLAME_TRIGGER_VALUE);

  // 4. Simulated Temperature / DHT Read
  float temperature = 28.5 + (random(-10, 10) / 10.0);
  float humidity = 65.0 + (random(-20, 20) / 10.0);

  // 5. Automated Closed-Loop Relay Logic (Watering)
  bool pumpActive = false;
  if (soilMoisturePercent < 35) {
    digitalWrite(RELAY_PIN, HIGH); // Turn ON Pump
    pumpActive = true;
    Serial.println("[AUTOPILOT] Soil dry! Water pump ACTIVATED.");
  } else {
    digitalWrite(RELAY_PIN, LOW); // Turn OFF Pump
    pumpActive = false;
  }

  // 6. Hazard Safety Protection (Flame Alert)
  if (fireHazard) {
    digitalWrite(BUZZER_PIN, HIGH);
    Serial.println("[HAZARD ALERT] Fire/Flame detected! Triggering acoustic alarm!");
  } else {
    digitalWrite(BUZZER_PIN, LOW);
  }

  // 7. Telemetry Dispatch
  Serial.printf("[TELEMETRY] Moisture: %d%% | Temp: %.1fC | Light: %d%% | Pump: %s | Fire: %s\n",
                soilMoisturePercent, temperature, lightPercent,
                pumpActive ? "ON" : "OFF", fireHazard ? "YES" : "NO");

  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/json");

    String jsonPayload = "{";
    jsonPayload += "\"soilMoisture\":" + String(soilMoisturePercent) + ",";
    jsonPayload += "\"temperature\":" + String(temperature) + ",";
    jsonPayload += "\"humidity\":" + String(humidity) + ",";
    jsonPayload += "\"lightLevel\":" + String(lightPercent) + ",";
    jsonPayload += "\"pumpActive\":" + String(pumpActive ? "true" : "false") + ",";
    jsonPayload += "\"fireHazard\":" + String(fireHazard ? "true" : "false");
    jsonPayload += "}";

    int httpResponseCode = http.POST(jsonPayload);
    if (httpResponseCode > 0) {
      Serial.printf("[HTTP] Telemetry pushed: Code %d\n", httpResponseCode);
    }
    http.end();
  }

  delay(3000); // Sample telemetry every 3 seconds
}
