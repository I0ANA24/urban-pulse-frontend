"use client";

import { useEffect, useRef, useState } from "react";
import PortalModal from "@/components/ui/PortalModal";

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (eventText: string) => void;
}

export default function AddEventModal({
  isOpen,
  onClose,
  onSave,
}: AddEventModalProps) {
  const [eventText, setEventText] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSave = () => {
    if (eventText.trim()) {
      onSave(eventText);
      setEventText("");
      onClose();
    }
  };

  return (
    <PortalModal
      isOpen={isOpen}
      onClose={onClose}
      contentClassName="bg-[#4A5568] w-full rounded-3xl overflow-hidden"
    >
      {/* Title */}
      <div className="flex items-center justify-center py-4">
        <h2 className="text-lg font-semibold text-white">Add event</h2>
      </div>

      {/* Input */}
      <div className="px-6 pb-4">
        <textarea
          ref={inputRef}
          value={eventText}
          onChange={(e) => setEventText(e.target.value)}
          placeholder="Write..."
          className="w-full bg-[#5A6779] text-white placeholder:text-gray-400/60 rounded-2xl px-4 py-3.5 resize-none outline-none focus:ring-1 focus:ring-white/20 transition-all text-sm"
          rows={4}
        />
      </div>

      {/* Save button */}
      <div className="flex justify-center pb-5">
        <button
          onClick={handleSave}
          className="bg-[#2C3E50] hover:bg-[#34495E] text-white font-semibold px-16 py-3 rounded-full transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed text-sm"
          disabled={!eventText.trim()}
        >
          Save
        </button>
      </div>
    </PortalModal>
  );
}