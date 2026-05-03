const si = require('systeminformation');

/**
 * Fetches current system metrics.
 */
const getSystemStats = async () => {
  try {
    const cpuLoad = await si.currentLoad();
    const mem = await si.mem();
    const temp = await si.cpuTemperature();
    const osInfo = await si.osInfo();

    return {
      cpuUsage: Math.round(cpuLoad.currentLoad),
      ramUsage: Math.round((mem.active / mem.total) * 100),
      cpuTemp: temp.main || 0,
      uptime: si.time().uptime,
      hostname: osInfo.hostname,
      platform: osInfo.platform
    };
  } catch (error) {
    console.error('Error fetching system stats:', error);
    return null;
  }
};

/**
 * Starts a monitoring loop that emits stats via a callback.
 */
const startMonitoring = (callback, interval = 2000) => {
  const timer = setInterval(async () => {
    const stats = await getSystemStats();
    if (stats) {
      callback(stats);
    }
  }, interval);

  return () => clearInterval(timer);
};

module.exports = {
  getSystemStats,
  startMonitoring
};
