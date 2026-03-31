"use client";

import { useEffect, useState, useCallback } from "react";
import { MapContainer, TileLayer, ZoomControl, useMap } from "react-leaflet";
import L from "leaflet";
import Image from "next/image";
import "leaflet/dist/leaflet.css";
import "./map.css";

const DEFAULT_CENTER: [number, number] = [47.1585, 27.6014];
const DEFAULT_ZOOM = 13;

interface UserProfile {
  id: number;
  fullName?: string;
  email: string;
  bio?: string;
  skills: string[];
  tools: string[];
  trustScore: number;
  address?: string;
}

interface UserMarker {
  user: UserProfile;
  lat: number;
  lng: number;
  hasSkills: boolean;
  hasTools: boolean;
}

function createIcon(type: "skills" | "tools" | "both-skills" | "both-tools") {
  const isSkill = type === "skills" || type === "both-skills";
  const color = isSkill ? "#FFD700" : "#3B82F6";
  const shadow = isSkill ? "rgba(255,215,0,0.5)" : "rgba(59,130,246,0.5)";
  const offsetX = type === "both-skills" ? -10 : type === "both-tools" ? 10 : 0;

  return L.divIcon({
    className: "",
    html: `
      <div class="skill-marker" style="transform: translateX(${offsetX}px)">
        <svg width="28" height="36" viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 0C6.268 0 0 6.268 0 14c0 9.8 14 22 14 22s14-12.2 14-22C28 6.268 21.732 0 14 0z" fill="${color}" filter="drop-shadow(0 2px 6px ${shadow})"/>
          <circle cx="14" cy="13" r="5" fill="#1C1C1C"/>
          ${isSkill
            ? `<path d="M14 9.5l1.2 2.4 2.7.4-1.95 1.9.46 2.67L14 15.4l-2.41 1.47.46-2.67-1.95-1.9 2.7-.4z" fill="${color}"/>`
            : `<path d="M11 10h6v2h-2v4h-2v-4h-2v-2z M12 16h4v1.5h-4z" fill="${color}"/>`
          }
        </svg>
      </div>
    `,
    iconSize: [28, 36],
    iconAnchor: [14, 36],
    popupAnchor: [0, -38],
  });
}

async function geocodeAddress(address: string): Promise<[number, number] | null> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`,
      { headers: { "Accept-Language": "ro,en" } }
    );
    const data = await res.json();
    if (data.length > 0) return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
  } catch {}
  return null;
}

function ProfileCard({ user, onClose }: { user: UserProfile; onClose: () => void }) {
  const displayName = user.fullName ?? user.email?.split("@")[0] ?? "User";

  return (
    <div className="profile-card-overlay" onClick={onClose}>
      <div className="profile-card" onClick={(e) => e.stopPropagation()}>
        <div className="profile-card-header">
          <div className="profile-card-avatar">
            <Image src="/profile.png" alt={displayName} width={64} height={64} className="object-cover w-full h-full" />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="profile-card-name">{displayName}</h2>
            <div className="trust-badge">
              <span className="trust-label">Trust<br/>score</span>
              <div className="trust-divider" />
              <span className="trust-value">{Math.round(user.trustScore)}%</span>
            </div>
          </div>
          <button onClick={onClose} className="close-btn">✕</button>
        </div>

        {user.bio && (
          <div className="profile-card-section">
            <p className="profile-card-bio">{user.bio}</p>
          </div>
        )}

        {user.skills.length > 0 && (
          <div className="profile-card-section skills-section">
            <h3 className="profile-card-section-title">
              <span className="section-dot skills-dot" />
              Skills
            </h3>
            <div className="skills-grid">
              {user.skills.map((skill, i) => (
                <div key={i} className="skill-item">
                  <span className="skill-dot skills-dot" />
                  {skill}
                </div>
              ))}
            </div>
          </div>
        )}

        {user.tools.length > 0 && (
          <div className="profile-card-section tools-section">
            <h3 className="profile-card-section-title">
              <span className="section-dot tools-dot" />
              Tools & Resources
            </h3>
            <div className="flex flex-col gap-1">
              {user.tools.map((tool, i) => (
                <div key={i} className="skill-item">
                  <span className="skill-dot tools-dot" />
                  {tool}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function MarkersLayer({
  markers,
  onMarkerClick,
}: {
  markers: UserMarker[];
  onMarkerClick: (user: UserProfile) => void;
}) {
  const map = useMap();

  useEffect(() => {
    const leafletMarkers: L.Marker[] = [];

    markers.forEach(({ user, lat, lng, hasSkills, hasTools }) => {
      if (hasSkills && hasTools) {
        const mSkill = L.marker([lat, lng], { icon: createIcon("both-skills") }).addTo(map);
        const mTool = L.marker([lat, lng], { icon: createIcon("both-tools") }).addTo(map);
        mSkill.on("click", () => onMarkerClick(user));
        mTool.on("click", () => onMarkerClick(user));
        leafletMarkers.push(mSkill, mTool);
      } else if (hasSkills) {
        const m = L.marker([lat, lng], { icon: createIcon("skills") }).addTo(map);
        m.on("click", () => onMarkerClick(user));
        leafletMarkers.push(m);
      } else if (hasTools) {
        const m = L.marker([lat, lng], { icon: createIcon("tools") }).addTo(map);
        m.on("click", () => onMarkerClick(user));
        leafletMarkers.push(m);
      }
    });

    return () => {
      leafletMarkers.forEach((m) => map.removeLayer(m));
    };
  }, [markers, map, onMarkerClick]);

  return null;
}

export default function MapView() {
  const [mounted, setMounted] = useState(false);
  const [markers, setMarkers] = useState<UserMarker[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;

    const fetchAll = async () => {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        const [skillsRes, toolsRes] = await Promise.all([
          fetch("http://localhost:5248/api/User/with-skills", { headers }),
          fetch("http://localhost:5248/api/User/with-tools", { headers }),
        ]);

        const skillUsers: UserProfile[] = skillsRes.ok ? await skillsRes.json() : [];
        const toolUsers: UserProfile[] = toolsRes.ok ? await toolsRes.json() : [];

        const userMap = new Map<number, UserMarker & { user: UserProfile; hasSkills: boolean; hasTools: boolean }>();

        for (const u of skillUsers) {
          userMap.set(u.id, { user: u, lat: 0, lng: 0, hasSkills: true, hasTools: false });
        }
        for (const u of toolUsers) {
          if (userMap.has(u.id)) {
            userMap.get(u.id)!.hasTools = true;
          } else {
            userMap.set(u.id, { user: u, lat: 0, lng: 0, hasSkills: false, hasTools: true });
          }
        }

        const results: UserMarker[] = [];
        for (const entry of userMap.values()) {
          if (!entry.user.address) continue;
          await new Promise((r) => setTimeout(r, 1100));
          const coords = await geocodeAddress(entry.user.address);
          if (coords) {
            results.push({ ...entry, lat: coords[0], lng: coords[1] });
          }
        }
        setMarkers(results);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [mounted]);

  const handleMarkerClick = useCallback((user: UserProfile) => {
    setSelectedUser(user);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
        <MapContainer
          center={DEFAULT_CENTER}
          zoom={DEFAULT_ZOOM}
          zoomControl={false}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          <ZoomControl position="bottomright" />
          <MarkersLayer markers={markers} onMarkerClick={handleMarkerClick} />
        </MapContainer>

        <div className="map-legend">
          <div className="legend-item">
            <span className="legend-dot skills-dot" />
            <span>Skills</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot tools-dot" />
            <span>Tools</span>
          </div>
        </div>

        {loading && (
          <div className="map-loading">
            <div className="map-loading-dot" />
            <span>Se incarca utilizatorii...</span>
          </div>
        )}
      </div>

      {selectedUser && (
        <ProfileCard user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </>
  );
}