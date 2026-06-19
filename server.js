const express = require('express');
const path = require('path');
const app = express();

// 🛠️ 1. 改用 Express 原生字典定義（100% 不崩潰、免安裝 mime 套件）
if (express.static.mime && express.static.mime.types) {
    express.static.mime.types['wasm'] = 'application/wasm';
}

// 🛠️ 2. 確保多執行緒隔離環境安全標頭（FFmpeg 必備）
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
