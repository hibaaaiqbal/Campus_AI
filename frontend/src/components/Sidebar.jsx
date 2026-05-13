import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Bot,
  CalendarDays,
  Clock4,
  MapPin,
  ShieldCheck,
  PanelLeftClose,
  PanelLeft,
} from "lucide-react";
import { UserContext } from "../context/UserContext";

const NAV = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/chatbot", icon: Bot, label: "AI Chat" },
  { to: "/events", icon: CalendarDays, label: "Events" },
  { to: "/timetable", icon: Clock4, label: "Timetable" },
  { to: "/navigation", icon: MapPin, label: "Navigate" },
];

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const { currentUser } = useContext(UserContext);

  return (
    <aside
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        zIndex: 50,
        background: "rgba(15,23,42,0.92)",
        backdropFilter: "blur(16px)",
        borderRight: "1px solid rgba(148,163,184,0.08)",
        display: "flex",
        flexDirection: "column",
        transition: "width 0.25s cubic-bezier(.4,0,.2,1)",
        width: open ? "220px" : "64px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: open ? "space-between" : "center",
          padding: open ? "24px 20px 20px" : "24px 0 20px",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          minHeight: 72,
        }}
      >
        {open && (
          <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
            <span
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: 20,
                color: "#f8fafc",
              }}
            >
              Campus
            </span>

            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                color: "#38bdf8",
                background: "rgba(56,189,248,0.12)",
                border: "1px solid rgba(56,189,248,0.25)",
                padding: "1px 6px",
                borderRadius: 4,
              }}
            >
              AI
            </span>
          </div>
        )}

        <button
          onClick={() => setOpen(!open)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#64748b",
          }}
        >
          {open ? <PanelLeftClose size={18} /> : <PanelLeft size={18} />}
        </button>
      </div>

      <nav
        style={{
          flex: 1,
          padding: "16px 10px",
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        {NAV.map(({ to, icon: Icon, label }) => {
          const active = location.pathname === to;

          return (
            <Link
              key={to}
              to={to}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: open ? "10px 14px" : "10px 0",
                justifyContent: open ? "flex-start" : "center",
                borderRadius: 10,
                textDecoration: "none",
                background: active
                  ? "linear-gradient(135deg,rgba(56,189,248,0.18),rgba(129,140,248,0.14))"
                  : "transparent",
                border: active
                  ? "1px solid rgba(56,189,248,0.18)"
                  : "1px solid transparent",
                color: active ? "#f8fafc" : "#94a3b8",
                transition: "all 0.2s",
              }}
            >
              <Icon size={17} />
              {open && label}
            </Link>
          );
        })}
      </nav>

      {open && (
        <div
          style={{
            padding: "18px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                background:
                  "linear-gradient(135deg,#38bdf8,#818cf8)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: 600,
                color: "white",
              }}
            >
              V
            </div>

            <div>
              <p
                style={{
                  fontSize: 13,
                  color: "#f8fafc",
                  fontWeight: 500,
                }}
              >
                {currentUser?.firstName || currentUser?.rollNo || "Student"}
              </p>

              <p
                style={{
                  fontSize: 11,
                  color: "#64748b",
                }}
              >
                {currentUser?.branch ? `${currentUser.branch} · ABES` : "ABES · CSE"}
              </p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}