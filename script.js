// Add your own photo filenames here. Keep the pictures inside assets/photos/.
const PHOTO_FILES = [
  "assets/photos/photo1.jpg",
  "assets/photos/photo2.jpg",
  "assets/photos/photo3.jpg",
  "assets/photos/photo4.jpg",
  "assets/photos/photo5.jpg",
  "assets/photos/photo6.jpg",
  "assets/photos/photo7.jpg",
  "assets/photos/photo8.jpg",
  "assets/photos/photo9.jpg"
];

// Add your own music file inside assets/music/ and enter its path here.
// The day your story began, as "YYYY-MM-DD". Leave empty to hide the live counter.
const START_DATE = "2026-03-31"; // March 31, 2026

// Each reason opens as a card. Replace these with your own words, add or remove as you like.
const REASONS = [
  " I HAVE HUGE CRUSH SA IMOHA.",
  "You alwayss care for me and to your family jud.",
  "Your laugh is one of my favorite sounds.",
  "Your the braves person I ever met.",
  "You always remind me sa mga tanan bagay and I feel much love to you my sweet babieee.",
  "I feels like coming home to you always."
];

const MUSIC_FILE = "assets/music/music5.mp3"; // Example: "assets/music/our-song.mp3"

const hearts = document.getElementById("hearts");
const symbols = ["❤️", "💗", "💕", "♡", "✦", "✨"];
for (let i = 0; i < 28; i++) {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
  heart.style.left = Math.random() * 100 + "%";
  heart.style.animationDuration = (7 + Math.random() * 10) + "s";
  heart.style.animationDelay = (Math.random() * 8) + "s";
  heart.style.fontSize = (14 + Math.random() * 18) + "px";
  hearts.appendChild(heart);
}

let current = 0;
let timer = null;
const gallery = document.getElementById("gallery");
const placeholder = document.getElementById("placeholder");
const dots = document.getElementById("dots");
const slideCount = document.getElementById("slideCount");
const photoSlides = PHOTO_FILES.map((src, index) => ({ src, index }));

function renderSlides() {
  gallery.querySelectorAll(".slide").forEach(slide => slide.remove());
  dots.innerHTML = "";
  if (!photoSlides.length) {
    placeholder.style.display = "flex";
    slideCount.textContent = "0 / 0";
    return;
  }
  placeholder.style.display = "none";
  photoSlides.forEach((photo, index) => {
    const wrap = document.createElement("div");
    wrap.className = "slide" + (index === 0 ? " active" : "");
    const img = document.createElement("img");
    img.src = photo.src;
    img.alt = `Memory ${index + 1}`;
    img.onerror = () => { img.alt = `Could not load ${photo.src}. Check the filename and folder.`; };
    const caption = document.createElement("div");
    caption.className = "caption";
    caption.textContent = `Memory ${index + 1} ❤️`;
    wrap.append(img, caption);
    gallery.appendChild(wrap);

    const dot = document.createElement("button");
    dot.className = "dot" + (index === 0 ? " active" : "");
    dot.type = "button";
    dot.setAttribute("aria-label", `Show memory ${index + 1}`);
    dot.addEventListener("click", () => goTo(index));
    dots.appendChild(dot);
  });
  current = 0;
  updateGallery();
  startSlideshow();
}
function updateGallery() {
  const all = [...gallery.querySelectorAll(".slide")];
  const allDots = [...dots.querySelectorAll(".dot")];
  all.forEach((slide, index) => slide.classList.toggle("active", index === current));
  allDots.forEach((dot, index) => dot.classList.toggle("active", index === current));
  slideCount.textContent = photoSlides.length ? `${current + 1} / ${photoSlides.length}` : "0 / 0";
}
function goTo(index) {
  if (!photoSlides.length) return;
  current = (index + photoSlides.length) % photoSlides.length;
  updateGallery();
}
function nextSlide() { goTo(current + 1); startSlideshow(); }
function previousSlide() { goTo(current - 1); startSlideshow(); }
function startSlideshow() {
  clearInterval(timer);
  if (photoSlides.length > 1) timer = setInterval(() => goTo(current + 1), 5000);
}
document.getElementById("nextBtn").addEventListener("click", nextSlide);
document.getElementById("prevBtn").addEventListener("click", previousSlide);
gallery.addEventListener("mouseenter", () => clearInterval(timer));
gallery.addEventListener("mouseleave", startSlideshow);
renderSlides();

const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const progress = document.getElementById("progress");
const progressFill = progress.querySelector("span");
const time = document.getElementById("time");
if (MUSIC_FILE) {
  audio.src = MUSIC_FILE;
  audio.load();
}
playBtn.addEventListener("click", async () => {
  if (!audio.src) {
    showResponse("Add your song file path in script.js first. 🎵");
    return;
  }
  if (audio.paused) {
    try {
      await audio.play();
      playBtn.textContent = "❚❚";
    } catch {
      showResponse("The song could not play. Check the music filename and try again.");
    }
  } else {
    audio.pause();
    playBtn.textContent = "▶";
  }
});
audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;
  progressFill.style.width = (audio.currentTime / audio.duration * 100) + "%";
  time.textContent = formatTime(audio.currentTime);
});
audio.addEventListener("ended", () => playBtn.textContent = "▶");
function seekAudio(event) {
  if (!audio.duration) return;
  const rect = progress.getBoundingClientRect();
  const position = event.clientX ?? (rect.left + rect.width / 2);
  audio.currentTime = Math.max(0, Math.min(1, (position - rect.left) / rect.width)) * audio.duration;
}
progress.addEventListener("click", seekAudio);
progress.addEventListener("keydown", event => {
  if (event.key === "ArrowRight") audio.currentTime = Math.min(audio.duration || 0, audio.currentTime + 5);
  if (event.key === "ArrowLeft") audio.currentTime = Math.max(0, audio.currentTime - 5);
});
function formatTime(seconds) {
  seconds = Math.floor(seconds || 0);
  return Math.floor(seconds / 60) + ":" + String(seconds % 60).padStart(2, "0");
}

function showResponse(message) {
  const box = document.getElementById("response");
  box.textContent = message;
  box.style.display = "block";
  box.scrollIntoView({ behavior: "smooth", block: "center" });
}
document.getElementById("moodBtn").addEventListener("click", event => {
  document.body.classList.toggle("night");
  burst(event);
});

function burst(event) {
  const x = event?.clientX || window.innerWidth / 2;
  const y = event?.clientY || window.innerHeight / 2;
  for (let i = 0; i < 12; i++) {
    const spark = document.createElement("div");
    spark.className = "spark";
    spark.textContent = ["❤️", "💗", "✨", "💕"][Math.floor(Math.random() * 4)];
    spark.style.left = x + "px";
    spark.style.top = y + "px";
    spark.style.setProperty("--x", (Math.random() * 220 - 110) + "px");
    spark.style.setProperty("--y", (Math.random() * 220 - 160) + "px");
    document.body.appendChild(spark);
    setTimeout(() => spark.remove(), 900);
  }
}

// ---------- Live counter ----------
(function () {
  const text = document.getElementById("counterText");
  const boxes = document.getElementById("counterBoxes");
  const start = START_DATE ? new Date(START_DATE + "T00:00:00") : null;
  if (!start || isNaN(start)) {
    text.textContent = "Set START_DATE in script.js to show how long we have known each other.";
    boxes.style.display = "none";
    return;
  }
  text.textContent = "Every second of this was time spent with you.";
  function tick() {
    const s = Math.max(0, Math.floor((Date.now() - start) / 1000));
    document.getElementById("cDays").textContent = Math.floor(s / 86400).toLocaleString();
    document.getElementById("cHours").textContent = Math.floor(s % 86400 / 3600);
    document.getElementById("cMins").textContent = Math.floor(s % 3600 / 60);
    document.getElementById("cSecs").textContent = s % 60;
  }
  tick();
  setInterval(tick, 1000);
})();

// ---------- Reasons: tap to open ----------
(function () {
  const wrap = document.getElementById("reasons");
  REASONS.forEach(reason => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "reason";
    card.setAttribute("aria-expanded", "false");
    card.innerHTML = '<span class="closed">💗</span><span class="open-text"></span>';
    card.querySelector(".open-text").textContent = reason;
    card.addEventListener("click", event => {
      const open = card.classList.toggle("open");
      card.setAttribute("aria-expanded", open);
      if (open) burst(event);
    });
    wrap.appendChild(card);
  });
})();

// ---------- Promises: tap to seal ----------
(function () {
  const items = [...document.querySelectorAll(".promise")];
  const count = document.getElementById("sealCount");
  const fill = document.getElementById("sealFill");
  const note = document.getElementById("sealNote");
  items.forEach(item => item.addEventListener("click", event => {
    const sealed = item.classList.toggle("sealed");
    item.setAttribute("aria-pressed", sealed);
    if (sealed) burst(event);
    const n = items.filter(i => i.classList.contains("sealed")).length;
    count.textContent = `${n} of ${items.length} promises sealed`;
    fill.style.width = (n / items.length * 100) + "%";
    note.textContent = n === items.length
      ? "Every promise is sealed. Now the only thing left to do is keep them. ❤️" : "";
    note.style.display = n === items.length ? "block" : "none";
  }));
})();

// ---------- How are you feeling ----------
const MOOD_REPLIES = {
  hurt: "That is fair, and I will not rush it. Your hurt matters more than my wish to fix things. Tell me more whenever you want; I will listen without defending myself.",
  time: "Take all the time you need. I will not push, and I will not disappear. When you are ready, I will be here.",
  miss: "I miss us too. Missing each other does not mean we have to rush. We can begin with one small, honest conversation.",
  talk: "Thank you. When we talk, I will listen first, stay calm, and try to understand before I answer. Reach out whenever it suits you. ❤️"
};
document.querySelectorAll(".mood").forEach(btn => btn.addEventListener("click", event => {
  document.querySelectorAll(".mood").forEach(b => b.classList.toggle("active", b === btn));
  burst(event);
  showResponse(MOOD_REPLIES[btn.dataset.mood]);
}));

// ---------- Write me something ----------
const note = document.getElementById("note");
document.getElementById("copyBtn").addEventListener("click", async () => {
  if (!note.value.trim()) return showResponse("Write a few words first, then copy them. 💗");
  try {
    await navigator.clipboard.writeText(note.value);
    showResponse("Copied. Paste it into any chat whenever you feel ready. 💗");
  } catch {
    note.select();
    showResponse("Your browser blocked copying. The text is selected, so press Ctrl+C (or Cmd+C).");
  }
});
document.getElementById("shareBtn").addEventListener("click", async () => {
  if (!note.value.trim()) return showResponse("Write a few words first, then share them. 💗");
  if (!navigator.share) return showResponse("Sharing is not supported here. Use Copy message instead.");
  try { await navigator.share({ text: note.value }); } catch { /* cancelled */ }
});

// Keyboard: left/right arrows browse photos.
document.addEventListener("keydown", event => {
  if (/^(TEXTAREA|INPUT)$/.test(event.target.tagName) || event.target === progress) return;
  if (event.key === "ArrowRight") nextSlide();
  if (event.key === "ArrowLeft") previousSlide();
});

// ---------- Music autoplay ----------
// Browsers block sound until the visitor interacts with the page, so we try to
// start right away and, if blocked, start on the first tap, click or key press.
audio.loop = true;
audio.addEventListener("play", () => { playBtn.textContent = "❚❚"; });
audio.addEventListener("pause", () => { playBtn.textContent = "▶"; });
if (MUSIC_FILE) {
  const events = ["click", "touchend", "keydown"];
  const unlock = () => {
    audio.play().then(() => events.forEach(e => document.removeEventListener(e, unlock))).catch(() => {});
  };
  audio.play().catch(() => events.forEach(e => document.addEventListener(e, unlock)));
}
