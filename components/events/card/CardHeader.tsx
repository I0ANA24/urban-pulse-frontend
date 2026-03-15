import { MoreVertical, BadgeCheck } from "lucide-react";
import { useState } from "react";

interface CardHeaderProps {
  initials: string;
  name: string;
  date: string;
  isVerifiedUser?: boolean;
}

export default function CardHeader({ initials, name, date, isVerifiedUser = true }: CardHeaderProps) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="flex items-center justify-between px-4 pt-4 pb-3 relative z-20">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0">
          <span className="text-black font-bold text-sm">{initials}</span>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <span className="text-white text-sm font-bold">{name}</span>
            {isVerifiedUser && <BadgeCheck size={16} className="text-green-400 fill-green-400/20" />}
          </div>
          <span className="text-white/40 text-xs">{date}</span>
        </div>
      </div>

      <div className="relative">
        <button 
          onClick={() => setShowMenu(!showMenu)} 
          className="p-1 transition-colors hover:text-white/70"
        >
          <MoreVertical size={20} className="text-white" />
        </button>

        {/* meniul dropdown pentru report */}
        {showMenu && (
          <div className="absolute right-0 top-full mt-2 bg-[#1A1A1A] border border-white/10 rounded-xl shadow-2xl overflow-hidden w-28 z-50">
            <button
              onClick={() => {
                console.log("Report action triggered");
                setShowMenu(false);
              }}
              className="w-full text-center px-4 py-3 text-[#A53A3A] font-bold text-sm hover:bg-white/5 transition-colors"
            >
              Report
            </button>
          </div>
        )}
      </div>
    </div>
  );
}