# ESP32 IoT Sensor Dashboard

![Platform](https://img.shields.io/badge/Platform-ESP32-blue) ![Language](https://img.shields.io/badge/Language-C%2B%2B-orange) ![Protocol](https://img.shields.io/badge/Protocol-MQTT-green) ![License](https://img.shields.io/badge/License-MIT-yellow) ![Status](https://img.shields.io/badge/Status-Active-brightgreen)

## Overview

IoT sensor monitoring system built on the ESP32 microcontroller. Reads temperature, humidity (DHT22), and motion (PIR sensor) data, publishes readings via MQTT, and serves a real-time web dashboard over Wi-Fi. Designed as a foundation for home automation and industrial sensing applications.

## Features

- Real-time sensor data (temperature, humidity, motion) via DHT22 and PIR
- MQTT publish/subscribe for sensor topics
- Lightweight web dashboard served from ESP32 (AsyncWebServer)
- Wi-Fi auto-reconnect and NTP time sync
- JSON payload formatting for easy integration
- OTA (Over-The-Air) firmware update support

## Tech Stack

| Layer | Technology |
|-------|------------|
| MCU | ESP32 (Espressif) |
| Language | C++ (Arduino framework) |
| Communication | MQTT (PubSubClient), Wi-Fi |
| Sensors | DHT22, HC-SR501 PIR |
| Web Server | ESPAsyncWebServer |
| Protocol | HTTP, WebSocket |
| IDE | VS Code + PlatformIO |

## Project Structure

```
esp32-iot-sensor-dashboard/
├── src/
│   ├── main.cpp            # Entry point, setup & loop
│   ├── sensors.h/.cpp      # DHT22 + PIR sensor logic
│   ├── mqtt_client.h/.cpp  # MQTT connection & publish
│   ├── web_server.h/.cpp   # AsyncWebServer + WebSocket
│   └── config.h            # Wi-Fi, MQTT broker, pins
├── data/
│   ├── index.html          # Dashboard UI
│   ├── style.css           # Dashboard styles
│   └── app.js              # WebSocket client JS
├── platformio.ini
├── .gitignore
├── LICENSE
└── README.md
```

## How to Run

### Prerequisites
- VS Code + PlatformIO extension
- ESP32 DevKit board
- DHT22 sensor + HC-SR501 PIR sensor
- MQTT broker (e.g., Mosquitto, HiveMQ)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/NikoAndes/esp32-iot-sensor-dashboard.git
   cd esp32-iot-sensor-dashboard
   ```
2. Copy `src/config.h.example` to `src/config.h` and fill in:
   ```cpp
   #define WIFI_SSID     "your_ssid"
   #define WIFI_PASS     "your_password"
   #define MQTT_BROKER   "broker_ip"
   #define MQTT_PORT     1883
   ```
3. Upload filesystem (SPIFFS) for the web dashboard:
   ```
   PlatformIO: Upload Filesystem Image
   ```
4. Build and flash firmware:
   ```
   PlatformIO: Upload
   ```
5. Open Serial Monitor (115200 baud) to view IP address, then visit `http://<ESP32_IP>` in browser.

## Pin Configuration

| Sensor | ESP32 Pin |
|--------|----------|
| DHT22 Data | GPIO 4 |
| PIR Signal | GPIO 14 |
| Status LED | GPIO 2 |

## What I Learned

- Integrating multiple sensor protocols on a single MCU
- Asynchronous web server patterns for embedded systems
- MQTT publish/subscribe architecture and broker configuration
- SPIFFS filesystem for serving static web assets from ESP32
- WebSocket communication for real-time browser updates
- OTA update workflows for remote firmware maintenance

## Future Improvements

- [ ] Add OLED display for local readout
- [ ] Implement data logging to SD card or Firebase
- [ ] Add threshold-based alerts via Telegram bot
- [ ] Support multiple sensor nodes with MQTT discovery
- [ ] Build a Node-RED dashboard as an alternative frontend
- [ ] Add deep sleep mode for battery-powered deployment

## Author

**Nicolas Isaza Sierra** — [GitHub @NikoAndes](https://github.com/NikoAndes)

Mechatronics engineering student | ESP32 & IoT enthusiast | UMNG, Colombia

## License

MIT License — see [LICENSE](LICENSE) for details.
