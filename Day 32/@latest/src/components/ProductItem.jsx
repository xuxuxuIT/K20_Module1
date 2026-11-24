function Badge({ color, children }) {
  return (
    <span
      className={`rounded-full px-2 py-1 text-xs font-bold text-white ${color}`}
    >
      {children}
    </span>
  );
}

const formatPrice = (value) => `${value.toLocaleString("vi-VN")}đ`;

function ProductItem({ product, onAddToCart }) {
  const { name, price, image, inStock, discountPercent } = product;

  const hasDiscount = discountPercent > 0;
  const finalPrice = Math.round((price * (100 - discountPercent)) / 100);

  return (
    <div
      className={`rounded-lg border bg-white p-4 ${inStock ? "" : "opacity-50"}`}
    >
      <img src={image} alt={name} className="w-full rounded" />

      <div className="mt-2 flex gap-2">
        {hasDiscount && (
          <Badge color="bg-red-500">Giảm giá {discountPercent}%</Badge>
        )}
        {!inStock && <Badge color="bg-slate-800">Hết hàng</Badge>}
      </div>

      <h3 className="mt-2 font-semibold">{name}</h3>

      <div className="mt-1">
        <span className="font-bold text-red-600">
          {formatPrice(hasDiscount ? finalPrice : price)}
        </span>
        {hasDiscount && (
          <span className="ml-2 text-sm text-gray-400 line-through">
            {formatPrice(price)}
          </span>
        )}
      </div>

      <button
        disabled={!inStock}
        onClick={() => onAddToCart(name, finalPrice)}
        className="mt-3 w-full rounded bg-indigo-600 py-2 text-white disabled:bg-gray-400"
      >
        {inStock ? "Thêm vào giỏ" : "Hết hàng"}
      </button>
    </div>
  );
}

export default ProductItem;
