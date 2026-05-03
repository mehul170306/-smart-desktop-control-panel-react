import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Thermometer, Droplets, Sun, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const MetricsDashboard = ({ sensorData }) => {
  // Mock history data for the chart
  const data = [
    { name: '10:00', temp: 24, hum: 45 },
    { name: '10:05', temp: 25, hum: 48 },
    { name: '10:10', temp: 23, hum: 50 },
    { name: '10:15', temp: 24, hum: 47 },
    { name: '10:20', temp: 26, hum: 44 },
    { name: '10:25', temp: sensorData.temperature || 25, hum: sensorData.humidity || 45 },
  ];

  const cards = [
    { label: 'Temperature', value: `${sensorData.temperature?.toFixed(1) || '0.0'}°C`, icon: Thermometer, color: 'text-orange-400' },
    { label: 'Humidity', value: `${sensorData.humidity || '0'}%`, icon: Droplets, color: 'text-blue-400' },
    { label: 'Light Level', value: sensorData.light || '0', icon: Sun, color: 'text-yellow-400' },
    { label: 'Motion', value: sensorData.motion ? 'Detected' : 'Clear', icon: Activity, color: sensorData.motion ? 'text-red-400' : 'text-accent' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 glass-card p-6">
        <h3 className="text-lg font-bold mb-6">Environmental Telemetry</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
              <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                itemStyle={{ color: '#fff' }}
              />
              <Area type="monotone" dataKey="temp" stroke="#3b82f6" fillOpacity={1} fill="url(#colorTemp)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {cards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-4 flex flex-col items-center justify-center text-center group"
          >
            <div className={`p-3 rounded-full bg-white/5 mb-3 group-hover:scale-110 transition-transform ${card.color}`}>
              <card.icon size={24} />
            </div>
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-1 font-medium">{card.label}</p>
            <p className="text-xl font-bold">{card.value}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MetricsDashboard;
