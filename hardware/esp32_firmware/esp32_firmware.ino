/**
 * Smart Desktop Control Panel - ESP32 Firmware
 * 
 * Dependencies:
 * - ArduinoJson by Benoit Blanchon
 * - WebSockets by Markus Sattler
 */

#include <WiFi.h>
#include <WebSocketsClient.h>
#include <ArduinoJson.h>

// --- CONFIGURATION ---
const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";
const char* server_host = "YOUR_PC_IP_ADDRESS"; // e.g., 192.168.1.10
const uint16_t server_port = 5000;

// Pins
const int LED_PIN = 2; // Built-in LED
const int RELAY_PIN = 4;
const int PIR_PIN = 5;
const int LDR_PIN = 34;

WebSocketsClient webSocket;
unsigned long lastSensorUpdate = 0;
const unsigned long sensorInterval = 2000; // 2 seconds

// --- HELPERS ---
void sendLog(String msg) {
  StaticJsonDocument<200> doc;
  doc["type"] = "log";
  doc["payload"] = msg;
  String output;
  serializeJson(doc, output);
  webSocket.sendTXT(output);
}

void sendSensorData() {
  StaticJsonDocument<200> doc;
  doc["type"] = "sensor_data";
  
  JsonObject payload = doc.createNestedObject("payload");
  
  // Real or Mock Sensor Data
  payload["temperature"] = 24.5 + (random(-10, 10) / 10.0);
  payload["humidity"] = 50 + random(-5, 5);
  payload["light"] = analogRead(LDR_PIN);
  payload["motion"] = digitalRead(PIR_PIN);
  payload["status"] = "Active";

  String output;
  serializeJson(doc, output);
  webSocket.sendTXT(output);
}

// --- EVENT HANDLERS ---
void webSocketEvent(WStype_t type, uint8_t * payload, size_t length) {
  switch(type) {
    case WStype_DISCONNECTED:
      Serial.println("[WSc] Disconnected!");
      break;
    case WStype_CONNECTED:
      Serial.printf("[WSc] Connected to url: %s\n", payload);
      sendLog("ESP32 Online and Connected");
      break;
    case WStype_TEXT:
      Serial.printf("[WSc] get text: %s\n", payload);
      
      StaticJsonDocument<200> doc;
      DeserializationError error = deserializeJson(doc, payload);
      
      if (!error) {
        String command = doc["command"];
        if (command == "TOGGLE_LED") {
          bool state = doc["state"];
          digitalWrite(LED_PIN, state ? HIGH : LOW);
          sendLog("LED Toggled: " + String(state));
        } else if (command == "TOGGLE_RELAY") {
          bool state = doc["state"];
          digitalWrite(RELAY_PIN, state ? HIGH : LOW);
          sendLog("Relay Toggled: " + String(state));
        }
      }
      break;
  }
}

void setup() {
  Serial.begin(115200);
  
  pinMode(LED_PIN, OUTPUT);
  pinMode(RELAY_PIN, OUTPUT);
  pinMode(PIR_PIN, INPUT);

  // WiFi Connection
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi Connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  // WebSocket Connection
  // server address, port and URL
  webSocket.begin(server_host, server_port, "/esp32");
  webSocket.onEvent(webSocketEvent);
  webSocket.setReconnectInterval(5000);
}

void loop() {
  webSocket.loop();

  unsigned long now = millis();
  if (now - lastSensorUpdate >= sensorInterval) {
    lastSensorUpdate = now;
    if (WiFi.status() == WL_CONNECTED) {
      sendSensorData();
    }
  }
}
