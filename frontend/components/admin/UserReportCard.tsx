"use client";

import Image from "next/image";

interface UserReportCardProps {
  reporterName: string;
  reporterAvatar: string;
  date: string;
  time: string;
  category: string;
  description: string;
}

export default function UserReportCard({
  reporterName,
  reporterAvatar,
  date,
  time,
  category,
  description,
}: UserReportCardProps) {
  return (
    <div className="bg-[#2a2a2a] rounded-2xl p-4 flex flex-col gap-3">
      {/* Reporter info */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-white overflow-hidden flex-shrink-0">
          <Image
            src={reporterAvatar}
            alt={reporterName}
            width={48}
            height={48}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col flex-1">
          <span className="text-white font-semibold text-base">
            {reporterName}
          </span>
          <span className="text-white/40 text-xs">
            {date} · {time}
          </span>
        </div>
      </div>

      {/* Category */}
      <div className="bg-[#1a1a1a] border border-[#C0392B] rounded-xl px-4 py-2.5">
        <span className="text-white/90 text-sm">{category}</span>
      </div>

      {/* Description */}
      <div className="bg-[#3a3a3a] rounded-xl px-4 py-3">
        <p className="text-white/80 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}