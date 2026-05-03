import React from 'react';
import { Globe, Code, FileText, Music, Calculator, Lock, Power, RefreshCw, Play, Edit, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

const CommandGrid = ({ onExecute }) => {
  const tasks = [
    { id: 'open_chrome', icon: Globe, label: 'Chrome', color: 'text-blue-500' },
    { id: 'open_vscode', icon: Code, label: 'VS Code', color: 'text-blue-400' },
    { id: 'open_notepad', icon: FileText, label: 'Notepad', color: 'text-gray-400' },
    { id: 'open_spotify', icon: Music, label: 'Spotify', color: 'text-green-500' },
    { id: 'open_calculator', icon: Calculator, label: 'Calculator', color: 'text-orange-500' },
    { id: 'lock_pc', icon: Lock, label: 'Lock PC', color: 'text-yellow-500' },
    { id: 'restart_pc', icon: RefreshCw, label: 'Restart', color: 'text-purple-500' },
    { id: 'shutdown_pc', icon: Power, label: 'Shutdown', color: 'text-red-500' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-xl font-bold">Quick Actions</h2>
        <button className="text-xs text-primary hover:underline">Customize</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="glass-card p-4 group relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-white/5 ${task.color}`}>
                <task.icon size={24} />
              </div>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 hover:bg-white/10 rounded-lg"><Edit size={14} /></button>
                <button className="p-1.5 hover:bg-white/10 rounded-lg text-red-400"><Trash2 size={14} /></button>
              </div>
            </div>
            
            <h3 className="font-bold mb-1">{task.label}</h3>
            <p className="text-[10px] text-gray-500 mb-4 uppercase">System Automation</p>
            
            <button
              onClick={() => onExecute(task.id)}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-white/5 hover:bg-primary/20 hover:text-primary border border-white/5 hover:border-primary/30 rounded-xl transition-all font-semibold text-sm group-hover:shadow-neon-blue"
            >
              <Play size={14} className="fill-current" />
              Execute
            </button>

            {/* Background Glow */}
            <div className={`absolute -right-4 -bottom-4 w-24 h-24 bg-current opacity-[0.03] rounded-full blur-2xl transition-all group-hover:opacity-10 ${task.color}`} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CommandGrid;
