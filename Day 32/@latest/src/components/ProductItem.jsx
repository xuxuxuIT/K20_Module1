import Badge from "./Badge";
import { formatPrice, getFinalPrice } from "./FormatPrice.js";

function ProductItem({ product, onAddToCart }) {
  const { name, price, image, inStock, discountPercent } = product;

  const hasDiscount = discountPercent > 0;
  const finalPrice = getFinalPrice(price, discountPercent);

  return (
    <div
      className={`flex h-full flex-col rounded-lg border bg-white p-4 ${inStock ? "" : "opacity-50"}`}
    >
      <img
        src={image}
        alt={name}
        className="aspect-square w-full rounded object-cover"
      />

      <div className="mt-2 flex gap-2">
        {hasDiscount && (
          <Badge variant="discount">Giảm giá {discountPercent}%</Badge>
        )}
        {!inStock && <Badge variant="soldout">Hết hàng</Badge>}
      </div>

      <h3 className="mt-2 min-h-12 line-clamp-2 font-semibold">{name}</h3>

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
        onClick={() => onAddToCart(product, finalPrice)}
        className="mt-auto w-full rounded bg-indigo-600 py-2 text-white disabled:bg-gray-400"
      >
        {inStock ? "Thêm vào giỏ" : "Hết hàng"}
      </button>
    </div>
  );
}

export default ProductItem;
