function UserProfileCard({
  avatar,
  fullName,
  jobTitle,
  isOnline,
  skills = [],
}) {
  const handleContact = () => {
    alert(`Đang kết nối với ${fullName}...`);
  };
  return (
    <div className="w-full max-w-sm rounded-2xl bg-white p-6 ring-1 ring-slate-200">
      {/* image */}
      <div className="flex items-center gap-4">
        <img
          src={avatar}
          alt={fullName}
          className="h-20 w-20 rounded-full object-cover ring-2 ring-slate-100"
        />
        <div className="min-w-0">
          <h3 className="truncate text-lg font-bold text-slate-900">
            {fullName}
          </h3>
          <p className="text-sm text-slate-500">{jobTitle}</p>
        </div>
      </div>

      {/* online */}
      <div className="mt-5 flex items-center gap-2 text-sm font-medium">
        <span
          className={`h-3 w-3 rounded-full ${isOnline ? "bg-green-400" : "bg-gray-400"}`}
        />
        <span className={isOnline ? "text-green-600" : "text-gray-500"}>
          {isOnline ? "Online" : "Offline"}
        </span>
      </div>

      {/* skill */}
      <ul className="mt-5 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <li
            key={skill}
            className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700"
          >
            {skill}
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={handleContact}
        className="mt-6 w-full cursor-pointer rounded-lg bg-indigo-600 px-4 py-2.5 font-semibold text-white transition hover:bg-indigo-700 active:scale-[0.98]"
      >
        Liên hệ
      </button>
    </div>
  );
}

export default UserProfileCard;
