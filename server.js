const express = require('express');
const path = require('path');
const mime = require('mime');
const app = express();

// 🛠️ 1. 強制規定 Railway 遇到 .wasm 檔案時，必須吐出標準的 WebAssembly 標頭
mime.define({ 'application/wasm': ['wasm'] });

// 🛠️ 2. 確保多執行緒隔離環境安全標頭（FFmpeg 必備，如果原本就有請保留）
app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    next();
});

// 3. 你的靜態檔案資料夾設定
app.use(express.static(path.join(__dirname, 'public')));

// 其餘的 app.listen 或路由保持原樣...
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`伺服器正運行在 port ${PORT}`);
});
