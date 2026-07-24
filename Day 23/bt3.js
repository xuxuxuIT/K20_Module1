function createOrderSystem() {
  const cart = [];
  function addToCart(name, price, qty) {
    cart.push({
      name,
      price,
      qty,
    });

    return cart.length;
  }

  function checkout(distance) {
    let subtotal = 0;

    // Tính tổng tiền hàng
    for (const product of cart) {
      subtotal += product.price * product.qty;
    }

    let shippingFee;

    if (distance <= 5) {
      let fee = 15000;
      shippingFee = fee;
    } else if (distance <= 20) {
      let fee = 30000;
      shippingFee = fee;
    } else {
      let fee = 50000;
      shippingFee = fee;
    }

    if (subtotal >= 500000) {
      shippingFee = 0;
    }

    const finalTotal = subtotal + shippingFee;

    cart.length = 0;

    return {
      subtotal,
      shippingFee,
      finalTotal,
    };
  }

  function getCartSize() {
    return cart.length;
  }

  return {
    addToCart,
    checkout,
    getCartSize,
  };
}

const store = createOrderSystem();

console.log(store.addToCart("Mũ lưỡi trai", 120000, 1));
// 1

console.log(store.getCartSize());
// 1

console.log(store.checkout(15));
// { subtotal: 120000, shippingFee: 30000, finalTotal: 150000 }

console.log(store.getCartSize());

const store2 = createOrderSystem();

console.log(store2.addToCart("Tất", 30000, 2));
// 1

console.log(store2.checkout(3));
// { subtotal: 60000, shippingFee: 15000, finalTotal: 75000 }

// Test 3
const store3 = createOrderSystem();

console.log(store3.addToCart("Áo khoác", 600000, 1));
// 1

console.log(store3.checkout(30));
