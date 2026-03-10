"use client";

import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import EventCard from "@/components/EventCard";
import { Event } from "@/types/Event";

export default function DashboardPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5248/api/event", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5248/hubs/events")
      .withAutomaticReconnect()
      .build();

    connection.on("NewEvent", (newEvent: Event) => {
      setEvents((prev) => [newEvent, ...prev]);
    });

    connection.start().catch(console.error);

    return () => { connection.stop(); };
  }, []);

  return (
    <div className="w-full min-h-screen pb-[8vh]">
      <div className="flex flex-col gap-4">
        <h1 className="text-white text-xl font-semibold px-4 pt-4">Feed</h1>

        {loading && (
          <p className="text-white/40 text-sm text-center mt-10">Loading...</p>
        )}

        {!loading && events.length === 0 && (
          <p className="text-white/40 text-sm text-center mt-10">
            No events yet.
          </p>
        )}

        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}