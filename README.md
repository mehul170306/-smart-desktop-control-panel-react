# 🌌 Smart Desktop Control Panel (2026 Edition)

A premium, futuristic IoT automation dashboard built with React.js, Node.js, and ESP32 integration. Control your PC and your physical workspace from a single glassmorphism-inspired interface.

## 🚀 Features
- **Real-time ESP32 Integration:** Live telemetry (Temp, Humidity, Light, Motion) over WebSockets.
- **PC Automation:** Launch apps (Chrome, VS Code, Spotify), lock PC, or manage system power.
- **System Monitoring:** Live CPU and RAM usage tracking.
- **Futuristic UI:** Dark mode, glassmorphism, neon glow effects, and smooth Framer Motion animations.
- **Live Logs:** Real-time terminal for system and hardware events.

## 🛠️ Tech Stack
- **Frontend:** React, Vite, Tailwind CSS, Framer Motion, Socket.io-client, Recharts, Lucide-React.
- **Backend:** Node.js, Express, Socket.io, WS (WebSockets), SystemInformation.
- **Hardware:** ESP32 (C++ / Arduino IDE).

---

## 📁 Folder Structure
```text
/
├── server/                 # Node.js Backend
│   ├── index.js            # Main Server (Socket.io + WS)
│   ├── pc-commands.js      # OS Task Execution
│   └── system-monitor.js   # PC Metrics Logic
├── hardware/               # ESP32 Firmware
│   └── esp32_firmware/     # Arduino Code
├── src/                    # React Frontend
│   ├── components/         # Modular UI Components
│   └── App.jsx             # Main Application Logic
└── tailwind.config.js      # Custom Theme Config
```

---

## 🚦 Setup Instructions

### 1. Backend Setup
1. Open a terminal in the `server` directory.
2. Install dependencies: `npm install`.
3. Start the server: `node index.js`.
   *The server runs on port 5000 by default.*

### 2. Frontend Setup
1. Open a terminal in the root directory.
2. Install dependencies: `npm install`.
3. Start the dev server: `npm run dev`.
4. Open your browser to the provided local address (usually `http://localhost:5173`).

### 3. ESP32 Setup
1. Open `hardware/esp32_firmware/esp32_firmware.ino` in Arduino IDE.
2. Install required libraries: `ArduinoJson` and `WebSockets`.
3. Update the following variables with your local details:
   - `ssid`: Your WiFi name.
   - `password`: Your WiFi password.
   - `server_host`: Your computer's local IP address (e.g., `192.168.1.10`).
4. Select your ESP32 board and upload the code.

---

## 🔌 Hardware Wiring (Standard Pins)
- **Built-in LED:** Pin 2
- **Relay Module:** Pin 4
- **PIR Motion Sensor:** Pin 5
- **LDR (Photoresistor):** Pin 34 (Analog)
- **DHT11/22:** (Optional) Pin 15

---

## 🛡️ Security Note
This project is designed for local network use. Ensure your firewall allows communication on port 5000. Do not expose the server to the public internet without proper authentication and SSL.

---

*Built with ❤️ for the future of Smart Workspaces.*
