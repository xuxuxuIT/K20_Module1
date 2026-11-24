import UserProfileCard from "./components/UserProfileCard";
import ProductList from "./components/ProductList";
import FaqList from "./components/FaqList";

// bai 1
const users = [
  {
    id: 1,
    avatar: "https://i.pravatar.cc/150?img=12",
    fullName: "Nguyễn Văn An",
    jobTitle: "Frontend Developer",
    isOnline: true,
    skills: ["React", "Node.js", "Tailwind"],
  },
  {
    id: 2,
    avatar: "https://i.pravatar.cc/150?img=47",
    fullName: "Trần Thị Bình",
    jobTitle: "UI/UX Designer",
    isOnline: false,
    skills: ["Figma", "CSS", "Prototyping"],
  },
];
// bai 2
const products = [
  {
    id: 1,
    name: "Tai nghe Bluetooth Pro",
    price: 1200000,
    image: "https://picsum.photos/seed/headphone/400/300",
    inStock: true,
    discountPercent: 10,
  },
  {
    id: 2,
    name: "Bàn phím cơ không dây",
    price: 1850000,
    image: "https://picsum.photos/seed/keyboard/400/300",
    inStock: true,
    discountPercent: 0,
  },
  {
    id: 3,
    name: "Chuột gaming RGB",
    price: 650000,
    image: "https://picsum.photos/seed/mouse/400/300",
    inStock: false,
    discountPercent: 20,
  },
  {
    id: 4,
    name: "Màn hình 27 inch 2K",
    price: 5990000,
    image: "https://picsum.photos/seed/monitor/400/300",
    inStock: true,
    discountPercent: 15,
  },
  {
    id: 5,
    name: "Webcam Full HD",
    price: 890000,
    image: "https://picsum.photos/seed/webcam/400/300",
    inStock: false,
    discountPercent: 0,
  },
  {
    id: 6,
    name: "Loa mini bỏ túi",
    price: 450000,
    image: "https://picsum.photos/seed/speaker/400/300",
    inStock: true,
    discountPercent: 5,
  },
];

// bai3
const faqData = [
  {
    id: 1,
    question: "Props trong React dùng để làm gì?",
    answer: "Props giúp truyền dữ liệu từ component cha xuống component con.",
    category: "React",
    isHot: true,
  },
  {
    id: 2,
    question: "State khác props ở điểm nào?",
    answer:
      "State là dữ liệu nội bộ của component và có thể thay đổi, còn props là dữ liệu chỉ đọc do component cha truyền xuống.",
    category: "React",
    isHot: true,
  },
  {
    id: 3,
    question: "Vì sao cần prop key khi dùng .map()?",
    answer:
      "Key giúp React nhận diện từng phần tử trong danh sách để cập nhật giao diện chính xác và hiệu quả.",
    category: "React",
    isHot: false,
  },
  {
    id: 4,
    question: "Tailwind CSS là gì?",
    answer:
      "Tailwind là framework CSS utility-first, cho phép style trực tiếp bằng các class nhỏ ngay trong JSX.",
    category: "CSS",
    isHot: false,
  },
];

function App() {
  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="mx-auto max-w-5xl space-y-16 px-4">
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

        <section>
          <h2 className="mb-6 text-2xl font-bold text-slate-800">
            Bài 2: ProductList
          </h2>
          <ProductList products={products} />
        </section>

        <section>
          <h2 className="mb-6 text-2xl font-bold text-slate-800">Bài 3: FAQ</h2>
          <FaqList faqs={faqData} />
        </section>
      </div>
    </div>
  );
}

export default App;
