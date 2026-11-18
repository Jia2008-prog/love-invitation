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
  "不急，照妳的心意就好。",
  "可以慢慢想，我想讓妳自在地決定。",
  "如果需要討論日期和地點，我們可以一起安排。"
];
let gentleIndex = 0;
$("noButton").addEventListener("click", () => {
  gentleIndex = (gentleIndex + 1) % gentleMessages.length;
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
  photoIndex = 0;
  renderPhoto();
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
