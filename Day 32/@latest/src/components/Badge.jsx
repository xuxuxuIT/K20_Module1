const VARIANTS = {
  discount: "bg-red-500 text-white",
  soldout: "bg-slate-800 text-white",
};

function Badge({ variant = "discount", children }) {
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-1 text-xs font-bold ${VARIANTS[variant]}`}
    >
      {children}
    </span>
  );
}

export default Badge;
