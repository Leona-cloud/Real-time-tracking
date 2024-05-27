function simulateGPSData() {
  return {
    lat: 6.5244 + (Math.random() - 0.5) * 0.01, // Random lat near Lagos
    lng: 3.3792 + (Math.random() - 0.5) * 0.01, // Random lng near Lagos
    timestamp: new Date().toISOString(),
  };
}


module.exports = simulateGPSData