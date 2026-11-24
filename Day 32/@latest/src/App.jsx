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
    image: "https://images.pexels.com/photos/7772548/pexels-photo-7772548.jpeg",
    inStock: true,
    discountPercent: 10,
  },
  {
    id: 2,
    name: "Bàn phím cơ Keystone",
    price: 1850000,
    image:
      "https://media.istockphoto.com/id/153065264/vi/anh/b%C3%A0n-ph%C3%ADm-m%C3%A1y-t%C3%ADnh-v%E1%BB%9Bi-%C4%91%C6%B0%E1%BB%9Dng-d%E1%BA%ABn-c%E1%BA%AFt.jpg?s=2048x2048&w=is&k=20&c=oE2KqQEoXuNx_OiiFJeUHSo4k4E-0pqq9H4XvEOCHrk=",
    inStock: true,
    discountPercent: 0,
  },
  {
    id: 3,
    name: "Chuột gaming Falcon",
    price: 690000,
    image: "https://images.pexels.com/photos/6073700/pexels-photo-6073700.jpeg",
    inStock: false,
    discountPercent: 15,
  },
  {
    id: 4,
    name: "Loa Bluetooth Pebble",
    price: 950000,
    image:
      "https://images.pexels.com/photos/18542244/pexels-photo-18542244.jpeg",
    inStock: true,
    discountPercent: 25,
  },
  {
    id: 5,
    name: "Webcam Full HD Lens",
    price: 780000,
    image:
      "https://images.pexels.com/photos/24347621/pexels-photo-24347621.jpeg",
    inStock: false,
    discountPercent: 0,
  },
  {
    id: 6,
    name: "Sạc nhanh 65W Volt",
    price: 450000,
    image:
      "https://images.pexels.com/photos/11031423/pexels-photo-11031423.png",
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
