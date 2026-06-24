const express = require('express');
const path = require('path');
const app = express();

// 🛠️ 1. 確保多執行緒隔離環境安全標頭（FFmpeg 必備）
app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    next();
});

// 🛠️ 2. 【最正統寫法】直接在靜態檔案設定裡，強制規定 .wasm 的 MIME 類型
// 這樣做完全不使用自訂中間件，絕對不會干擾路由，502 完美解決！
app.use(express.static(path.join(__dirname, 'public'), {
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.wasm')) {
            res.setHeader('Content-Type', 'application/wasm');
        }
    }
}));

const PORT = process.env.PORT || 8080;

// 捕捉未捕獲的異常
process.on('uncaughtException', (err) => {
    console.error('❌ 未捕獲的異常:', err);
    process.exit(1);
});

// 捕捉未處理的 Promise 拒絕
process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ 未處理的 Promise 拒絕:', reason);
    process.exit(1);
});

const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ 伺服器正運行在 port ${PORT}`);
    console.log(`✅ 時間: ${new Date().toISOString()}`);
});

server.on('error', (err) => {
    console.error('❌ 伺服器錯誤:', err);
    process.exit(1);
});
