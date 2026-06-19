const express = require('express');
const path = require('path');
const app = express();

// 🛠️ 【終極修正】不用引入 mime 套件！直接強行注入 Express 底層的型態對照表
if (express.static && express.static.mime && express.static.mime.types) {
    express.static.mime.types['wasm'] = 'application/wasm';
} else {
    // 預防萬一，有些 Express 版本可以透過這個底層注入
    try {
        require('send').mime.define({ 'application/wasm': ['wasm'] });
    } catch (e) {
        console.log("MIME define skipped or handled by server environment");
    }
}

// 🛠️ 2. 確保多執行緒隔離環境安全標頭（FFmpeg 必備）
app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    next();
});

// 3. 你的靜態檔案資料夾設定
app.use(express.static(path.join(__dirname, 'public')));

// 其餘的 app.listen 保持原樣...
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`伺服器正運行在 port ${PORT}`);
});
