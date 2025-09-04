const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 模拟 Netlify Functions 路由
// 加载你的路由文件
const fs = require('fs');
const path = require('path');

// 动态加载 functions 目录中的路由
function loadRoutes() {
  const routesDir = path.join(__dirname, 'functions');
  
  // 加载主要的 server.js（Netlify Function）
  try {
    const serverFunction = require('./functions/server');
    console.log('Netlify Functions loaded successfully');
  } catch (error) {
    console.error('Error loading Netlify Functions:', error.message);
  }
}

loadRoutes();

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Local development server running',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Local server running on http://localhost:${PORT}`);
  console.log(`📁 Static files served from: ${path.join(__dirname, 'public')}`);
  console.log(`🔧 Netlify Functions available at: http://localhost:${PORT}/.netlify/functions/`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});