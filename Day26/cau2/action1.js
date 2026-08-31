const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const tabButtons = $$(".tab-btn");
const tabPanels = $$(".tab-panel");
const tabsWrapper = document.querySelector(".tabs-wrapper");

// ham de hien tab ra khi nhan vao btn
function showTab(index) {
  for (let i = 0; i < tabButtons.length; i++) {
    if (i === index) {
      tabButtons[i].classList.add("active"); // them class active để đổi màu
      tabButtons[i].setAttribute("aria-selected", "true");
    } else {
      // Các tab còn lại -> bỏ class "active"
      tabButtons[i].classList.remove("active");
      tabButtons[i].setAttribute("aria-selected", "false");
    }
  }

  // Duyệt qua từng nội dung tab để hiện/ẩn tương ứng
  for (let i = 0; i < tabPanels.length; i++) {
    if (i === index) {
      // Đây là nội dung của tab được chọn -> thêm class "active" -> CSS sẽ hiện ra
      tabPanels[i].classList.add("active");
    } else {
      // Các nội dung còn lại -> bỏ class "active" -> CSS sẽ ẩn đi (display:none)
      tabPanels[i].classList.remove("active");
    }
  }
}

// ==========================================
// BƯỚC 3: Xử lý khi click vào tab button
// ==========================================

// Duyệt qua từng tab button, gắn sự kiện click cho mỗi cái
for (let i = 0; i < tabButtons.length; i++) {
  // Lưu lại số thứ tự (index) của tab này vào 1 biến riêng
  // (bắt buộc phải làm vậy để mỗi lần click nhớ đúng số thứ tự của NÓ,
  // không bị nhớ nhầm sang số cuối cùng của vòng lặp)
  const currentIndex = i;

  tabButtons[i].addEventListener("click", function () {
    showTab(currentIndex); // chuyển sang tab vừa click
    tabButtons[currentIndex].focus(); // đưa focus vào tab đó, để bấm mũi tên hoạt động tiếp
  });
}

// ==========================================
// BƯỚC 4: Hàm tìm xem tab nào đang active
// ==========================================

function findActiveTabIndex() {
  for (let i = 0; i < tabButtons.length; i++) {
    if (tabButtons[i].classList.contains("active")) {
      return i; // tìm thấy -> trả về vị trí ngay
    }
  }
  return 0; // phòng trường hợp không tìm thấy, mặc định trả về tab đầu
}

// ==========================================
// BƯỚC 5: Xử lý khi bấm phím mũi tên trái/phải
// ==========================================

function handleArrowKeys(event) {
  // Chỉ xử lý 2 phím này, còn lại thì bỏ qua, không làm gì cả
  if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
    return;
  }

  const activeIndex = findActiveTabIndex(); // tab hiện tại đang ở đâu
  const lastIndex = tabButtons.length - 1; // vị trí của tab cuối cùng

  let nextIndex; // sẽ chứa vị trí tab kế tiếp cần chuyển tới

  if (event.key === "ArrowLeft") {
    // Bấm mũi tên TRÁI -> lùi về 1 tab
    if (activeIndex === 0) {
      // Nếu đang ở tab đầu tiên -> vòng về tab cuối cùng
      nextIndex = lastIndex;
    } else {
      nextIndex = activeIndex - 1;
    }
  }

  if (event.key === "ArrowRight") {
    // Bấm mũi tên PHẢI -> tiến tới 1 tab
    if (activeIndex === lastIndex) {
      // Nếu đang ở tab cuối cùng -> vòng về tab đầu tiên
      nextIndex = 0;
    } else {
      nextIndex = activeIndex + 1;
    }
  }

  event.preventDefault(); // chặn hành vi mặc định (VD: cuộn trang)
  showTab(nextIndex); // chuyển sang tab kế tiếp
  tabButtons[nextIndex].focus(); // focus vào tab kế tiếp để bấm mũi tên tiếp tục hoạt động
}

// ==========================================
// BƯỚC 6: Chỉ lắng nghe phím khi đang ở trong vùng tabs
// ==========================================

// "focusin" xảy ra khi có bất kỳ phần tử nào bên trong tabsWrapper nhận focus
tabsWrapper.addEventListener("focusin", function () {
  document.addEventListener("keydown", handleArrowKeys);
});

// "focusout" xảy ra khi focus rời khỏi 1 phần tử bên trong tabsWrapper
tabsWrapper.addEventListener("focusout", function (event) {
  // event.relatedTarget là phần tử SẮP nhận focus tiếp theo
  // Nếu phần tử đó vẫn nằm trong tabsWrapper -> nghĩa là focus chỉ
  // chuyển nội bộ (VD: từ tab này sang tab khác) -> KHÔNG gỡ listener
  const focusVanRaNgoai = !tabsWrapper.contains(event.relatedTarget);

  if (focusVanRaNgoai) {
    document.removeEventListener("keydown", handleArrowKeys);
  }
});
