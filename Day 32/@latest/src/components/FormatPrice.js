export const formatPrice = (value) =>
  `${Number(value).toLocaleString("vi-VN")}đ`;

export const getFinalPrice = (price, discountPercent = 0) =>
  Math.round(price - (price * discountPercent) / 100);
