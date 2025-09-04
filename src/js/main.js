//// public/js/main.js
//async function fetchUsers() {
//  const response = await fetch('/api/users');
//  const users = await response.json();
//  console.log(users);
//}

// 检查当前路径并加载相应内容
function handleRouting() {
    const path = window.location.pathname;
    
    // API 请求不应该被重定向到 index.html
    if (path.startsWith('/api/')) {
        return; // 让 API 请求正常处理
    }
    
    // 前端路由处理
    switch(path) {
        case '/':
            loadHomePage();
            break;
        case '/login':
            loadLoginPage();
            break;
        case '/register':
            loadRegisterPage();
            break;
        default:
            // 404 页面或其他处理
            break;
    }
}

// API 调用示例
async function loginUser(userData) {
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });
        
        const data = await response.json();
        if (data.success) {
            // 登录成功处理
            localStorage.setItem('token', data.token);
            window.location.href = '/dashboard'; // 这会被重定向到 index.html
        }
        return data;
    } catch (error) {
        console.error('Login error:', error);
    }
}

// 页面加载时检查路由
document.addEventListener('DOMContentLoaded', handleRouting);