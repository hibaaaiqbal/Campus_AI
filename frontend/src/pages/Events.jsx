import { useState } from "react";
import Sidebar from "../components/Sidebar";
import {
  Calendar,
  MapPin,
  Clock,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

const CATEGORIES = [
  "All",
  "Placement",
  "Technical",
  "Workshop",
  "Cultural",
];

const EVENTS = [
  {
    id: 1,
    title: "TCS National Qualifier Test",
    category: "Placement",
    date: "March 20, 2025",
    time: "10:00 AM",
    venue: "Seminar Hall A",
    desc:
      "National hiring drive for B.Tech students. Registrations are live on the placement portal.",
    status: "open",
  },

  {
    id: 2,
    title: "Infosys Campus Connect",
    category: "Placement",
    date: "March 22, 2025",
    time: "9:00 AM",
    venue: "Main Auditorium",
    desc:
      "Pre-placement talk and aptitude round for eligible students.",
    status: "upcoming",
  },

  {
    id: 3,
    title: "24-Hour Hackathon",
    category: "Technical",
    date: "March 25, 2025",
    time: "11:00 AM",
    venue: "Innovation Hub",
    desc:
      "Build innovative AI-powered solutions in teams of 3–4 students.",
    status: "open",
  },

  {
    id: 4,
    title: "Mock Interview Workshop",
    category: "Workshop",
    date: "March 19, 2025",
    time: "3:00 PM",
    venue: "Seminar Hall B",
    desc:
      "Technical + HR interview preparation with industry experts.",
    status: "open",
  },
];

const STATUS_STYLE = {
  open: {
    bg: "rgba(56,189,248,0.12)",
    border: "rgba(56,189,248,0.28)",
    text: "#38bdf8",
    label: "Open",
  },

  upcoming: {
    bg: "rgba(129,140,248,0.12)",
    border: "rgba(129,140,248,0.28)",
    text: "#818cf8",
    label: "Upcoming",
  },
};

export default function Events() {
  const [filter, setFilter] = useState("All");

  const filtered =
    filter === "All"
      ? EVENTS
      : EVENTS.filter(
          (e) => e.category === filter
        );

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
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              marginBottom: 10,
            }}
          >
            Campus Events
          </p>

          <h1
            style={{
              fontSize: 40,
              color: "#f8fafc",
              fontWeight: 700,
              marginBottom: 12,
            }}
          >
            Events & Announcements
          </h1>

          <p
            style={{
              color: "#cbd5e1",
              maxWidth: 700,
              lineHeight: 1.7,
            }}
          >
            Stay updated with placements,
            hackathons, workshops, and
            technical activities happening
            across campus.
          </p>
        </div>

        {/* AI INSIGHT */}

        <div
          style={{
            background:
              "linear-gradient(135deg, rgba(56,189,248,0.14), rgba(129,140,248,0.1))",

            border:
              "1px solid rgba(56,189,248,0.14)",

            borderRadius: 20,

            padding: "24px",

            marginBottom: 28,

            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 20,
          }}
        >
          <div>
            <p
              style={{
                color: "#38bdf8",
                fontSize: 12,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: 8,
              }}
            >
              AI Insight
            </p>

            <h3
              style={{
                color: "#f8fafc",
                fontSize: 24,
                marginBottom: 8,
              }}
            >
              3 placement activities this week
            </h3>

            <p
              style={{
                color: "#cbd5e1",
                lineHeight: 1.6,
              }}
            >
              Campus AI recommends registering
              for the TCS drive before tomorrow.
            </p>
          </div>

          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background:
                "linear-gradient(135deg,#38bdf8,#818cf8)",

              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              boxShadow:
                "0 0 30px rgba(56,189,248,0.35)",
            }}
          >
            <Sparkles
              size={26}
              color="white"
            />
          </div>
        </div>

        {/* FILTERS */}

        <div
          style={{
            display: "flex",
            gap: 10,
            marginBottom: 30,
            flexWrap: "wrap",
          }}
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                padding: "10px 18px",

                borderRadius: 999,

                border:
                  filter === cat
                    ? "1px solid rgba(56,189,248,0.28)"
                    : "1px solid rgba(255,255,255,0.08)",

                background:
                  filter === cat
                    ? "rgba(56,189,248,0.12)"
                    : "transparent",

                color:
                  filter === cat
                    ? "#38bdf8"
                    : "#cbd5e1",

                cursor: "pointer",

                fontSize: 13,
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* EVENTS GRID */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(2,1fr)",

            gap: 18,
          }}
        >
          {filtered.map((event) => {
            const s =
              STATUS_STYLE[event.status];

            return (
              <div
                key={event.id}
                style={{
                  background: "#111827",

                  border:
                    "1px solid rgba(255,255,255,0.06)",

                  borderRadius: 22,

                  padding: "24px",

                  transition: "0.2s",

                  cursor: "pointer",
                }}
              >
                {/* TOP */}

                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      "space-between",

                    marginBottom: 18,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                    }}
                  >
                    <span
                      style={{
                        background:
                          "rgba(129,140,248,0.12)",

                        border:
                          "1px solid rgba(129,140,248,0.22)",

                        color: "#818cf8",

                        padding:
                          "4px 8px",

                        borderRadius: 6,

                        fontSize: 11,
                      }}
                    >
                      {event.category}
                    </span>

                    <span
                      style={{
                        background: s.bg,
                        border: `1px solid ${s.border}`,
                        color: s.text,
                        padding:
                          "4px 8px",
                        borderRadius: 6,
                        fontSize: 11,
                      }}
                    >
                      {s.label}
                    </span>
                  </div>

                  <ArrowUpRight
                    size={18}
                    color="#64748b"
                  />
                </div>

                {/* TITLE */}

                <h2
                  style={{
                    color: "#f8fafc",

                    fontSize: 22,

                    marginBottom: 12,

                    lineHeight: 1.4,
                  }}
                >
                  {event.title}
                </h2>

                {/* META */}

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    marginBottom: 16,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      alignItems: "center",
                      color: "#94a3b8",
                      fontSize: 13,
                    }}
                  >
                    <Calendar size={14} />
                    {event.date}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      alignItems: "center",
                      color: "#94a3b8",
                      fontSize: 13,
                    }}
                  >
                    <Clock size={14} />
                    {event.time}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      alignItems: "center",
                      color: "#94a3b8",
                      fontSize: 13,
                    }}
                  >
                    <MapPin size={14} />
                    {event.venue}
                  </div>
                </div>

                {/* DESCRIPTION */}

                <p
                  style={{
                    color: "#cbd5e1",

                    lineHeight: 1.7,

                    fontSize: 14,
                  }}
                >
                  {event.desc}
                </p>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}