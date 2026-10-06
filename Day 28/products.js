const API_BASE = "https://dummyjson.com/products";
const LIMIT = 12;

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const searchInput = $("#searchInput");
// console.log(searchInput);
const categorySelect = $("#categorySelect");
// console.log(categorySelect);
const sortSelect = $("#sortSelect");
// console.log(sortSelect);
const loadingState = $("#loadingState");
// console.log(loadingState);
const errorState = $("#errorState");
// console.log(errorState);
const errorText = $("#errorText");
// console.log(errorText);
const productsGrid = $("#productsGrid");
// console.log(productsGrid);
const paginationEl = $("#pagination");
// console.log(paginationEl);

// luu trang thai hien tai cua trang
let state = {
  search: " ",
  category: " ",
  sortBy: "",
  order: "",
  page: 1,
};

let debounceTimer = null;

// lay danh muc
async function loadCategories() {
  try {
    const res = await fetch(`${API_BASE}/categories`);
    if (!res.ok) throw new Error("Không tải được danh mục sản phẩm");
    const categories = await res.json();

    categories.forEach((x) => {
      const slug = typeof x === "string" ? x : x.slug;
      const label = typeof x === "string" ? x : x.name;

      const option = document.createElement("option");
      option.value = slug;
      option.textContent = label;
      categorySelect.appendChild(option);
    });
  } catch (err) {
    console.error(err);
  }
}

// xay url goi api dua tren state hien tai
function buildApiUrl() {
  //tinh skip san pham de phan trang
  const skip = (state.page - 1) * LIMIT;

  //object de quan ly cac tham so query string
  const params = new URLSearchParams();
  params.set("limit", LIMIT);
  params.set("skip", skip);

  if (state.sortBy) {
    params.set("sortBy", state.sortBy);
    params.set("order", state.order);
  }

  if (state.search.trim()) {
    params.set("q", state.search.trim());
    return `${API_BASE}/search?${params.toString()}`;
  }

  if (state.category) {
    return `${API_BASE}/category/${encodeURIComponent(state.category)}?${params.toString()}`;
  }

  return `${API_BASE}?${params.toString()}`;
}

// tinh gia sau giam
function calcSalePrice(price, discountPercentage) {
  const sale = price - (price * discountPercentage) / 100;
  return Math.round(sale * 100) / 100;
}

function formatMoney(n) {
  return `$${n.toFixed(2)}`;
}

// render 1 danh muc san pham
function renderProductCard(p) {
  const salePrice = calcSalePrice(p.price, p.discountPercentage);
  const hasDiscount = p.discountPercentage > 0;
  let stockBadge;

  if (p.stock === 0) {
    stockBadge = `<span class="badge badge--out">Hết hàng</span>`;
  } else if (p.stock <= 10) {
    stockBadge = `<span class="badge badge--low">Còn ${p.stock}</span>`;
  } else {
    stockBadge = `<span class="badge badge--ok">Còn hàng</span>`;
  }

  const card = document.createElement("a");
  card.href = `product-detail.html?id=${p.id}`;
  card.className = "product-card";

  card.innerHTML = `
    <div class="product-card__image-wrap">
      <img src="${p.thumbnail}" alt="${escapeHtml(p.title)}" class="product-card__image">
      ${hasDiscount ? `<span class="product-card__discount-badge">-${Math.round(p.discountPercentage)}%</span>` : ""}
    </div>
    <div class="product-card__body">
      <h3 class="product-card__title">${escapeHtml(p.title)}</h3>
 
      <div class="product-card__rating">★ ${p.rating.toFixed(1)}</div>
 
      <div class="product-card__price-row">
        <span class="product-card__sale-price">${formatMoney(salePrice)}</span>
        ${hasDiscount ? `<span class="product-card__original-price">${formatMoney(p.price)}</span>` : ""}
      </div>
 
      <div>${stockBadge}</div>
    </div>
  `;

  return card;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// render pagination
function renderPagination(total) {
  const totalPages = Math.ceil(total / LIMIT);
  paginationEl.innerHTML = "";

  if (totalPages <= 1) {
    paginationEl.hidden = true;
    return;
  }
  paginationEl.hidden = false;

  function makeBtn(label, page, isActive = false, disabled = false) {
    const btn = document.createElement("button");
    btn.textContent = label;
    btn.disabled = disabled;
    btn.className =
      "pagination__btn" + (isActive ? " pagination__btn--active" : "");

    if (!disabled) {
      btn.addEventListener("click", () => {
        state.page = page;
        fetchAndRenderProducts();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
    return btn;
  }

  paginationEl.appendChild(
    makeBtn("← Trước", state.page - 1, false, state.page === 1),
  );

  // Hiển thị tối đa 5 số trang quanh trang hiện tại, tránh quá dài khi nhiều trang
  const start = Math.max(1, state.page - 2);
  const end = Math.min(totalPages, start + 4);

  for (let i = start; i <= end; i++) {
    paginationEl.appendChild(makeBtn(String(i), i, i === state.page));
  }

  paginationEl.appendChild(
    makeBtn("Sau →", state.page + 1, false, state.page === totalPages),
  );
}

// goi api + render danh sach
async function fetchAndRenderProducts() {
  loadingState.hidden = false;
  errorState.hidden = true;
  productsGrid.innerHTML = "";
  paginationEl.hidden = true;

  try {
    const url = buildApiUrl();
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Lỗi máy chủ (status ${res.status})`);
    }

    const data = await res.json();
    const products = data.products || [];

    if (products.length === 0) {
      showError("Không tìm thấy sản phẩm nào phù hợp.");
      return;
    }

    products.forEach((p) => productsGrid.appendChild(renderProductCard(p)));
    renderPagination(data.total || products.length);
  } catch (err) {
    console.error(err);
    showError("Không thể tải danh sách sản phẩm. Vui lòng thử lại sau.");
  } finally {
    loadingState.hidden = true;
  }
}

function showError(message) {
  errorText.textContent = message;
  errorState.hidden = false;
}

// search , filter, sort
searchInput.addEventListener("input", () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    state.search = searchInput.value;
    state.page = 1; // về lại trang 1 khi đổi điều kiện tìm kiếm
    fetchAndRenderProducts();
  }, 400); // debounce 400ms để tránh gọi API liên tục khi đang gõ
});

categorySelect.addEventListener("change", () => {
  state.category = categorySelect.value;
  state.page = 1;
  fetchAndRenderProducts();
});

sortSelect.addEventListener("change", () => {
  const value = sortSelect.value; // vd: "price-asc"
  if (!value) {
    state.sortBy = "";
    state.order = "";
  } else {
    const [sortBy, order] = value.split("-");
    state.sortBy = sortBy;
    state.order = order;
  }
  state.page = 1;
  fetchAndRenderProducts();
});

loadCategories();
fetchAndRenderProducts();
