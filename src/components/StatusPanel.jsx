import React from 'react';
import { Wifi, WifiOff, Globe, Server, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

const StatusPanel = ({ espStatus, systemStats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <motion.div 
        whileHover={{ y: -5 }}
        className="glass-card p-4 flex items-center gap-4"
      >
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${espStatus.connected ? 'bg-accent/20 text-accent shadow-accent-glow' : 'bg-red-500/20 text-red-500'}`}>
          {espStatus.connected ? <Wifi size={24} /> : <WifiOff size={24} />}
        </div>
        <div>
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">ESP32 Status</p>
          <p className="text-lg font-bold">{espStatus.connected ? 'Connected' : 'Offline'}</p>
          <p className="text-[10px] text-gray-500 truncate w-32">{espStatus.ip || 'Waiting for signal...'}</p>
        </div>
      </motion.div>

      <motion.div 
        whileHover={{ y: -5 }}
        className="glass-card p-4 flex items-center gap-4"
      >
        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary/20 text-primary shadow-neon-blue">
          <Server size={24} />
        </div>
        <div>
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Server Status</p>
          <p className="text-lg font-bold">Online</p>
          <p className="text-[10px] text-gray-500">Port: 5000</p>
        </div>
      </motion.div>

      <motion.div 
        whileHover={{ y: -5 }}
        className="glass-card p-4 flex items-center gap-4"
      >
        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-secondary/20 text-secondary shadow-neon-purple">
          <Cpu size={24} />
        </div>
        <div>
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">PC Load</p>
          <p className="text-lg font-bold">{systemStats.cpuUsage}%</p>
          <div className="w-24 h-1 bg-white/10 rounded-full mt-1 overflow-hidden">
            <div 
              className="h-full bg-secondary transition-all duration-500" 
              style={{ width: `${systemStats.cpuUsage}%` }}
            />
          </div>
        </div>
      </motion.div>

      <motion.div 
        whileHover={{ y: -5 }}
        className="glass-card p-4 flex items-center gap-4"
      >
        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue-400/20 text-blue-400">
          <Globe size={24} />
        </div>
        <div>
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Local IP</p>
          <p className="text-lg font-bold">192.168.1.15</p>
          <p className="text-[10px] text-gray-500">Local Network</p>
        </div>
      </motion.div>
    </div>
  );
};

export default StatusPanel;
