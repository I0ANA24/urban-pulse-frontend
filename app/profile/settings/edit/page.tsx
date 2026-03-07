import EditProfileCard from "@/components/ui/profile/EditProfileCard";
import EditSkills from "@/components/ui/profile/EditSkills";
import Image from "next/image";

export default function EditProfile() {
  return (
    <>
      <div className="w-full h-full flex flex-col items-center gap-5">
        <div className="w-full flex justify-center items-center">
          <Image
            src="/profile.png"
            width={93}
            height={91}
            alt="profile_picture"
          />
        </div>
        <h1 className="text-2xl font-montagu font-bold text-center leading-[1.15]">
          Edit profile
        </h1>
        <EditProfileCard title="Name" />
        <EditProfileCard title="Bio" />
        <EditProfileCard title="Skills">
          <EditSkills />
        </EditProfileCard>
      </div>
    </>
  );
}
