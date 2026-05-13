import { motion } from "framer-motion";
import { useContext } from "react";
import {
  Sparkles,
  CalendarDays,
  MapPin,
  Briefcase,
  Clock3,
  Bot,
} from "lucide-react";
import { UserContext } from "../context/UserContext";

const suggestions = [
  "Today's timetable",
  "Upcoming events",
  "Find Block B",
  "Placement drives",
];

const agents = [
  {
    name: "Timetable Agent",
    color: "#60a5fa",
  },
  {
    name: "Events Agent",
    color: "#f59e0b",
  },
  {
    name: "Navigation Agent",
    color: "#e879f9",
  },
  {
    name: "Academic Agent",
    color: "#4ade80",
  },
];

const activities = [
  "Timetable Agent synced today's schedule",
  "Placement Agent found 3 new drives",
  "Navigation Agent updated campus routes",
  "Academic Agent uploaded exam notices",
];

export default function AIAssistant() {
  const { currentUser } = useContext(UserContext);
  const userName = currentUser?.firstName || currentUser?.rollNo || "Student";

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #1e293b 0%, #0c0f14 45%)",
        color: "white",
        overflow: "hidden",
        position: "relative",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "rgba(74,222,128,0.12)",
          filter: "blur(120px)",
          top: -100,
          left: "50%",
          transform: "translateX(-50%)",
        }}
      />

      {/* Main Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 70,
          paddingBottom: 50,
          width: "100%",
        }}
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 30,
          }}
        >
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 14,
              background: "rgba(74,222,128,0.12)",
              border: "1px solid rgba(74,222,128,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Bot size={22} color="#4ade80" />
          </div>

          <h1
            style={{
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: "-0.03em",
            }}
          >
            Campus AI
          </h1>
        </motion.div>

        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            textAlign: "center",
            maxWidth: 700,
            padding: "0 20px",
          }}
        >
          <p
            style={{
              color: "#4ade80",
              fontSize: 13,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            Multi-Agent Campus System
          </p>

          <h2
            style={{
              fontSize: 60,
              lineHeight: 1.1,
              fontWeight: 700,
              marginBottom: 18,
            }}
          >
            Good Evening {userName} 👋
          </h2>

          <p
            style={{
              color: "#94a3b8",
              fontSize: 18,
              lineHeight: 1.6,
            }}
          >
            Your intelligent campus assistant is ready to help with
            academics, navigation, events, placements, and schedules.
          </p>
        </motion.div>

        {/* AI Orb */}
        <motion.div
          animate={{
            scale: [1, 1.06, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
          style={{
            marginTop: 60,
            marginBottom: 50,
            width: 180,
            height: 180,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 30% 30%, #4ade80, #0f172a)",
            boxShadow:
              "0 0 60px rgba(74,222,128,0.35), 0 0 120px rgba(74,222,128,0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Sparkles size={50} color="white" />
        </motion.div>

        {/* Suggestion Chips */}
        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: 50,
            padding: "0 20px",
          }}
        >
          {suggestions.map((item, index) => (
            <motion.button
              whileHover={{
                scale: 1.05,
              }}
              key={index}
              style={{
                padding: "12px 20px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.04)",
                color: "#e2e8f0",
                cursor: "pointer",
                fontSize: 14,
                backdropFilter: "blur(10px)",
              }}
            >
              {item}
            </motion.button>
          ))}
        </div>

        {/* Agents */}
        <div
          style={{
            width: "90%",
            maxWidth: 1100,
            marginBottom: 40,
          }}
        >
          <h3
            style={{
              marginBottom: 18,
              color: "#94a3b8",
              fontSize: 14,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Active AI Agents
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
              gap: 16,
            }}
          >
            {agents.map((agent, index) => (
              <motion.div
                whileHover={{
                  y: -4,
                }}
                key={index}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 18,
                  padding: 22,
                  backdropFilter: "blur(12px)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <p
                    style={{
                      fontSize: 15,
                      fontWeight: 500,
                    }}
                  >
                    {agent.name}
                  </p>

                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: agent.color,
                      boxShadow: `0 0 12px ${agent.color}`,
                    }}
                  />
                </div>

                <p
                  style={{
                    marginTop: 12,
                    color: "#94a3b8",
                    fontSize: 13,
                    lineHeight: 1.5,
                  }}
                >
                  Online and actively monitoring campus data.
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div
          style={{
            width: "90%",
            maxWidth: 1100,
            marginBottom: 40,
          }}
        >
          <h3
            style={{
              marginBottom: 18,
              color: "#94a3b8",
              fontSize: 14,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Recent AI Activity
          </h3>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {activities.map((activity, index) => (
              <motion.div
                whileHover={{
                  x: 4,
                }}
                key={index}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  borderRadius: 14,
                  padding: "16px 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <Clock3 size={16} color="#4ade80" />

                <p
                  style={{
                    color: "#cbd5e1",
                    fontSize: 14,
                  }}
                >
                  {activity}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Input */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            width: "90%",
            maxWidth: 850,
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 20,
              padding: "14px 18px",
              backdropFilter: "blur(20px)",
            }}
          >
            <input
              type="text"
              placeholder="Ask your campus assistant anything..."
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                color: "white",
                fontSize: 15,
              }}
            />

            <button
              style={{
                width: 46,
                height: 46,
                borderRadius: 14,
                border: "none",
                background: "#4ade80",
                color: "#0f172a",
                cursor: "pointer",
                fontWeight: 700,
                fontSize: 16,
              }}
            >
              ↑
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}