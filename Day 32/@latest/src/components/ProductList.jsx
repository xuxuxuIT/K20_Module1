import ProductItem from "./ProductItem";

function ProductList({ products }) {
  const handleAddToCart = (name, finalPrice) => {
    alert(
      `Đã thêm "${name}" vào giỏ với giá ${finalPrice.toLocaleString("vi-VN")}đ`,
    );
  };

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          onAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
}

export default ProductList;
