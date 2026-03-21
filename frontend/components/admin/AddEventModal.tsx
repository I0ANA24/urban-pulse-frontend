"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

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
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

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

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 bg-black/70 flex justify-center items-center px-6 z-50"
      onClick={onClose}
    >
      <div
        className="bg-[#4A5568] w-full rounded-3xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
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
      </div>
    </div>,
    document.body
  );
}