/*
 * Smart Canteen — RFID IoT Terminal
 * Author: Arif Shekh (AI/ML & IoT Developer)
 * Hardware Target: ESP8266 / ESP32 + MFRC522 RFID Reader
 * 
 * Pin Connections (SPI):
 * - SDA (SS): Pin D8 (GPIO 15) / Pin 5 (ESP32)
 * - SCK: Pin D5 (GPIO 14) / Pin 18 (ESP32)
 * - MOSI: Pin D7 (GPIO 13) / Pin 23 (ESP32)
 * - MISO: Pin D6 (GPIO 12) / Pin 19 (ESP32)
 * - RST: Pin D3 (GPIO 0) / Pin 22 (ESP32)
 * - Buzzer: Pin D1 (GPIO 5)
 */

#include <SPI.h>
#include <MFRC522.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

#define SS_PIN 15
#define RST_PIN 0
#define BUZZER_PIN 5

MFRC522 mfrc522(SS_PIN, RST_PIN);
WiFiClient client;

const char* ssid = "WIFI_NETWORK_NAME";
const char* password = "WIFI_PASSWORD";
const char* serverUrl = "http://192.168.1.100:3000/api/canteen/tap";

void setup() {
  Serial.begin(115200);
  SPI.begin();
  mfrc522.PCD_Init();
  pinMode(BUZZER_PIN, OUTPUT);
  digitalWrite(BUZZER_PIN, LOW);

  Serial.println("\n[Smart Canteen] Initializing Terminal...");

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\n[WiFi] Connected! Terminal Ready.");
  Serial.println("Tap student RFID card to scan...");
}

void loop() {
  // Check for new card
  if (!mfrc522.PICC_IsNewCardPresent() || !mfrc522.PICC_ReadCardSerial()) {
    delay(50);
    return;
  }

  // Extract UID string
  String cardUID = "";
  for (byte i = 0; i < mfrc522.uid.size; i++) {
    cardUID += String(mfrc522.uid.uidByte[i] < 0x10 ? "0" : "");
    cardUID += String(mfrc522.uid.uidByte[i], HEX);
  }
  cardUID.toUpperCase();

  Serial.print("\n[RFID] Scanned Card UID: ");
  Serial.println(cardUID);

  // Beep feedback
  digitalWrite(BUZZER_PIN, HIGH);
  delay(100);
  digitalWrite(BUZZER_PIN, LOW);

  // Send to Canteen Server
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(client, serverUrl);
    http.addHeader("Content-Type", "application/json");

    String json = "{\"cardId\":\"" + cardUID + "\",\"terminalId\":\"CANTEEN_COUNTER_01\"}";
    int httpCode = http.POST(json);

    if (httpCode > 0) {
      String response = http.getString();
      Serial.print("[SERVER RESPONSE] ");
      Serial.println(response);
    } else {
      Serial.printf("[HTTP] Error on sending POST: %s\n", http.errorToString(httpCode).c_str());
    }
    http.end();
  }

  delay(1500); // Debounce card reads
}
