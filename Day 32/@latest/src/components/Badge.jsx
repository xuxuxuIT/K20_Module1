function Badge({ text, variant = "discount" }) {
  const styles = {
    discount: "bg-red-500 text-white",
    soldOut: "bg-slate-700 text-white",
  };

  return (
    <span
      className={`rounded-md px-2 py-1 text-xs font-semibold ${styles[variant]}`}
    >
      {text}
    </span>
  );
}

export default Badge;
