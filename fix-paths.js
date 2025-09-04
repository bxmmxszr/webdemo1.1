const fs = require('fs');
const path = require('path');

function fixPathReferences() {
    const functionsDir = path.join(__dirname, 'functions');
    
    // 递归查找所有 .js 文件
    function walkDir(dir) {
        const files = fs.readdirSync(dir);
        files.forEach(file => {
            const filePath = path.join(dir, file);
            const stat = fs.statSync(filePath);
            
            if (stat.isDirectory()) {
                walkDir(filePath);
            } else if (file.endsWith('.js')) {
                fixFilePaths(filePath);
            }
        });
    }
    
    function fixFilePaths(filePath) {
        try {
            let content = fs.readFileSync(filePath, 'utf8');
            let originalContent = content;
            
            // 修正相对路径引用
            content = content.replace(/\.\.\/models\//g, './models/');
            content = content.replace(/\.\.\\models\\/g, '.\\models\\');
            content = content.replace(/\.\.\/middleware\//g, './middleware/');
            content = content.replace(/\.\.\\middleware\\/g, '.\\middleware\\');
            
            if (content !== originalContent) {
                fs.writeFileSync(filePath, content, 'utf8');
                console.log(`✅ Fixed paths in: ${filePath}`);
            }
        } catch (error) {
            console.error(`❌ Error fixing ${filePath}:`, error.message);
        }
    }
    
    walkDir(functionsDir);
    console.log('✅ Path fixing completed!');
}

fixPathReferences();