import React, { useState, useEffect } from 'react';
import { Globe, Code, FileText, Music, Calculator, Lock, Power, RefreshCw, Play, Edit, Trash2, Save, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CommandGrid = ({ onExecute }) => {
  const [isConfigMode, setIsConfigMode] = useState(false);
  const [tasks, setTasks] = useState([]);

  const defaultTasks = [
    { id: 'open_chrome', icon: Globe, label: 'Chrome', color: 'text-blue-500', value: 'https://google.com' },
    { id: 'open_vscode', icon: Code, label: 'VS Code', color: 'text-blue-400', value: 'code .' },
    { id: 'open_notepad', icon: FileText, label: 'Notepad', color: 'text-gray-400', value: 'notepad' },
    { id: 'open_spotify', icon: Music, label: 'Spotify', color: 'text-green-500', value: 'spotify' },
    { id: 'open_calculator', icon: Calculator, label: 'Calculator', color: 'text-orange-500', value: 'calc' },
    { id: 'lock_pc', icon: Lock, label: 'Lock PC', color: 'text-yellow-500', value: 'lock' },
    { id: 'restart_pc', icon: RefreshCw, label: 'Restart', color: 'text-purple-500', value: 'restart' },
    { id: 'shutdown_pc', icon: Power, label: 'Shutdown', color: 'text-red-500', value: 'shutdown' },
  ];

  useEffect(() => {
    const saved = localStorage.getItem('user_tasks');
    if (saved) {
      setTasks(JSON.parse(saved));
    } else {
      setTasks(defaultTasks);
    }
  }, []);

  const saveTasks = (newTasks) => {
    setTasks(newTasks);
    localStorage.setItem('user_tasks', JSON.stringify(newTasks));
  };

  const handleUpdateTask = (id, field, newValue) => {
    const updated = tasks.map(task => 
      task.id === id ? { ...task, [field]: newValue } : task
    );
    saveTasks(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-xl font-bold">Quick Actions</h2>
        <button 
          onClick={() => setIsConfigMode(!isConfigMode)}
          className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
            isConfigMode 
            ? 'bg-primary/20 border-primary text-primary font-bold' 
            : 'border-white/10 text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          {isConfigMode ? 'Exit Customization' : 'Customize Board'}
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {tasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`glass-card p-4 group relative overflow-hidden transition-all ${
              isConfigMode ? 'border-primary/40 ring-1 ring-primary/20 bg-primary/5' : ''
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-white/5 ${task.color}`}>
                <task.icon size={24} />
              </div>
              {isConfigMode && (
                <div className="flex gap-1">
                  <span className="text-[10px] text-primary font-mono uppercase bg-primary/10 px-2 py-1 rounded">Editing</span>
                </div>
              )}
            </div>
            
            {isConfigMode ? (
              <div className="space-y-2 mb-4 relative z-10">
                <input 
                  type="text"
                  className="w-full bg-black/40 border border-white/10 rounded px-2 py-1.5 text-sm focus:border-primary outline-none"
                  value={task.label}
                  onChange={(e) => handleUpdateTask(task.id, 'label', e.target.value)}
                  placeholder="Button Label"
                />
                <input 
                  type="text"
                  className="w-full bg-black/40 border border-white/10 rounded px-2 py-1.5 text-[10px] font-mono focus:border-primary outline-none"
                  value={task.value}
                  onChange={(e) => handleUpdateTask(task.id, 'value', e.target.value)}
                  placeholder="URL or Shell Command"
                />
              </div>
            ) : (
              <>
                <h3 className="font-bold mb-1">{task.label}</h3>
                <p className="text-[10px] text-gray-500 mb-4 uppercase truncate">{task.value}</p>
              </>
            )}
            
            <button
              disabled={isConfigMode}
              onClick={() => onExecute(task.id, task.value)}
              className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all font-semibold text-sm ${
                isConfigMode 
                ? 'opacity-20 grayscale' 
                : 'bg-white/5 hover:bg-primary/20 hover:text-primary border border-white/5 hover:border-primary/30 group-hover:shadow-neon-blue'
              }`}
            >
              <Play size={14} className="fill-current" />
              {isConfigMode ? 'Locked' : 'Execute'}
            </button>

            {/* Background Glow */}
            <div className={`absolute -right-4 -bottom-4 w-24 h-24 bg-current opacity-[0.03] rounded-full blur-2xl transition-all group-hover:opacity-10 ${task.color}`} />
          </motion.div>
        ))}
      </div>
      
      <AnimatePresence>
        {isConfigMode && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="text-center p-4 rounded-xl border border-primary/20 bg-primary/5"
          >
            <p className="text-sm text-primary">
              <strong>Hustle-Free Mode:</strong> Type any URL or PC Command directly into the boxes above. 
              <br/><span className="text-xs opacity-60 italic">Examples: "https://youtube.com", "calc", "shutdown /s", "D:\Games\Steam.exe"</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CommandGrid;