const products = [
  {
    id: 1,
    name: "Tai nghe Bluetooth",
    category: "do-dien-tu",
    price: 350000,
    inStock: true,
  },
  {
    id: 2,
    name: "Áo thun cotton",
    category: "quan-ao",
    price: 150000,
    inStock: true,
  },
  {
    id: 3,
    name: "Sách Lập trình JS căn bản",
    category: "sach",
    price: 120000,
    inStock: false,
  },
  {
    id: 4,
    name: "Bàn phím cơ",
    category: "do-dien-tu",
    price: 890000,
    inStock: true,
  },
  {
    id: 5,
    name: "Quần jean nam",
    category: "quan-ao",
    price: 420000,
    inStock: false,
  },
  {
    id: 6,
    name: "Sách Tư duy nhanh và chậm",
    category: "sach",
    price: 95000,
    inStock: true,
  },
];

const searchBox = document.getElementById("search-box");
const categoryFilter = document.getElementById("category-filter");
const sortBtn = document.getElementById("sort-price-btn");
const productList = document.getElementById("product-list");
const resultCount = document.getElementById("result-count");

let ascending = true;

// dinh danh tien
function formatPrice(price) {
  return price.toLocaleString("vi-VN") + "đ";
}

// render
function renderProducts(list) {
  productList.innerHTML = "";

  if (list.length === 0) {
    productList.innerHTML = "<p>Không tìm thấy sản phẩm nào phù hợp.</p>";
    resultCount.textContent = "Tìm thấy 0 sản phẩm";
    return;
  }

  resultCount.textContent = `Tìm thấy ${list.length} sản phẩm`;

  list.forEach((product) => {
    const div = document.createElement("div");

    div.className = "product";

    if (!product.inStock) {
      div.classList.add("out-of-stock");
    }

    div.innerHTML = `
        <h3>${product.name}</h3>
        <p>Danh mục: ${product.category}</p>
        <p>Giá: ${formatPrice(product.price)}</p>
        <p>${product.inStock ? "Còn hàng" : "Hết hàng"}</p>
    `;

    productList.appendChild(div);
  });
}

// loc,timkiem,sxep
function updateProducts() {
  let result = [...products];

  const keyword = searchBox.value.trim().toLowerCase();

  if (keyword) {
    result = result.filter((item) => item.name.toLowerCase().includes(keyword));
  }

  const category = categoryFilter.value;

  if (category !== "all") {
    result = result.filter((item) => item.category === category);
  }

  result.sort((a, b) => {
    return ascending ? a.price - b.price : b.price - a.price;
  });

  renderProducts(result);
}

// search
searchBox.addEventListener("input", updateProducts);

// filter
categoryFilter.addEventListener("change", updateProducts);

// sort
sortBtn.addEventListener("click", () => {
  ascending = !ascending;

  if (ascending) {
    sortBtn.textContent = "Giá: Thấp → Cao";
  } else {
    sortBtn.textContent = "Giá: Cao → Thấp";
  }

  updateProducts();
});

// load
updateProducts();
