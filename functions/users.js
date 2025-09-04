// users.js - 用户数据管理模块
const express = require('express');
const bcrypt = require('bcrypt'); // 确保引入
const jwt = require('jsonwebtoken'); // 确保引入
const router = express.Router();
// 修正模型路径
const User = require('./models/User');
// 确保这个中间件文件路径正确，并且正确导出了 authenticateToken
const { authenticateToken } = require('./middleware/auth'); // 如果 auth 中间件独立了

// 管理员权限检查中间件 (定义在 users.js 内部)
function requireAdmin(req, res, next) {
    // 从环境变量或默认值获取管理员邮箱列表
	const adminEmailsString = process.env.ADMIN_EMAILS || 'admin@example.com';
    const adminEmails = adminEmailsString.split(',').map(email => email.trim());
    // 检查 req.user 是否存在，其 email 是否在管理员列表中
	if (req.user && req.user.email && adminEmails.includes(req.user.email)) {
        next();  // 是管理员，继续
    } else {
        // 不是管理员，拒绝访问
		console.warn(`用户 ${req.user?.email || 'Unknown'} 尝试访问管理员资源被拒绝。`);
        // 添加 return 以防止继续执行
        return res.status(403).json({ success: false, error: '需要管理员权限' });
    }
}

// --- 移除了第一个简单的 router.get('/', ...) 定义 ---

// 获取所有用户路由 (示例，需要管理员权限)
router.get('/', authenticateToken, requireAdmin, async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// --- 添加测试路由 ---
router.get('/test', (req, res) => {
    res.json({ message: "Users test route is working!" });
});
// --- 添加结束 ---

// // 获取所有用户路由 (需要管理员权限)
// // 注意：此路由需要 authenticateToken 和 requireAdmin 两个中间件
// // 这个是保留下来的、你想要的路由定义
// router.get('/', authenticateToken, requireAdmin, async (req, res) => {
//     try {
//         const users = await User.find({});
//         res.json({ success: true, users }); // 返回标准格式
//     } catch (error) {
//         console.error('获取用户列表失败:', error);
//         res.status(500).json({ success: false, error: '服务器内部错误' });
//     }
// });
// 
// // --- 添加 /test 路由 (如果需要) ---
// // 例如，一个简单的测试路由 (也需要认证，但不一定需要管理员权限)
// router.get('/test', authenticateToken, (req, res) => {
//     res.json({ success: true, message: "Users test route is working!", user: req.user });
// });
// // --- 定义其他用户相关路由... ---

// *** 只保留这一个导出 ***
// 移除了文件末尾第二个 module.exports = router;
module.exports = router;

// *** 移除了所有被注释的重复代码、冲突的 module.exports 以及未使用的 UserManager 类 ***
// *** 移除了文件末尾第二个 router.get('/', ...) 定义和其后的 module.exports = router; ***