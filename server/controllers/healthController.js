/**
 * Health Check Controller
 * GET /api/health
 */
const getHealthStatus = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'CareerCraft AI Backend Server is running smoothly',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0'
  });
};

module.exports = {
  getHealthStatus
};
