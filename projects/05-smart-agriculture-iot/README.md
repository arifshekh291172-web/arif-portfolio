# Smart Agriculture Monitoring System

IoT-based agricultural monitoring system using sensors to monitor environmental and soil conditions.

## Hardware & Components
- **Microcontroller**: ESP32 / ESP8266 / Arduino
- **Sensors**:
  - Soil Moisture Sensor (Analog A0 / GPIO 34)
  - Temperature & Humidity DHT11/22 (GPIO 4)
  - LDR Light Sensor (GPIO 35)
  - Flame Sensor (GPIO 18)
- **Actuators**:
  - 5V Relay module for automated water pump (GPIO 26)
  - Active buzzer for acoustic fire alerts (GPIO 27)

## Structure
- `/firmware/smart_agriculture.ino`: C++ embedded code for ESP32.
- `/dashboard/app.py`: Flask telemetry server with real-time browser dashboard.

## Run Telemetry Dashboard
```bash
pip install -r requirements.txt
python dashboard/app.py
```
Open [http://localhost:5000](http://localhost:5000) to view real-time telemetry.
