import { EventType } from "@/types/Event";

interface CardActionsProps {
  type: EventType;
}

export default function CardActions({ type }: CardActionsProps) {
  if (type === "Emergency") {
    return (
      <div className="flex flex-col gap-3 px-4 pb-3 mt-1">
        <div className="flex items-center gap-3 w-full">
          <div className="h-px bg-white/10 flex-1" />
          <span className="text-white/40 text-[10px] font-medium uppercase tracking-widest">
            Is this info correct?
          </span>
          <div className="h-px bg-white/10 flex-1" />
        </div>
        <div className="flex gap-3 w-full">
          <button className="flex-1 bg-[#4ADE80] text-[#023612] rounded-[10px] py-2 text-xs font-bold transition-transform active:scale-95">
            Yes, it is.
          </button>
          <button className="flex-1 bg-red-emergency text-white rounded-[10px] py-2 text-xs font-bold transition-transform active:scale-95">
            No, it isn't.
          </button>
        </div>
      </div>
    );
  }

  if (type === "Skill" || type === "Lend") {
    return (
      <div className="mt-2 mb-1 w-full flex justify-center px-4 pb-3">
        <button className="w-full bg-[#BEDCF5] text-[#04007D] rounded-[10px] py-2 text-xs font-bold transition-transform active:scale-95">
          Message
        </button>
      </div>
    );
  }

  return null;
}