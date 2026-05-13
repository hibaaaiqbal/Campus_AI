import { useState } from "react";
import Sidebar from "../components/Sidebar";

import {
  Search,
  MapPin,
  Building2,
  FlaskConical,
  BookOpen,
  Users,
  Sparkles,
} from "lucide-react";

const LOCATIONS = [
  {
    name: "CSE Computer Lab A",
    code: "B201",
    block: "Block B",
    floor: "2nd Floor",
    type: "lab",
    hours: "9AM–6PM",
  },

  {
    name: "Advanced Programming Lab",
    code: "B204",
    block: "Block B",
    floor: "2nd Floor",
    type: "lab",
    hours: "9AM–5PM",
  },

  {
    name: "Networking Lab",
    code: "B301",
    block: "Block B",
    floor: "3rd Floor",
    type: "lab",
    hours: "10AM–5PM",
  },

  {
    name: "Library",
    code: "C001",
    block: "Block C",
    floor: "Ground Floor",
    type: "facility",
    hours: "8AM–8PM",
  },

  {
    name: "Placement Cell",
    code: "M105",
    block: "Main Block",
    floor: "1st Floor",
    type: "office",
    hours: "10AM–5PM",
  },

  {
    name: "Main Auditorium",
    code: "AUD",
    block: "Main Block",
    floor: "Ground Floor",
    type: "seminar",
    hours: "By Booking",
  },

  {
    name: "Examination Controller",
    code: "M204",
    block: "Main Block",
    floor: "2nd Floor",
    type: "office",
    hours: "10AM–4PM",
  },
];

const FILTERS = [
  "All",
  "lab",
  "office",
  "facility",
  "seminar",
];

const TYPE_STYLES = {
  lab: {
    icon: FlaskConical,
    color: "#38bdf8",
    bg: "rgba(56,189,248,0.12)",
  },

  office: {
    icon: BookOpen,
    color: "#818cf8",
    bg: "rgba(129,140,248,0.12)",
  },

  facility: {
    icon: Building2,
    color: "#f472b6",
    bg: "rgba(244,114,182,0.12)",
  },

  seminar: {
    icon: Users,
    color: "#22d3ee",
    bg: "rgba(34,211,238,0.12)",
  },
};

export default function Navigation() {
  const [query, setQuery] =
    useState("");

  const [filter, setFilter] =
    useState("All");

  const [selected, setSelected] =
    useState(null);

  const filtered = LOCATIONS.filter(
    (loc) => {
      const matchQuery =
        !query ||
        loc.name
          .toLowerCase()
          .includes(
            query.toLowerCase()
          ) ||
        loc.code
          .toLowerCase()
          .includes(
            query.toLowerCase()
          );

      const matchFilter =
        filter === "All" ||
        loc.type === filter;

      return (
        matchQuery && matchFilter
      );
    }
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
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            Campus Navigation
          </p>

          <h1
            style={{
              fontSize: 40,
              color: "#f8fafc",
              marginBottom: 12,
              fontWeight: 700,
            }}
          >
            Find Campus Locations
          </h1>

          <p
            style={{
              color: "#cbd5e1",
              lineHeight: 1.7,
              maxWidth: 700,
            }}
          >
            Search and locate labs,
            classrooms, offices, and
            campus facilities instantly
            using the AI navigation system.
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

            justifyContent:
              "space-between",

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
                marginBottom: 8,
              }}
            >
              AI Navigation Insight
            </p>

            <h3
              style={{
                color: "#f8fafc",
                fontSize: 24,
                marginBottom: 8,
              }}
            >
              Navigation Agent is active
            </h3>

            <p
              style={{
                color: "#cbd5e1",
                lineHeight: 1.6,
              }}
            >
              Fastest route to Block B
              currently takes 3 minutes
              from the Main Building.
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

        {/* SEARCH */}

        <div
          style={{
            display: "flex",
            gap: 16,
            marginBottom: 28,
            flexWrap: "wrap",
          }}
        >
          {/* INPUT */}

          <div
            style={{
              flex: 1,

              minWidth: 280,

              display: "flex",

              alignItems: "center",

              gap: 10,

              background: "#111827",

              border:
                "1px solid rgba(255,255,255,0.08)",

              borderRadius: 18,

              padding: "14px 18px",
            }}
          >
            <Search
              size={18}
              color="#64748b"
            />

            <input
              value={query}
              onChange={(e) =>
                setQuery(e.target.value)
              }

              placeholder="Search room, lab, office..."

              style={{
                background:
                  "transparent",

                border: "none",

                outline: "none",

                color: "#f8fafc",

                width: "100%",

                fontSize: 15,
              }}
            />
          </div>

          {/* FILTERS */}

          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            {FILTERS.map((item) => (
              <button
                key={item}
                onClick={() =>
                  setFilter(item)
                }

                style={{
                  padding:
                    "10px 18px",

                  borderRadius: 999,

                  border:
                    filter === item
                      ? "1px solid rgba(56,189,248,0.28)"
                      : "1px solid rgba(255,255,255,0.08)",

                  background:
                    filter === item
                      ? "rgba(56,189,248,0.12)"
                      : "transparent",

                  color:
                    filter === item
                      ? "#38bdf8"
                      : "#cbd5e1",

                  cursor: "pointer",

                  textTransform:
                    "capitalize",
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* GRID */}

        <div
          style={{
            display: "grid",

            gridTemplateColumns:
              "repeat(auto-fill,minmax(320px,1fr))",

            gap: 18,
          }}
        >
          {filtered.map((loc) => {
            const t =
              TYPE_STYLES[loc.type];

            const Icon = t.icon;

            const active =
              selected?.code ===
              loc.code;

            return (
              <div
                key={loc.code}
                onClick={() =>
                  setSelected(
                    active
                      ? null
                      : loc
                  )
                }

                style={{
                  background: "#111827",

                  border: active
                    ? `1px solid ${t.color}`
                    : "1px solid rgba(255,255,255,0.06)",

                  borderRadius: 22,

                  padding: "22px",

                  cursor: "pointer",

                  transition: "0.2s",
                }}
              >
                {/* TOP */}

                <div
                  style={{
                    display: "flex",

                    justifyContent:
                      "space-between",

                    alignItems:
                      "flex-start",

                    gap: 12,

                    marginBottom: 18,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: 12,
                    }}
                  >
                    <div
                      style={{
                        width: 48,
                        height: 48,

                        borderRadius: 14,

                        background: t.bg,

                        display: "flex",

                        alignItems:
                          "center",

                        justifyContent:
                          "center",
                      }}
                    >
                      <Icon
                        size={22}
                        color={t.color}
                      />
                    </div>

                    <div>
                      <p
                        style={{
                          color:
                            "#f8fafc",

                          fontSize: 18,

                          marginBottom: 6,

                          lineHeight: 1.4,
                        }}
                      >
                        {loc.name}
                      </p>

                      <span
                        style={{
                          background:
                            t.bg,

                          color:
                            t.color,

                          padding:
                            "4px 8px",

                          borderRadius: 6,

                          fontSize: 11,
                        }}
                      >
                        {loc.code}
                      </span>
                    </div>
                  </div>
                </div>

                {/* DETAILS */}

                <div
                  style={{
                    display: "flex",
                    flexDirection:
                      "column",

                    gap: 10,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems:
                        "center",

                      gap: 8,

                      color:
                        "#cbd5e1",

                      fontSize: 14,
                    }}
                  >
                    <MapPin size={15} />

                    {loc.block} ·{" "}
                    {loc.floor}
                  </div>

                  <p
                    style={{
                      color:
                        "#94a3b8",

                      fontSize: 14,
                    }}
                  >
                    Open Hours:{" "}
                    {loc.hours}
                  </p>
                </div>

                {/* EXPANDED */}

                {active && (
                  <div
                    style={{
                      marginTop: 20,

                      paddingTop: 18,

                      borderTop:
                        "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <p
                      style={{
                        color:
                          "#cbd5e1",

                        lineHeight: 1.7,

                        fontSize: 14,
                      }}
                    >
                      AI Navigation Agent
                      suggests the fastest
                      walking route from
                      your current location.
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}