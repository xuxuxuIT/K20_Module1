import UserProfileCard from "./components/UserProfileCard.jsx";
import ProductList from "./components/ProductList.jsx";
import { formatPrice } from "./components/FormatPrice.js";

// bai 1
const users = [
  {
    id: 1,
    avatar: "https://i.pravatar.cc/200?img=12",
    fullName: "Nguyễn Văn An",
    jobTitle: "Frontend Developer",
    isOnline: true,
    skills: ["React", "Node.js", "Tailwind"],
  },
  {
    id: 2,
    avatar: "https://i.pravatar.cc/200?img=47",
    fullName: "Trần Thị Bích",
    jobTitle: "UI/UX Designer",
    isOnline: false,
    skills: ["Figma", "CSS", "Design System"],
  },
];

// bai 2
const products = [
  {
    id: 1,
    name: "Tai nghe không dây Aero",
    price: 1200000,
    image: "https://picsum.photos/seed/prod1/400/400",
    inStock: true,
    discountPercent: 10,
  },
  {
    id: 2,
    name: "Bàn phím cơ Keystone",
    price: 1850000,
    image: "https://picsum.photos/seed/prod2/400/400",
    inStock: true,
    discountPercent: 0,
  },
  {
    id: 3,
    name: "Chuột gaming Falcon",
    price: 690000,
    image: "https://picsum.photos/seed/prod3/400/400",
    inStock: false,
    discountPercent: 15,
  },
  {
    id: 4,
    name: "Loa Bluetooth Pebble",
    price: 950000,
    image: "https://picsum.photos/seed/prod4/400/400",
    inStock: true,
    discountPercent: 25,
  },
  {
    id: 5,
    name: "Webcam Full HD Lens",
    price: 780000,
    image: "https://picsum.photos/seed/prod5/400/400",
    inStock: false,
    discountPercent: 0,
  },
  {
    id: 6,
    name: "Sạc nhanh 65W Volt",
    price: 450000,
    image: "https://picsum.photos/seed/prod6/400/400",
    inStock: true,
    discountPercent: 5,
  },
];

function App() {
  const handleAddToCart = (product, finalPrice) => {
    alert(
      `Đã thêm "${product.name}" vào giỏ hàng với giá ${formatPrice(finalPrice)}`,
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-6xl space-y-16">
        {/* bai 1 */}
        <section>
          <h2 className="mb-6 text-2xl font-bold text-slate-800">
            Bài 1: UserProfileCard
          </h2>
          <div className="flex flex-wrap gap-6">
            {users.map((user) => (
              <UserProfileCard
                key={user.id}
                avatar={user.avatar}
                fullName={user.fullName}
                jobTitle={user.jobTitle}
                isOnline={user.isOnline}
                skills={user.skills}
              />
            ))}
          </div>
        </section>

        {/* bài 2 */}
        <section>
          <h2 className="mb-6 text-2xl font-bold text-slate-800">
            Bài 2: ProductList
          </h2>
          <ProductList products={products} onAddToCart={handleAddToCart} />
        </section>
      </div>
    </div>
  );
}

export default App;
