"use client";

import { useState } from "react";
import PortalModal from "@/components/ui/PortalModal";

interface BanUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
  /** Motivul default pre-completat din categoriile rapoartelor */
  defaultReason?: string;
}

export default function BanUserModal({
  isOpen,
  onClose,
  onConfirm,
  defaultReason = "",
}: BanUserModalProps) {
  const [reason, setReason] = useState(defaultReason);

  const handleConfirm = () => {
    onConfirm(reason);
    setReason("");
  };

  const handleClose = () => {
    onClose();
    setReason(defaultReason);
  };

  return (
    <PortalModal isOpen={isOpen} onClose={handleClose}>
      {/* Header cu icon + titlu */}
      <div className="flex items-center justify-center gap-2.5 py-5">
        {/* Trash/ban icon */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-[#C0392B]"
        >
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="3"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M9 9L15 15M15 9L9 15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <h2 className="text-base font-bold text-[#C0392B]">Ban user</h2>
      </div>

      {/* Separator */}
      <div className="h-px bg-white/10 mx-5" />

      {/* Content */}
      <div className="flex flex-col p-5 gap-4">
        {/* Reason label + input */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-white">Reason</label>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter reason..."
            className="w-full py-3 px-4 bg-[#1a1a1a] border border-[#C0392B]/40 rounded-xl text-white text-sm outline-none transition-colors duration-200 placeholder:text-white/30 focus:border-[#C0392B]/70"
          />
        </div>

        {/* Confirmation text */}
        <p className="text-center text-white text-sm">
          Are you sure you want to{" "}
          <span className="font-bold underline">ban this user</span>?
        </p>

        {/* YES / NO buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleConfirm}
            className="flex-1 py-3.5 rounded-xl bg-[#C0392B] hover:bg-[#A93226] active:scale-95 transition-all font-bold text-white text-sm cursor-pointer"
          >
            YES
          </button>
          <button
            onClick={handleClose}
            className="flex-1 py-3.5 rounded-xl bg-[#3a3a3a] hover:bg-[#4a4a4a] active:scale-95 transition-all font-bold text-white text-sm cursor-pointer"
          >
            NO
          </button>
        </div>
      </div>
    </PortalModal>
  );
}