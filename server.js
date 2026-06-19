const express = require('express');
const path = require('path');
const app = express();

// 🛠️ 1. 正確設定 WASM MIME 類型 (不需要 mime 套件)
app.use((req, res, next) => {
    if (req.url.endsWith('.wasm')) {
        res.setHeader('Content-Type', 'application/wasm');
    }
    next();
});

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
