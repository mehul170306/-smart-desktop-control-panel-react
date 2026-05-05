import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Sidebar from './components/Sidebar';
import StatusPanel from './components/StatusPanel';
import CommandGrid from './components/CommandGrid';
import MetricsDashboard from './components/MetricsDashboard';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, ShieldCheck, Settings } from 'lucide-react';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [socket, setSocket] = useState(null);
  const [espStatus, setEspStatus] = useState({ connected: false, ip: '' });
  const [sensorData, setSensorData] = useState({});
  const [systemStats, setSystemStats] = useState({ cpuUsage: 0, ramUsage: 0 });
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);

    newSocket.on('connect', () => {
      addLog('System', 'Connected to local server');
    });

    newSocket.on('esp32_status', (status) => {
      setEspStatus(status);
      addLog('Hardware', status.connected ? `ESP32 connected at ${status.ip}` : 'ESP32 disconnected');
    });

    newSocket.on('sensor_data', (data) => {
      setSensorData(data);
    });

    newSocket.on('system_stats', (stats) => {
      setSystemStats(stats);
    });

    newSocket.on('esp32_log', (msg) => {
      addLog('ESP32', msg);
    });

    newSocket.on('task_status', (data) => {
      addLog('Task', `${data.taskId}: ${data.status} ${data.message || ''}`);
    });

    return () => newSocket.close();
  }, []);

  const addLog = (source, message) => {
    const log = {
      id: Date.now(),
      time: new Date().toLocaleTimeString(),
      source,
      message
    };
    setLogs(prev => [log, ...prev].slice(0, 50));
  };

  const handleExecuteTask = (taskId, value) => {
    if (socket) {
      socket.emit('execute_task', { taskId, value });
    }
  };

  const handleControlESP = (command, state) => {
    if (socket) {
      socket.emit('control_esp32', { command, state });
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 ml-64 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold mb-1">Command Center</h1>
            <p className="text-gray-400">Welcome back, Administrator. All systems nominal.</p>
          </div>
          <div className="flex gap-4">
            <div className="glass-card px-4 py-2 flex items-center gap-2 text-accent border-accent/20">
              <ShieldCheck size={18} />
              <span className="text-sm font-semibold">Secure Session</span>
            </div>
            <button className="p-3 glass-card hover:bg-white/5 transition-colors">
              <Settings size={20} />
            </button>
          </div>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <StatusPanel espStatus={espStatus} systemStats={systemStats} />
              
              <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                <div className="xl:col-span-3 space-y-8">
                  <MetricsDashboard sensorData={sensorData} />
                  <CommandGrid onExecute={handleExecuteTask} />
                </div>
                
                <div className="space-y-6">
                  <div className="glass-card p-6 h-full flex flex-col">
                    <div className="flex items-center gap-2 mb-6">
                      <Terminal size={20} className="text-primary" />
                      <h3 className="font-bold uppercase text-sm tracking-widest">System Logs</h3>
                    </div>
                    <div className="flex-1 overflow-y-auto space-y-3 font-mono text-[11px]">
                      {logs.map(log => (
                        <div key={log.id} className="border-b border-white/5 pb-2">
                          <span className="text-gray-500">[{log.time}]</span>{' '}
                          <span className="text-primary">[{log.source}]</span>{' '}
                          <span className="text-gray-300">{log.message}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'hardware' && (
            <motion.div
              key="hardware"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="glass-card p-8"
            >
              <h2 className="text-2xl font-bold mb-6">Hardware Control</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                  <h3 className="text-lg font-bold mb-4">ESP32 Peripherals</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Built-in LED</span>
                      <button 
                        onClick={() => handleControlESP('TOGGLE_LED', true)}
                        className="btn-primary"
                      >
                        Toggle
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Main Relay</span>
                      <button 
                        onClick={() => handleControlESP('TOGGLE_RELAY', true)}
                        className="btn-primary bg-secondary shadow-neon-purple"
                      >
                        Toggle
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Futuristic Grid Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-20" 
        style={{ 
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} 
      />
    </div>
  );
}

export default App;
