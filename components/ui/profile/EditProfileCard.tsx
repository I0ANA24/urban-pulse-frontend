import ProfileInput from "./ProfileInput";

interface EditProfileCardProps {
  children?: React.ReactNode;
  title: "Name" | "Bio" | "Skills";
}

export default function EditProfileCard({
  children,
  title,
}: EditProfileCardProps) {

  return (
    <div
      className={`w-full px-5 py-4 bg-secondary rounded-2xl flex ${title === "Name" ? "flex" : "flex-col"}`}
    >
      <h5 className={`font-bold ${title === "Name" ? "text-sm" : "text-xl"}`}>
        {title}
      </h5>

      {title === "Name" ? (
        <div className="w-px bg-white/90 mx-2" />
      ) : (
        <div className="w-full h-px bg-white/90 my-2"></div>
      )}

      {title !== "Skills" ? <ProfileInput title={title}  /> : <></>}

      {children}
    </div>
  );
}
