import React, { useState } from 'react';
import { 
  Gamepad2, 
  Settings2, 
  Layers, 
  Monitor, 
  Cpu, 
  Database, 
  Wifi, 
  Zap,
  Volume2,
  Sun,
  Play,
  Globe,
  Plus,
  Clock,
  Music,
  CloudSun,
  Activity
} from 'lucide-react';

export default function SmartDesktopControlPanel() {
  const [activeKey, setActiveKey] = useState(null);

  const joystickFunctions = [
    { name: 'Media Control', icon: <Music className="w-5 h-5" /> },
    { name: 'Mouse Navigation', icon: <Globe className="w-5 h-5" /> },
    { name: 'Window Switching', icon: <Layers className="w-5 h-5" /> },
    { name: 'Gaming Mode', icon: <Gamepad2 className="w-5 h-5" /> },
  ];

  const dialFunctions = [
    { name: 'Volume Control', icon: <Volume2 className="w-5 h-5" /> },
    { name: 'Brightness Control', icon: <Sun className="w-5 h-5" /> },
    { name: 'Timeline Scrubbing', icon: <Clock className="w-5 h-5" /> },
    { name: 'Zoom Control', icon: <Plus className="w-5 h-5" /> },
  ];

  const einkModes = [
    { name: 'System Stats', icon: <Cpu className="w-5 h-5" /> },
    { name: 'Spotify Now Playing', icon: <Music className="w-5 h-5" /> },
    { name: 'Pomodoro Timer', icon: <Clock className="w-5 h-5" /> },
    { name: 'Weather & Clock', icon: <CloudSun className="w-5 h-5" /> },
  ];

  const keys = [
    { id: 1, name: 'Volume Up', status: 'Active', icon: <Volume2 /> },
    { id: 2, name: 'Volume Down', status: 'Active', icon: <Volume2 /> },
    { id: 3, name: 'Play / Pause', status: 'Inactive', icon: <Play /> },
    { id: 4, name: 'Open Browser', status: 'Active', icon: <Globe /> },
    { id: 5, name: 'Brightness +', status: 'Active', icon: <Sun /> },
    { id: 6, name: 'Brightness -', status: 'Inactive', icon: <Sun /> },
  ];

  const stats = [
    { title: 'CPU Usage', value: '42%', icon: <Cpu className="text-[#53161D]" /> },
    { title: 'RAM Usage', value: '63%', icon: <Database className="text-[#53161D]" /> },
    { title: 'Connectivity', value: 'Stable', icon: <Wifi className="text-[#53161D]" /> },
  ];

  const handleKeyPress = (id) => {
    setActiveKey(id);
    setTimeout(() => setActiveKey(null), 200);
  };

  return (
    <div className="min-h-screen bg-[#FFFBF0] text-[#53161D] p-8 md:p-12 font-sans selection:bg-[#53161D] selection:text-[#FFFBF0]">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-16 gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 neu-flat rounded-full text-sm font-medium tracking-wide uppercase">
              <Zap className="w-4 h-4 fill-[#53161D]" />
              System Online
            </div>
            <h1 className="text-6xl font-extrabold tracking-tight">NeoDesk <span className="font-light">Control</span></h1>
            <p className="text-xl text-[#53161D]/70 max-w-xl leading-relaxed">
              An elegant ecosystem for your desktop. Monitor stats and orchestrate your workspace with a single touch.
            </p>
          </div>

          <div className="neu-flat rounded-[2.5rem] p-8 w-full lg:w-80 space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Settings2 className="w-5 h-5" /> System Status
            </h2>
            <div className="space-y-4">
              {[
                { label: 'ESP32 Core', status: 'Connected', color: 'text-emerald-600' },
                { label: 'Wireless Link', status: 'Online', color: 'text-emerald-600' },
                { label: 'Signal Latency', status: '12ms', color: 'text-[#53161D]' },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center text-sm">
                  <span className="text-[#53161D]/60">{item.label}</span>
                  <span className={`font-bold ${item.color}`}>{item.status}</span>
                </div>
              ))}
            </div>
          </div>
        </header>

        {/* Shortcut Keys Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Layers className="w-8 h-8" /> Shortcut Matrix
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {keys.map((key) => (
              <div
                key={key.id}
                onClick={() => handleKeyPress(key.id)}
                className={`group cursor-pointer transition-all duration-300 rounded-[2rem] p-8 ${
                  activeKey === key.id ? 'neu-pressed scale-[0.98]' : 'neu-flat hover:scale-[1.02]'
                }`}
              >
                <div className="flex items-center justify-between mb-8">
                  <div className={`p-4 rounded-2xl ${activeKey === key.id ? 'neu-pressed' : 'neu-flat shadow-sm'}`}>
                    {React.cloneElement(key.icon, { className: "w-6 h-6" })}
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest ${
                    key.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {key.status}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-6">{key.name}</h3>
                <div className="flex gap-4">
                  <button className="flex-1 bg-[#53161D] text-[#FFFBF0] py-3 rounded-xl font-bold hover:opacity-90 transition shadow-lg shadow-[#53161D]/20">
                    Trigger
                  </button>
                  <button className="p-3 rounded-xl neu-flat hover:neu-pressed transition">
                    <Settings2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Mid Section Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-16">
          {[
            { title: 'Joystick Map', data: joystickFunctions, icon: <Gamepad2 /> },
            { title: 'Dial Response', data: dialFunctions, icon: <Activity /> },
            { title: 'E-Ink Layout', data: einkModes, icon: <Monitor /> },
          ].map((section, i) => (
            <div key={i} className="neu-flat rounded-[2.5rem] p-8">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                {React.cloneElement(section.icon, { className: "w-6 h-6" })}
                {section.title}
              </h2>
              <div className="space-y-4">
                {section.data.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-2xl hover:neu-pressed transition-all duration-300 group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-[#53161D]/5 group-hover:bg-transparent transition-colors">
                        {item.icon}
                      </div>
                      <span className="font-semibold text-sm">{item.name}</span>
                    </div>
                    <button className="text-[10px] font-bold uppercase tracking-tighter bg-[#53161D] text-[#FFFBF0] px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      Set
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Stats & Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="neu-flat rounded-[2rem] p-8 flex flex-col justify-between h-48">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold text-[#53161D]/60">{stat.title}</h3>
                  <div className="p-2 rounded-xl bg-[#53161D]/5">{stat.icon}</div>
                </div>
                <div className="text-5xl font-black tracking-tighter">{stat.value}</div>
              </div>
            ))}
          </div>
          
          <div className="neu-flat rounded-[2rem] p-8">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5" /> Activity
            </h2>
            <div className="space-y-6">
              {[
                { msg: 'Volume Up', time: '2s' },
                { msg: 'Browser Open', time: '10s' },
                { msg: 'Brightness -', time: '25s' },
              ].map((log, i) => (
                <div key={i} className="flex justify-between items-center text-xs">
                  <span className="font-semibold">{log.msg}</span>
                  <span className="text-[#53161D]/40 font-mono">{log.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Subtle background decoration */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] overflow-hidden opacity-20">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#53161D] blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] rounded-full bg-[#53161D] blur-[100px]" />
      </div>
    </div>
  );
}
