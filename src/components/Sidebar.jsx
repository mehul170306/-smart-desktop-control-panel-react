import React from 'react';
import { LayoutDashboard, Cpu, Zap, Settings, Terminal, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'automation', icon: Zap, label: 'Automation' },
    { id: 'hardware', icon: Cpu, label: 'Hardware' },
    { id: 'logs', icon: Terminal, label: 'Live Logs' },
    { id: 'analytics', icon: Activity, label: 'Analytics' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="w-64 h-screen glass-card rounded-none border-y-0 border-l-0 flex flex-col p-4 fixed left-0 top-0 z-50">
      <div className="flex items-center gap-3 px-4 mb-10">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-neon-blue">
          <Zap className="text-white fill-current" size={24} />
        </div>
        <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          SMART PANEL
        </h1>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${
              activeTab === item.id 
                ? 'bg-primary/20 text-primary border border-primary/30 shadow-neon-blue' 
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
            {activeTab === item.id && (
              <motion.div 
                layoutId="active-pill"
                className="ml-auto w-1.5 h-6 bg-primary rounded-full"
              />
            )}
          </button>
        ))}
      </nav>

      <div className="mt-auto p-4 glass-card bg-white/5 border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary" />
          <div>
            <p className="text-sm font-semibold">User Alpha</p>
            <p className="text-xs text-gray-400">System Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
