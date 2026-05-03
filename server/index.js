require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { WebSocketServer } = require('ws');
const cors = require('cors');
const pcCommands = require('./pc-commands');
const systemMonitor = require('./system-monitor');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

// Socket.io for React Frontend
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// WebSocket Server for ESP32
const wss = new WebSocketServer({ noServer: true });

let esp32Client = null;

// Handle WebSocket upgrade for ESP32
server.on('upgrade', (request, socket, head) => {
  const pathname = new URL(request.url, `http://${request.headers.host}`).pathname;

  if (pathname === '/esp32') {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  }
});

// ESP32 WebSocket Logic
wss.on('connection', (ws, req) => {
  const ip = req.socket.remoteAddress;
  console.log(`ESP32 Connected from ${ip}`);
  esp32Client = ws;
  
  io.emit('esp32_status', { connected: true, ip });

  ws.on('message', (data) => {
    try {
      const message = JSON.parse(data);
      console.log('Received from ESP32:', message);
      
      // Broadcast sensor data to React frontend
      if (message.type === 'sensor_data') {
        io.emit('sensor_data', message.payload);
      }
      
      // Handle logs or other messages
      if (message.type === 'log') {
        io.emit('esp32_log', message.payload);
      }
    } catch (e) {
      console.error('Error parsing ESP32 message:', data.toString());
    }
  });

  ws.on('close', () => {
    console.log('ESP32 Disconnected');
    esp32Client = null;
    io.emit('esp32_status', { connected: false });
  });
});

// React Socket.io Logic
io.on('connection', (socket) => {
  console.log('React Client Connected:', socket.id);

  // Send initial status
  socket.emit('esp32_status', { connected: !!esp32Client });

  // Handle Command Execution
  socket.on('execute_task', async (data) => {
    try {
      const { taskId, params } = data;
      await pcCommands.executeTask(taskId, params);
      socket.emit('task_status', { taskId, status: 'success' });
    } catch (error) {
      socket.emit('task_status', { taskId, status: 'error', message: error.message });
    }
  });

  // Handle ESP32 Control
  socket.on('control_esp32', (data) => {
    if (esp32Client && esp32Client.readyState === 1) {
      esp32Client.send(JSON.stringify(data));
    } else {
      socket.emit('error', 'ESP32 not connected');
    }
  });

  socket.on('disconnect', () => {
    console.log('React Client Disconnected');
  });
});

// Start System Monitoring
systemMonitor.startMonitoring((stats) => {
  io.emit('system_stats', stats);
});

// REST API Routes
app.get('/api/status', (req, res) => {
  res.json({
    server_online: true,
    esp32_connected: !!esp32Client,
    timestamp: new Date()
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
