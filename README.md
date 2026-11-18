# 給妳的一封邀請函 ♡

這是一個純 HTML / CSS / JavaScript 的互動式約會邀請函，適合部署到 GitHub Pages。

## 檔案結構

```text
romantic_invitation/
├── index.html
├── style.css
├── script.js
├── music.mp3
└── photos/
    ├── photo-1.jpg
    ├── photo-2.jpg
    └── photo-3.jpg
```

## 個人化設定

1. 把 `photos` 資料夾中的三張範例圖片換成你們的照片，檔名維持 `photo-1.jpg`、`photo-2.jpg`、`photo-3.jpg`。
2. 將你有權使用的背景音樂檔放在根目錄，命名為 `music.mp3`。若暫時沒有音樂，可以先不放；其他功能仍可使用。
3. 開啟 `index.html`，找到信件文字、日期與地點，改成你想對她說的內容。
4. 照片輪播的文字可在 `script.js` 裡的 `photos` 陣列修改。

## 本機預覽

直接用瀏覽器開啟 `index.html` 即可。若瀏覽器對本機音訊有限制，可用 VS Code 的 Live Server 預覽。

## 部署到 GitHub Pages

1. 在 GitHub 建立一個新的 Public repository，例如 `love-invitation`。
2. 將整個資料夾中的檔案上傳到 repository 根目錄。
3. 到 repository 的 **Settings → Pages**。
4. 在 **Build and deployment** 選擇 **Deploy from a branch**。
5. Branch 選 `main`，資料夾選 `/(root)`，按 Save。
6. 等待部署完成，GitHub Pages 會提供可分享的網址。

## 小提醒

- 請先在自己的電腦測試照片、文字和音樂。
- 背景音樂不會自動播放，訪客需要按右下角的「播放音樂」。
- 如果照片不顯示，請確認資料夾名稱、檔名大小寫及副檔名完全一致。
- 網頁已加入手機版排版，但整體優先以桌面瀏覽器呈現。
