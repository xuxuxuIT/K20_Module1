// script.js — Trang chủ + Trang Fingerprinting (điều hướng kiểu SPA bằng history API)

const $ = document.querySelector.bind(document);

// ============================================================
// DOM REFS
// ============================================================
const homeView = $("#homeView");
const fingerprintView = $("#fingerprintView");

const infoLocation = $("#infoLocation");
const onlineDot = $("#onlineDot");
const infoOnline = $("#infoOnline");
const infoBrowser = $("#infoBrowser");
const infoOS = $("#infoOS");
const infoLanguages = $("#infoLanguages");
const infoScreen = $("#infoScreen");
const infoOrientation = $("#infoOrientation");

const adBanner = $("#adBanner");
const goFingerprintBtn = $("#goFingerprintBtn");
const backHomeBtn = $("#backHomeBtn");

const fingerprintString = $("#fingerprintString");
const fpLocation = $("#fpLocation");
const fpOnline = $("#fpOnline");
const fpBrowser = $("#fpBrowser");
const fpOS = $("#fpOS");
const fpLanguages = $("#fpLanguages");
const fpScreen = $("#fpScreen");

// ============================================================
// 1) THU THẬP THÔNG TIN TỪ BOM (Browser Object Model)
// ============================================================

// Đổi tên bạn ở đây để dùng cho tham số utm_source của banner quảng cáo
const YOUR_NAME = "hoc_vien_01";

function detectBrowser(ua) {
  if (/Edg\//.test(ua)) return "Microsoft Edge";
  if (/OPR\//.test(ua) || /Opera/.test(ua)) return "Opera";
  if (/Chrome\//.test(ua) && !/Edg\//.test(ua)) return "Google Chrome";
  if (/Firefox\//.test(ua)) return "Mozilla Firefox";
  if (/Safari\//.test(ua) && !/Chrome\//.test(ua)) return "Safari";
  return "Không xác định";
}

function detectOS(ua) {
  if (/Windows NT 10/.test(ua)) return "Windows 10/11";
  if (/Windows NT/.test(ua)) return "Windows";
  if (/Mac OS X/.test(ua)) return "macOS";
  if (/Android/.test(ua)) return "Android";
  if (/iPhone|iPad|iPod|iOS/.test(ua)) return "iOS";
  if (/Linux/.test(ua)) return "Linux";
  return "Không xác định";
}

function getOrientation() {
  if (screen.orientation && screen.orientation.type) {
    return screen.orientation.type; // vd: "landscape-primary"
  }
  // fallback cho trình duyệt cũ không hỗ trợ screen.orientation
  return window.matchMedia("(orientation: portrait)").matches
    ? "portrait"
    : "landscape";
}

// Thu thập các thông tin ĐỒNG BỘ (không cần chờ) — dùng chung cho cả
// trang chủ lẫn khi build lại state cho fingerprinting.
function collectSyncInfo() {
  const ua = navigator.userAgent;
  return {
    online: navigator.onLine,
    browser: detectBrowser(ua),
    os: detectOS(ua),
    languages: navigator.languages
      ? navigator.languages.join(", ")
      : navigator.language,
    screenSize: `${screen.width} x ${screen.height}`,
    orientation: getOrientation(),
  };
}

// Vị trí (geolocation) là bất đồng bộ, tách riêng để không chặn phần còn lại
function getLocationText(callback) {
  if (!navigator.geolocation) {
    callback("Trình duyệt không hỗ trợ Geolocation");
    return;
  }
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = pos.coords.latitude.toFixed(4);
      const lng = pos.coords.longitude.toFixed(4);
      callback(`${lat}, ${lng}`);
    },
    () => {
      callback("Không thể lấy vị trí (bị từ chối quyền hoặc không hỗ trợ)");
    },
  );
}

// ============================================================
// 2) RENDER TRANG CHỦ
// ============================================================

// Lưu lại info mới nhất để dùng khi bấm nút "Xem vân tay thiết bị"
let currentInfo = {
  location: "Đang lấy vị trí...",
  ...collectSyncInfo(),
};

function renderOnlineStatus(isOnline) {
  infoOnline.textContent = isOnline ? "Online" : "Offline";
  onlineDot.classList.remove("bg-green-500", "bg-red-500", "bg-slate-300");
  onlineDot.classList.add(isOnline ? "bg-green-500" : "bg-red-500");
}

function renderHomeInfo() {
  infoLocation.textContent = currentInfo.location;
  renderOnlineStatus(currentInfo.online);
  infoBrowser.textContent = currentInfo.browser;
  infoOS.textContent = currentInfo.os;
  infoLanguages.textContent = currentInfo.languages;
  infoScreen.textContent = currentInfo.screenSize;
  infoOrientation.textContent = currentInfo.orientation;
}

renderHomeInfo();

// Lấy vị trí (bất đồng bộ) rồi cập nhật lại UI + currentInfo khi có kết quả
getLocationText((text) => {
  currentInfo.location = text;
  infoLocation.textContent = text;
});

// Theo dõi thay đổi trạng thái mạng theo thời gian thực
window.addEventListener("online", () => {
  currentInfo.online = true;
  renderOnlineStatus(true);
});
window.addEventListener("offline", () => {
  currentInfo.online = false;
  renderOnlineStatus(false);
});

// Gán href cho banner quảng cáo với đúng định dạng utm_source & utm_campaign
adBanner.href = `campaign.html?utm_source=${encodeURIComponent(YOUR_NAME)}&utm_campaign=campage_1`;

// ============================================================
// 3) CHUYỂN SANG TRANG FINGERPRINTING (SPA bằng history.pushState)
// ============================================================

function buildFingerprintString(state) {
  // Yêu cầu đề: dùng phép NỐI CHUỖI (không dùng JSON.stringify)
  return (
    "location=" +
    state.location +
    " | online=" +
    state.online +
    " | browser=" +
    state.browser +
    " | os=" +
    state.os +
    " | languages=" +
    state.languages +
    " | screen=" +
    state.screenSize +
    " | orientation=" +
    state.orientation
  );
}

function renderFingerprintView(state) {
  fpLocation.textContent = state.location;
  fpOnline.textContent = state.online ? "Online" : "Offline";
  fpBrowser.textContent = state.browser;
  fpOS.textContent = state.os;
  fpLanguages.textContent = state.languages;
  fpScreen.textContent = `${state.screenSize} — ${state.orientation}`;

  fingerprintString.textContent = buildFingerprintString(state);
}

function showHomeView() {
  fingerprintView.classList.add("hidden");
  homeView.classList.remove("hidden");
}

function showFingerprintView(state) {
  homeView.classList.add("hidden");
  fingerprintView.classList.remove("hidden");
  renderFingerprintView(state);
}

goFingerprintBtn.addEventListener("click", () => {
  const state = { page: "fingerprint", ...currentInfo };

  // pushState: đổi URL sang ?view=fingerprint mà KHÔNG reload trang,
  // đồng thời mang theo toàn bộ dữ liệu qua tham số state.
  history.pushState(state, "Fingerprinting", "?view=fingerprint");

  showFingerprintView(state);
});

backHomeBtn.addEventListener("click", () => {
  // Dùng history.back() để quay lại đúng entry trước đó trong lịch sử
  // (sẽ tự động kích hoạt sự kiện popstate bên dưới để hiện lại trang chủ).
  history.back();
});

// ============================================================
// 4) ĐỒNG BỘ VỚI NÚT BACK / FORWARD CỦA TRÌNH DUYỆT
// ============================================================
window.addEventListener("popstate", (e) => {
  if (e.state && e.state.page === "fingerprint") {
    showFingerprintView(e.state);
  } else {
    showHomeView();
  }
});

// ============================================================
// 5) XỬ LÝ KHI TRUY CẬP TRỰC TIẾP VÀO ?view=fingerprint (vd: reload trang)
// ============================================================
(function initRouting() {
  const params = new URLSearchParams(location.search);

  if (params.get("view") === "fingerprint") {
    if (history.state && history.state.page === "fingerprint") {
      // Đã có sẵn state (ví dụ do vừa reload lại đúng entry pushState)
      showFingerprintView(history.state);
    } else {
      // Không có state (mở thẳng URL này lần đầu) -> thu thập lại dữ liệu
      // đồng bộ và replaceState để lần back/forward sau vẫn có dữ liệu.
      const state = {
        page: "fingerprint",
        location: "Không có sẵn (vừa reload)",
        ...collectSyncInfo(),
      };
      history.replaceState(state, "Fingerprinting", location.href);
      showFingerprintView(state);
    }
  } else {
    showHomeView();
  }
})();
