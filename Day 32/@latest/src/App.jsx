import UserProfileCard from "./components/UserProfileCard";

const users = [
  {
    id: 1,
    avatar: "https://i.pravatar.cc/200?img=12",
    fullName: "Andrew",
    jobTitle: "Frontend Developer",
    isOnline: true,
    skills: ["React", "Node.js", "Tailwind"],
  },
  {
    id: 2,
    avatar: "https://i.pravatar.cc/200?img=47",
    fullName: "Sophia",
    jobTitle: "UI/UX Designer",
    isOnline: false,
    skills: ["Figma", "CSS", "Design System"],
  },
];
function App() {
  return (
    <div className="flex min-h-screen flex-wrap items-start justify-center gap-6 bg-slate-50 p-10">
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
  );
}
export default App;
