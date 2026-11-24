import { useState } from "react";
import FaqItem from "./FaqItem";

function FaqList({ faqs }) {
  const [openId, setOpenId] = useState(null);

  // Bấm lại cùng id thì đóng, khác id thì mở mục đó
  const handleSelectFaq = (id) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <div className="space-y-4">
      {faqs.length > 0 &&
        faqs.map((faq) => (
          <FaqItem
            key={faq.id}
            id={faq.id}
            question={faq.question}
            answer={faq.answer}
            category={faq.category}
            isHot={faq.isHot}
            isOpen={openId === faq.id}
            onSelectFaq={handleSelectFaq}
          />
        ))}
    </div>
  );
}

export default FaqList;
