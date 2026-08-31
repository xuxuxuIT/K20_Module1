const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const tapWrapper = $(".tabs-wrapper");
const tabButtons = $$(".tab-btn");
const tabPanels = $$(".tab-panel");

// duyet qua cac buttons va doi mau khi click vao
function showTab(index) {
  for (let i = 0; i < tabButtons.length; i++) {
    if (i === index) {
      tabButtons[i].classList.add("active");
      tabButtons[i].setAttribute("aria-selected", "true"); // ho tro trinh doc man hinh
    } else {
      tabButtons[i].classList.remove("active");
      tabButtons[i].setAttribute("aria-selected", "false");
    }
  }

  // duyet qua noi dung tuong ung
  for (let i = 0; i < tabPanels.length; i++) {
    if (i === index) {
      tabPanels[i].classList.add("active");
    } else {
      tabPanels[i].classList.remove("active");
    }
  }
}

// xu li khi click vao button
for (let i = 0; i < tabButtons.length; i++) {
  const currentIndex = i;

  tabButtons[i].addEventListener("click", function () {
    showTab(currentIndex);
    tabButtons[currentIndex].focus();
  });
}

// ham tim xem tab nao dang active
function findActiveTabIndex() {
  for (let i = 0; i < tabButtons.length; i++) {
    if (tabButtons[i].classList.contains("active")) {
      return i;
    }
  }
  return 0;
}

// xu li khi bam phim mui ten trai phai
function handleArrowKeys(event) {
  if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
    return;
  }
  const activeIndex = findActiveTabIndex();
  const lastIndex = tabButtons.length - 1;
  let nextIndex;

  if (event.key === "ArrowLeft") {
    if (activeIndex === 0) {
      // neu o tab dau tien
      nextIndex = lastIndex;
    } else {
      nextIndex = activeIndex - 1;
    }
  }

  if (event.key === "ArrowRight") {
    if (activeIndex === lastIndex) {
      // neu dang o tab cuoi cung
      nextIndex = 0;
    } else {
      nextIndex = activeIndex + 1;
    }
  }

  event.preventDefault();
  showTab(nextIndex);
  tabButtons[nextIndex].focus();
}

// lang nghe khi o trong vung tab
tapWrapper.addEventListener("focusin", function () {
  document.addEventListener("keydown", handleArrowKeys);
});

tapWrapper.addEventListener("focusout", function (event) {
  const focusVanRaNgoai = !tapWrapper.contains(event.relatedTarget);
  if (focusVanRaNgoai) {
    document.removeEventListener("keydown", handleArrowKeys);
  }
});
