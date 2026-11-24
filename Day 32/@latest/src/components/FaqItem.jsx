function FaqItem({
  id,
  question,
  answer,
  category,
  isHot,
  isOpen,
  onSelectFaq,
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
          {category}
        </span>
        {isHot && (
          <span className="rounded-md bg-orange-100 px-2 py-0.5 text-xs font-semibold text-orange-600">
            Hot
          </span>
        )}
      </div>

      <h3 className="mt-2 font-semibold text-slate-800">{question}</h3>

      {isOpen && (
        <p className="mt-3 leading-relaxed text-slate-600">{answer}</p>
      )}

      <button
        onClick={() => onSelectFaq(id)}
        className="mt-4 rounded-lg border border-indigo-600 px-3 py-1.5 text-sm font-medium text-indigo-600 transition hover:bg-indigo-50"
      >
        Xem chi tiết
      </button>
    </div>
  );
}

export default FaqItem;
