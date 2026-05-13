import Sidebar from "../components/Sidebar";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import {
  ArrowUpRight,
  Clock,
  Zap,
  BookOpen,
  MapPin,
  Sparkles,
} from "lucide-react";

const STATS = [
  {
    label: "Classes today",
    value: "4",
    sub: "Next at 11:00 AM",
  },
  {
    label: "Upcoming events",
    value: "3",
    sub: "This week",
  },
  {
    label: "Announcements",
    value: "7",
    sub: "Unread",
  },
  {
    label: "Attendance",
    value: "82%",
    sub: "This semester",
  },
];

const QUICK_ACTIONS = [
  {
    to: "/chatbot",
    icon: Zap,
    title: "Ask AI",
    desc: "Get instant campus assistance using multi-agent AI.",
    accent: "#38bdf8",
  },

  {
    to: "/timetable",
    icon: Clock,
    title: "Timetable",
    desc: "Access today's schedule, rooms, and faculty details.",
    accent: "#818cf8",
  },

  {
    to: "/events",
    icon: BookOpen,
    title: "Events",
    desc: "Track workshops, placement drives, and activities.",
    accent: "#f472b6",
  },

  {
    to: "/navigation",
    icon: MapPin,
    title: "Navigate",
    desc: "Locate labs, classrooms, and campus facilities.",
    accent: "#22d3ee",
  },
];

const AGENTS = [
  "Timetable Agent online",
  "Events Agent monitoring updates",
  "Navigation Agent active",
  "Academic Agent synced",
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const userName = currentUser?.firstName || currentUser?.rollNo || "Student";

  const now = new Date();
  const hour = now.getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 17
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#0b1020",
      }}
    >
      <Sidebar />

      <main
        style={{
          flex: 1,
          marginLeft: 220,
          padding: "40px 48px",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* HEADER */}

        <div style={{ marginBottom: 28 }}>
          <p
            style={{
              color: "#38bdf8",
              fontSize: 12,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            Campus AI System
          </p>

          <h1
            style={{
              fontSize: 42,
              color: "#f8fafc",
              marginBottom: 14,
              fontWeight: 700,
            }}
          >
            {greeting}, {userName} 👋
          </h1>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <p style={{ color: "#cbd5e1", fontSize: 15 }}>
              You have 2 classes remaining today.
            </p>

            <p style={{ color: "#818cf8", fontSize: 15 }}>
              3 placement activities this week.
            </p>

            <p style={{ color: "#22d3ee", fontSize: 15 }}>
              Operating Systems Lab starts in 45 mins.
            </p>
          </div>
        </div>

        {/* AI SYSTEM CARD */}

        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(56,189,248,0.14), rgba(129,140,248,0.12))",
            border: "1px solid rgba(56,189,248,0.15)",
            borderRadius: 22,
            padding: "28px",
            marginBottom: 32,
            boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 30,
              flexWrap: "wrap",
            }}
          >
            <div>
              <p
                style={{
                  color: "#38bdf8",
                  fontSize: 12,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: 10,
                }}
              >
                Multi-Agent Intelligence
              </p>

              <h2
                style={{
                  fontSize: 28,
                  color: "#f8fafc",
                  marginBottom: 10,
                }}
              >
                Campus AI Agents are active
              </h2>

              <p
                style={{
                  color: "#cbd5e1",
                  maxWidth: 650,
                  lineHeight: 1.7,
                }}
              >
                Timetable, Events, Navigation, and Academic
                agents are collaboratively processing live
                campus data to provide intelligent assistance.
              </p>
            </div>

            <div
              style={{
                width: 90,
                height: 90,
                borderRadius: "50%",
                background:
                  "linear-gradient(135deg,#38bdf8,#818cf8)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow:
                  "0 0 40px rgba(56,189,248,0.4)",
              }}
            >
              <Sparkles color="white" size={34} />
            </div>
          </div>
        </div>

        {/* STATS */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4,1fr)",
            gap: 14,
            marginBottom: 34,
          }}
        >
          {STATS.map((item) => (
            <div
              key={item.label}
              style={{
                background: "#111827",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 18,
                padding: "22px",
              }}
            >
              <p
                style={{
                  color: "#64748b",
                  fontSize: 12,
                  marginBottom: 8,
                }}
              >
                {item.label}
              </p>

              <h2
                style={{
                  color: "#f8fafc",
                  fontSize: 32,
                  marginBottom: 6,
                }}
              >
                {item.value}
              </h2>

              <p
                style={{
                  color: "#cbd5e1",
                  fontSize: 13,
                }}
              >
                {item.sub}
              </p>
            </div>
          ))}
        </div>

        {/* QUICK ACTIONS */}

        <div style={{ marginBottom: 34 }}>
          <h2
            style={{
              color: "#94a3b8",
              fontSize: 14,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 18,
            }}
          >
            Quick Access
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              gap: 14,
            }}
          >
            {QUICK_ACTIONS.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  onClick={() => navigate(item.to)}
                  style={{
                    background: "#111827",
                    border:
                      "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 20,
                    padding: "24px",
                    cursor: "pointer",
                    transition: "0.2s",
                  }}
                >
                  <div
                    style={{
                      width: 46,
                      height: 46,
                      borderRadius: 14,
                      background: `${item.accent}20`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 16,
                    }}
                  >
                    <Icon size={20} color={item.accent} />
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <h3
                      style={{
                        color: "#f8fafc",
                        fontSize: 18,
                      }}
                    >
                      {item.title}
                    </h3>

                    <ArrowUpRight
                      size={18}
                      color="#64748b"
                    />
                  </div>

                  <p
                    style={{
                      marginTop: 10,
                      color: "#cbd5e1",
                      lineHeight: 1.6,
                      fontSize: 14,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* AGENT STATUS */}

        <div>
          <h2
            style={{
              color: "#94a3b8",
              fontSize: 14,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 18,
            }}
          >
            Active AI Agents
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
              gap: 12,
            }}
          >
            {AGENTS.map((agent, index) => (
              <div
                key={index}
                style={{
                  background: "#111827",
                  border:
                    "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 16,
                  padding: "18px 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: "#38bdf8",
                    boxShadow:
                      "0 0 12px rgba(56,189,248,0.6)",
                  }}
                />

                <p
                  style={{
                    color: "#cbd5e1",
                    fontSize: 14,
                  }}
                >
                  {agent}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FLOATING BUTTON */}

        <button
          onClick={() => navigate("/chatbot")}
          style={{
            position: "fixed",
            right: 28,
            bottom: 28,
            width: 70,
            height: 70,
            borderRadius: "50%",
            border: "none",
            background:
              "linear-gradient(135deg,#38bdf8,#818cf8)",
            color: "white",
            fontSize: 24,
            cursor: "pointer",
            boxShadow:
              "0 12px 40px rgba(56,189,248,0.4)",
          }}
        >
          ✦
        </button>
      </main>
    </div>
  );
}