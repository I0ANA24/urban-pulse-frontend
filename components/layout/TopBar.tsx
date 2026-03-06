import Image from "next/image";
import GoBackButton from "../ui/GoBackButton";
import ProfileRoundButton from "../ui/ProfileRoundButton";

interface TopBarProps {
  back: boolean;
  notifications: boolean;
  settings: boolean;
}

export default function TopBar({ back, notifications, settings }: TopBarProps) {
  return (
    <div
      className={`flex ${back ? "justify-between" : "justify-end"} items-center`}
    >
      {back && (
        <GoBackButton>
          <Image
            src="/undo.svg"
            alt="go_back"
            width={69}
            height={49}
            className="-ml-2"
          />
        </GoBackButton>
      )}

      <div className="flex justify-center items-center gap-3">
        {notifications && (
          <ProfileRoundButton route="">
            <Image
              src="/notifications.svg"
              alt="go_back"
              width={40}
              height={25}
            />
          </ProfileRoundButton>
        )}
        {settings && (
          <ProfileRoundButton route="./profile/settings">
            <Image src="/settings.svg" alt="go_back" width={47} height={30} />
          </ProfileRoundButton>
        )}
      </div>
    </div>
  );
}
