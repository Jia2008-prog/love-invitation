const $ = (id) => document.getElementById(id);

const scenes = ["intro", "letterScene", "questionScene", "successScene"];
function showScene(id) {
  scenes.forEach(scene => $(scene).classList.toggle("hidden", scene !== id));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

const envelopeButton = $("openEnvelope");
function openLetter() {
  if (envelopeButton.classList.contains("open")) return;
  envelopeButton.classList.add("open");
  $("openText").textContent = "信封正在為妳打開……";
  setTimeout(() => showScene("letterScene"), 1050);
}
envelopeButton.addEventListener("click", openLetter);
$("openText").addEventListener("click", openLetter);

// 將下方照片路徑換成你自己的照片；照片放在 photos 資料夾內。
const photos = [
  { src: "photos/photo-1.jpg", caption: "a moment to remember ♡" },
  { src: "photos/photo-2.jpg", caption: "little things, lovely days ♡" },
  { src: "photos/photo-3.jpg", caption: "my favorite memories ♡" }
];
let photoIndex = 0;
function renderPhoto() {
  const photo = photos[photoIndex];
  $("memoryPhoto").src = photo.src;
  $("memoryPhoto").alt = `我們的回憶照片 ${photoIndex + 1}`;
  $("photoCaption").textContent = photo.caption;
  $("photoDots").innerHTML = "";
  photos.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = `photo-dot ${index === photoIndex ? "active" : ""}`;
    dot.setAttribute("aria-label", `第 ${index + 1} 張照片`);
    dot.addEventListener("click", () => { photoIndex = index; renderPhoto(); });
    $("photoDots").appendChild(dot);
  });
}
function changePhoto(direction) {
  photoIndex = (photoIndex + direction + photos.length) % photos.length;
  renderPhoto();
}
$("prevPhoto").addEventListener("click", () => changePhoto(-1));
$("nextPhoto").addEventListener("click", () => changePhoto(1));
renderPhoto();

$("toQuestion").addEventListener("click", () => showScene("questionScene"));

const gentleMessages = [
  "真的不再考慮一下嗎？我可是期待了好久呢！🥺",
  "如果可以，我想把每一個平凡的日子，都變成和妳的特別回憶。",
  "世界上有好多有趣的地方，但我最期待的，還是有妳一起去的地方。",
  "我想把好多好多的喜歡，都留在我們相處的每一個瞬間。",
  "最後再問一次嘛，讓我有機會陪妳度過這一天，好不好？❤️",
  "其實只要有妳在，平凡的一天也會變得很特別。💕"
];

let gentleIndex = -1;
let noClickCount = 0;

const noButton = $("noButton");
const yesButton = $("yesButton");

noButton.addEventListener("click", () => {
  noClickCount++;

  // 同意按鈕逐漸放大，最多 1.25 倍
  const yesScale = Math.min(1 + noClickCount * 0.08, 1.25);

  // 拒絕按鈕逐漸縮小，最小 0.65 倍
  const noScale = Math.max(1 - noClickCount * 0.1, 0.65);

  yesButton.style.transform = `scale(${yesScale})`;
  noButton.style.transform = `scale(${noScale})`;

  // 依序顯示文字，最後停留在最後一句
  gentleIndex = Math.min(gentleIndex + 1, gentleMessages.length - 1);

  $("gentleNote").textContent = gentleMessages[gentleIndex];
});

function createHearts(count = 34) {
  const symbols = ["♡", "♥", "✦", "୨୧"];
  for (let i = 0; i < count; i++) {
    const heart = document.createElement("span");
    heart.className = "heart-particle";
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.top = `${55 + Math.random() * 35}%`;
    heart.style.fontSize = `${12 + Math.random() * 22}px`;
    heart.style.setProperty("--drift", `${-90 + Math.random() * 180}px`);
    heart.style.animationDelay = `${Math.random() * .7}s`;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 3600);
  }
}
$("yesButton").addEventListener("click", () => {
  showScene("successScene");
  createHearts();
});

$("replayButton").addEventListener("click", () => {
  envelopeButton.classList.remove("open");
  $("openText").textContent = "點擊信封，收下這份心意";

  // 重置照片
  photoIndex = 0;
  renderPhoto();

  // 重置按鈕大小
  noClickCount = 0;
  gentleIndex = -1;
  yesButton.style.transform = "scale(1)";
  noButton.style.transform = "scale(1)";

  // 重置提示文字
  $("gentleNote").textContent = "選一個妳喜歡的答案吧！";

  showScene("intro");
});

// 音樂必須由使用者點擊後才能播放；請自行放入有使用權的 music.mp3。
const music = $("bgMusic");
$("musicToggle").addEventListener("click", async () => {
  if (music.paused) {
    try {
      await music.play();
      $("musicLabel").textContent = "暫停音樂";
      $("musicToggle").classList.add("playing");
    } catch (error) {
      $("musicLabel").textContent = "請確認 music.mp3";
    }
  } else {
    music.pause();
    $("musicLabel").textContent = "播放音樂";
    $("musicToggle").classList.remove("playing");
  }
});
music.addEventListener("ended", () => {
  $("musicLabel").textContent = "播放音樂";
  $("musicToggle").classList.remove("playing");
});
// ==============================
// 約會倒數計時器
// ==============================

const dateTarget = new Date(2026, 10, 25, 0, 0, 0).getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = dateTarget - now;

  if (distance <= 0) {
    $("days").textContent = "00";
    $("hours").textContent = "00";
    $("minutes").textContent = "00";
    $("seconds").textContent = "00";
    $("countdownMessage").textContent = "今天就是我們的約會日！♡";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  $("days").textContent = String(days).padStart(2, "0");
  $("hours").textContent = String(hours).padStart(2, "0");
  $("minutes").textContent = String(minutes).padStart(2, "0");
  $("seconds").textContent = String(seconds).padStart(2, "0");
}

// 立即執行一次，之後每秒更新
updateCountdown();
setInterval(updateCountdown, 1000);

// ==============================
// 愛心彩蛋動畫
// ==============================

document.addEventListener("click", function(event) {
  const heart = document.createElement("span");

  heart.className = "floating-heart";

  // 隨機愛心樣式
  const hearts = ["♡", "♥", "💕", "💗", "💖"];
  heart.textContent = hearts[
    Math.floor(Math.random() * hearts.length)
  ];

  // 設定愛心出現的位置
  heart.style.left = event.clientX + "px";
  heart.style.top = event.clientY + "px";

  // 隨機大小
  heart.style.fontSize = (18 + Math.random() * 18) + "px";

  document.body.appendChild(heart);

  // 動畫結束後移除元素
  heart.addEventListener("animationend", function() {
    heart.remove();
  });
});
