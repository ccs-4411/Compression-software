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

// 3. 其餘的 app.listen 保持原樣（使用 Railway 提供的 8080 或任何 Port）
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`伺服器正運行在 port ${PORT}`);
});
