const express = require('express');
const path = require('path');
const app = express();

// Railway 會自動注入 PORT 變數，沒有的話預設為 3000
const PORT = process.env.PORT || 3000;

// 🔒 核心關鍵：必須注入這兩個安全標頭，否則本地端 Worker 晶片會被瀏覽器安全性阻擋
app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    next();
});

// 📂 對外開放 public 資料夾（確保靜態檔案可以直接被讀取）
app.use(express.static(path.join(__dirname, 'public')));

// 🏠 導向首頁路由（當訪問網址時，直接給他 public 資料夾裡的 index.html）
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 啟動伺服器並監聽
app.listen(PORT, () => {
    console.log(`Server 主程式啟動成功，目前監聽連接埠： ${PORT}`);
});
