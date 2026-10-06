// product-detail.js — Trang chi tiết sản phẩm

const API_BASE = "https://dummyjson.com/products";

const loadingState = document.getElementById("loadingState");
const errorState = document.getElementById("errorState");
const errorText = document.getElementById("errorText");
const detailContent = document.getElementById("detailContent");

function calcSalePrice(price, discountPercentage) {
  return Math.round((price - (price * discountPercentage) / 100) * 100) / 100;
}

function formatMoney(n) {
  return `$${n.toFixed(2)}`;
}

function getIdFromUrl() {
  const params = new URLSearchParams(location.search);
  return params.get("id");
}

function renderProduct(p) {
  const salePrice = calcSalePrice(p.price, p.discountPercentage);
  const hasDiscount = p.discountPercentage > 0;

  // Ảnh chính + thumbnail list
  const images = p.images && p.images.length ? p.images : [p.thumbnail];
  document.getElementById("mainImage").src = images[0];
  document.getElementById("mainImage").alt = p.title;

  const thumbList = document.getElementById("thumbList");
  thumbList.innerHTML = "";
  images.forEach((img, i) => {
    const thumb = document.createElement("button");
    thumb.className =
      "gallery__thumb" + (i === 0 ? " gallery__thumb--active" : "");
    thumb.innerHTML = `<img src="${img}" alt="">`;
    thumb.addEventListener("click", () => {
      document.getElementById("mainImage").src = img;
      thumbList
        .querySelectorAll("button")
        .forEach((b) => b.classList.remove("gallery__thumb--active"));
      thumb.classList.add("gallery__thumb--active");
    });
    thumbList.appendChild(thumb);
  });

  // Thông tin chính
  document.getElementById("pCategory").textContent = p.category;
  document.getElementById("pTitle").textContent = p.title;
  document.getElementById("pBrand").textContent = p.brand
    ? `Thương hiệu: ${p.brand}`
    : "";

  document.getElementById("pRating").innerHTML = `★ ${p.rating.toFixed(1)} / 5`;

  const stockEl = document.getElementById("pStock");
  if (p.stock === 0) {
    stockEl.textContent = "Hết hàng";
    stockEl.className = "badge badge--out";
  } else {
    stockEl.textContent = `Còn ${p.stock} sản phẩm`;
    stockEl.className = "badge badge--ok";
  }

  document.getElementById("pSalePrice").textContent = formatMoney(salePrice);
  document.getElementById("pOriginalPrice").textContent = hasDiscount
    ? formatMoney(p.price)
    : "";
  document.getElementById("pDiscount").textContent = hasDiscount
    ? `-${Math.round(p.discountPercentage)}%`
    : "";
  document.getElementById("pDiscount").style.display = hasDiscount
    ? "inline-block"
    : "none";

  document.getElementById("pDescription").textContent = p.description || "";

  document.getElementById("pSku").textContent = p.sku || "—";
  document.getElementById("pWeight").textContent = p.weight
    ? `${p.weight} g`
    : "—";
  document.getElementById("pDimensions").textContent = p.dimensions
    ? `${p.dimensions.width} × ${p.dimensions.height} × ${p.dimensions.depth} cm`
    : "—";

  const tagsEl = document.getElementById("pTags");
  tagsEl.innerHTML = "";
  (p.tags || []).forEach((tag) => {
    const span = document.createElement("span");
    span.className = "tag";
    span.textContent = `#${tag}`;
    tagsEl.appendChild(span);
  });

  // Reviews
  const reviewsList = document.getElementById("reviewsList");
  reviewsList.innerHTML = "";
  const reviews = p.reviews || [];

  if (reviews.length === 0) {
    reviewsList.innerHTML = `<p class="empty-note">Chưa có đánh giá nào cho sản phẩm này.</p>`;
  } else {
    reviews.forEach((r) => {
      const div = document.createElement("div");
      div.className = "review";
      div.innerHTML = `
        <div class="review__top">
          <span class="review__name">${r.reviewerName}</span>
          <span class="review__rating">★ ${r.rating}/5</span>
        </div>
        <p class="review__comment">${r.comment}</p>
        <p class="review__date">${new Date(r.date).toLocaleDateString("vi-VN")}</p>
      `;
      reviewsList.appendChild(div);
    });
  }
}

async function init() {
  const id = getIdFromUrl();

  if (!id) {
    showError("Thiếu mã sản phẩm trong đường dẫn.");
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/${id}`);

    if (!res.ok) {
      throw new Error("Không tìm thấy sản phẩm");
    }

    const product = await res.json();

    if (product.message) {
      throw new Error(product.message);
    }

    renderProduct(product);
    loadingState.hidden = true;
    detailContent.hidden = false;
  } catch (err) {
    console.error(err);
    showError("Không tìm thấy sản phẩm, hoặc id sản phẩm không hợp lệ.");
  }
}

function showError(message) {
  loadingState.hidden = true;
  detailContent.hidden = true;
  errorText.textContent = message;
  errorState.hidden = false;
}

init();
