const express = require('express');
const path = require('path');
const app = express();

// 關鍵核心：由 Railway 後端伺服器直接發送 Cross-Origin Isolation 標頭
app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    next();
});

// 靜態託管 index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 讀取 Railway 自動分配的 Port，預設為 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
