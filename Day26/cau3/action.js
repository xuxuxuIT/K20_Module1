const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const slider = $("#slider");
const track = $("#track");
const slides = $$(".slide");
const prevBtn = $("#prevBtn");
const nextBtn = $("#nextBtn");
const dots = $$(".dot");
const counter = $("#counter");

const REAL_COUNT = dots.length;
let currentIndex = 1;
let autoplayTimer = null;
const AUTOPLAY_DELAY = 3000;

// di chuyen track
function moveTrack(withTransition = true) {
  track.style.transition = withTransition ? "transform 0.5s ease" : "none";
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
}

//quy doi currentIndex
function getRealIndex() {
  if (currentIndex === 0) return REAL_COUNT; // đang ở clone ảnh cuối
  if (currentIndex === REAL_COUNT + 1) return 1; // đang ở clone ảnh đầu
  return currentIndex; // đang ở ảnh thật bình thường
}

//cap nhat active + counter
function updateUI() {
  const real = getRealIndex();

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === real - 1); // mảng 0-based nên trừ 1
  });

  counter.textContent = `${real} / ${REAL_COUNT}`;
}

// nut , tien , lui
function nextSlide() {
  currentIndex++;
  moveTrack(true);
  updateUI();
}

function prevSlide() {
  currentIndex--;
  moveTrack(true);
  updateUI();
}

// xu li nhay vi tri
function handleTransitionEnd() {
  if (currentIndex === REAL_COUNT + 1) {
    // vừa trượt tới clone ảnh đầu -> nhảy về ảnh thật số 1, không hiệu ứng
    currentIndex = 1;
    moveTrack(false);
    updateUI();
  } else if (currentIndex === 0) {
    // vừa trượt tới clone ảnh cuối -> nhảy về ảnh thật cuối, không hiệu ứng
    currentIndex = REAL_COUNT;
    moveTrack(false);
    updateUI();
  }
}

track.addEventListener("transitionend", handleTransitionEnd);

//autoplay
function startAutoplay() {
  stopAutoplay(); // tránh tạo trùng nhiều interval chạy song song
  autoplayTimer = setInterval(nextSlide, AUTOPLAY_DELAY);
}

function stopAutoplay() {
  clearInterval(autoplayTimer);
}

function resetAutoplay() {
  startAutoplay(); // huỷ đếm cũ + đếm lại từ đầu = "reset 3 giây"
}

slider.addEventListener("mouseenter", stopAutoplay);
slider.addEventListener("mouseleave", startAutoplay);

//su kien nut pre,next
function handleNextClick() {
  nextSlide();
  resetAutoplay();
}

function handlePrevClick() {
  prevSlide();
  resetAutoplay();
}

nextBtn.addEventListener("click", handleNextClick);
prevBtn.addEventListener("click", handlePrevClick);

//su kien click dot
function handleDotClick(dot) {
  currentIndex = Number(dot.dataset.index); // dot chỉ lưu số ảnh thật (1..5)
  moveTrack(true);
  updateUI();
  resetAutoplay();
}

dots.forEach((dot) => {
  dot.addEventListener("click", () => handleDotClick(dot));
});

//dieu khien ban phim
function handleKeydown(e) {
  if (e.key === "ArrowLeft") {
    prevSlide();
    resetAutoplay();
  } else if (e.key === "ArrowRight") {
    nextSlide();
    resetAutoplay();
  }
}

function handleSliderMousedown() {
  // Chủ động focus slider khi click chuột vào bên trong, vì không phải
  // trình duyệt nào cũng tự focus <button> khi click bằng chuột.
  slider.focus();
}

function handleFocusIn() {
  // focusin có bubbling: focus vào bất kỳ phần tử con nào (nút, dot...)
  // bên trong slider cũng kích hoạt hàm này.
  document.addEventListener("keydown", handleKeydown);
}

function handleFocusOut(e) {
  // e.relatedTarget là phần tử SẮP nhận focus. Nếu nó vẫn nằm trong
  // slider (ví dụ chuyển focus giữa các nút/dot) thì chưa tính là "rời đi".
  if (slider.contains(e.relatedTarget)) return;
  document.removeEventListener("keydown", handleKeydown);
}

slider.addEventListener("mousedown", handleSliderMousedown);
slider.addEventListener("focusin", handleFocusIn);
slider.addEventListener("focusout", handleFocusOut);

// khoi tao
function init() {
  moveTrack(false); // đặt track đúng vị trí ban đầu, không hiệu ứng
  updateUI();
  startAutoplay();
}

init();
