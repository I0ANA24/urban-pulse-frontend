"use client";

import { useEffect, useState } from "react";
import GoBackButton from "@/components/ui/GoBackButton";

const API = "http://localhost:5248";

type NotificationType = "Emergency" | "HeroAlert" | "Comment" | "BadgeEarned";

interface NotificationItem {
  id: number;
  title: string;
  body: string;
  type: NotificationType | number;
  isRead: boolean;
  actionUrl?: string;
  createdAt: string;
}

const typeNumMap: Record<number, NotificationType> = {
  0: "Emergency",
  1: "HeroAlert",
  2: "Comment",
  3: "BadgeEarned",
};

const typeConfig: Record<NotificationType, { icon: string; color: string; bg: string }> = {
  Emergency:   { icon: "🚨", color: "#EF4444", bg: "rgba(239,68,68,0.1)" },
  HeroAlert:   { icon: "🦸", color: "#F59E0B", bg: "rgba(245,158,11,0.1)" },
  Comment:     { icon: "💬", color: "#3B82F6", bg: "rgba(59,130,246,0.1)" },
  BadgeEarned: { icon: "🏅", color: "#FFD700", bg: "rgba(255,215,0,0.1)" },
};

const defaultConfig = { icon: "🔔", color: "#6B7280", bg: "rgba(107,114,128,0.1)" };

function formatRelativeTime(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${API}/api/notification`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => setNotifications(data))
      .finally(() => setLoading(false));
  }, []);

  const markAsRead = async (id: number) => {
    const token = localStorage.getItem("token");
    await fetch(`${API}/api/notification/${id}/read`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const markAllAsRead = async () => {
    const token = localStorage.getItem("token");
    await fetch(`${API}/api/notification/read-all`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
    });
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="w-full flex flex-col gap-4 animate-fade-up">
      <div className="flex items-center justify-between">
        <GoBackButton />
        <h1 className="text-xl font-bold font-montagu">Notifications</h1>
        {unreadCount > 0 ? (
          <button
            onClick={markAllAsRead}
            className="text-xs text-white/40 hover:text-white transition-colors"
          >
            Mark all read
          </button>
        ) : (
          <div className="w-16" />
        )}
      </div>

      {loading && (
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 rounded-2xl bg-white/5 animate-pulse" />
          ))}
        </div>
      )}

      {!loading && notifications.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-3 py-20 text-white/30">
          <span className="text-4xl">🔔</span>
          <p className="text-sm">No notifications yet</p>
        </div>
      )}

      {!loading && notifications.length > 0 && (
        <div className="flex flex-col gap-3">
          {notifications.map((n) => {
            const typeKey = typeof n.type === "number" ? typeNumMap[n.type] : n.type;
            const config = typeKey ? (typeConfig[typeKey] ?? defaultConfig) : defaultConfig;
            return (
              <div
                key={n.id}
                onClick={() => !n.isRead && markAsRead(n.id)}
                className="relative rounded-2xl p-4 flex gap-3 items-start cursor-pointer transition-all duration-200 active:scale-95"
                style={{
                  background: n.isRead ? "rgba(255,255,255,0.03)" : config.bg,
                  border: `1px solid ${n.isRead ? "rgba(255,255,255,0.06)" : config.color}40`,
                }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0"
                  style={{ background: `${config.color}20` }}
                >
                  {config.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`text-sm font-semibold leading-tight ${n.isRead ? "text-white/60" : "text-white"}`}>
                      {n.title}
                    </p>
                    <span className="text-[10px] text-white/30 whitespace-nowrap flex-shrink-0">
                      {formatRelativeTime(n.createdAt)}
                    </span>
                  </div>
                  <p className={`text-xs mt-1 leading-relaxed ${n.isRead ? "text-white/30" : "text-white/60"}`}>
                    {n.body}
                  </p>
                </div>
                {!n.isRead && (
                  <div
                    className="absolute top-4 right-4 w-2 h-2 rounded-full"
                    style={{ background: config.color }}
                  />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}