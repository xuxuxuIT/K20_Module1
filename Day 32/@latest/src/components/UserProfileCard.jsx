function UserProfileCard({ avatar, fullName, jobTitle, isOnline, skills }) {
  const handleContact = () => {
    alert(`Đang kết nối với ${fullName}...`);
  };

  return (
    <div className="w-72 rounded-2xl bg-white p-6 text-center shadow-md">
      <img
        src={avatar}
        alt={fullName}
        className="mx-auto h-24 w-24 rounded-full object-cover"
      />

      <h3 className="mt-4 text-lg font-semibold text-slate-800">{fullName}</h3>
      <p className="text-sm text-slate-500">{jobTitle}</p>

      <div className="mt-3 flex items-center justify-center gap-2 text-sm">
        <span
          className={`h-2.5 w-2.5 rounded-full ${
            isOnline ? "bg-green-400" : "bg-gray-400"
          }`}
        />
        <span className={isOnline ? "text-green-600" : "text-gray-500"}>
          {isOnline ? "Online" : "Offline"}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600"
          >
            {skill}
          </span>
        ))}
      </div>

      <button
        onClick={handleContact}
        className="mt-6 w-full rounded-lg bg-indigo-600 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
      >
        Liên hệ
      </button>
    </div>
  );
}

export default UserProfileCard;
