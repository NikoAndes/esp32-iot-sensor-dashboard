# ESP32 IoT Sensor Dashboard

![Platform](https://img.shields.io/badge/Platform-ESP32-red) ![Language](https://img.shields.io/badge/Language-C%2B%2B%2FJS-blue) ![License](https://img.shields.io/badge/License-MIT-blue) ![Status](https://img.shields.io/badge/Status-Active-brightgreen)

An IoT prototype combining ESP32 firmware and a web dashboard for real-time sensor monitoring. Works with simulated data out of the box; designed for easy DHT22 or BMP280 integration.

## Overview

The system has two components:
- **Firmware** (`firmware/`): ESP32 sketch that simulates temperature/humidity and outputs JSON via Serial
- **Dashboard** (`dashboard/`): A responsive web app that auto-updates sensor cards, a canvas chart, and a readings history table

## Features

- Temperature and humidity monitoring (simulated)
- Device status with warning thresholds
- Auto-updating every 2.5 seconds
- Canvas-based reading history chart
- Last 10 readings table
- Responsive dark theme
- No external JS libraries required

## Architecture

```
ESP32 Sensor Node
  -> Serial JSON output
  -> (future) WiFi / WebSocket / HTTP API
  -> Web Dashboard (HTML/CSS/JS)
```

## Tech Stack

- ESP32 / Arduino IDE (C++)
- HTML5, CSS3, Vanilla JavaScript
- Canvas API for charts

## Project Structure

```
esp32-iot-sensor-dashboard/
├── firmware/
│   └── esp32_sensor_node/
│       └── esp32_sensor_node.ino
├── dashboard/
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── .gitignore
├── LICENSE
└── README.md
```

## How to Run

**Firmware:**
1. Open `firmware/esp32_sensor_node/esp32_sensor_node.ino` in Arduino IDE
2. Select board: `ESP32 Dev Module`
3. Upload and open Serial Monitor at `115200 baud`

**Dashboard:**
1. Open `dashboard/index.html` directly in a browser
2. The dashboard runs with simulated JS data automatically

## What I Learned

- Embedded firmware structuring for sensor nodes
- JSON Serial output from ESP32
- Canvas API for real-time charts
- Bridging hardware and web interfaces
- IoT system architecture design

## Future Improvements

- Real DHT22 or BMP280 sensor integration
- WebSocket for live browser updates
- Backend API for data persistence
- Mobile alerts for warning states
- Multiple sensor nodes

## Author

**Nicolas Isaza Sierra** | [@NikoAndes](https://github.com/NikoAndes)

## License

MIT License
