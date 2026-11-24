import Badge from "./Badge";

const formatPrice = (value) => `${value.toLocaleString("vi-VN")}đ`;

function ProductItem({ product, onAddToCart }) {
  const { name, price, image, inStock, discountPercent } = product;

  const hasDiscount = discountPercent > 0;
  const finalPrice = hasDiscount ? price * (1 - discountPercent / 100) : price;

  return (
    <div
      className={`relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-md transition ${
        inStock ? "" : "opacity-50"
      }`}
    >
      <div className="absolute left-3 top-3 flex gap-2">
        {hasDiscount && (
          <Badge text={`Giảm giá ${discountPercent}%`} variant="discount" />
        )}
        {!inStock && <Badge text="Hết hàng" variant="soldOut" />}
      </div>

      <img src={image} alt={name} className="h-48 w-full object-cover" />

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-semibold text-slate-800">{name}</h3>

        <div className="mt-2">
          {hasDiscount ? (
            <>
              <p className="text-sm text-slate-400 line-through">
                {formatPrice(price)}
              </p>
              <p className="text-lg font-bold text-red-500">
                {formatPrice(finalPrice)}
              </p>
            </>
          ) : (
            <p className="text-lg font-bold text-slate-800">
              {formatPrice(price)}
            </p>
          )}
        </div>

        <button
          disabled={!inStock}
          onClick={() => onAddToCart(name, finalPrice)}
          className="mt-auto rounded-lg bg-indigo-600 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {inStock ? "Thêm vào giỏ" : "Hết hàng"}
        </button>
      </div>
    </div>
  );
}

export default ProductItem;
