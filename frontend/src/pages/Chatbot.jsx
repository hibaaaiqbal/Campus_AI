import { useState, useRef, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import {
  ArrowUp,
  RotateCcw,
  Sparkles,
} from "lucide-react";

const SUGGESTIONS = [
  "What's on my timetable today?",
  "Any placement drives this week?",
  "Where is the CSE computer lab?",
  "When are the final exams?",
];

const AGENT_COLORS = {
  timetable: {
    bg: "rgba(56,189,248,0.12)",
    border: "rgba(56,189,248,0.28)",
    text: "#38bdf8",
  },

  events: {
    bg: "rgba(129,140,248,0.12)",
    border: "rgba(129,140,248,0.28)",
    text: "#818cf8",
  },

  navigate: {
    bg: "rgba(244,114,182,0.12)",
    border: "rgba(244,114,182,0.28)",
    text: "#f472b6",
  },

  academic: {
    bg: "rgba(34,211,238,0.12)",
    border: "rgba(34,211,238,0.28)",
    text: "#22d3ee",
  },
};

const MOCK_RESPONSES = {
  timetable: {
    agent: "timetable",

    text:
      "Here's your schedule for today:\n\n• 9:00–10:00 AM — Data Structures (B204)\n• 11:00–12:00 PM — DBMS (A101)\n• 2:00–4:00 PM — OS Lab (Lab-3)\n\nYour next class starts in 45 minutes.",
  },

  placement: {
    agent: "events",

    text:
      "Upcoming placement activities this week:\n\n• TCS Drive — March 20\n• Infosys PPT — March 22\n• Mock Interview Workshop — Tomorrow\n\nRegistrations are currently open.",
  },

  lab: {
    agent: "navigate",

    text:
      "The CSE Computer Lab is located in Block B, 2nd Floor (Room B201). The Advanced Programming Lab is in B204.",
  },

  exam: {
    agent: "academic",

    text:
      "End semester exams begin from April 10. Admit cards will be available from April 5 on the student portal.",
  },

  default: {
    agent: "academic",

    text:
      "I can help with academics, timetable, navigation, placements, and campus events. Please ask your query.",
  },
};

function getResponse(msg) {
  const m = msg.toLowerCase();

  if (
    m.includes("timetable") ||
    m.includes("class") ||
    m.includes("schedule")
  ) {
    return MOCK_RESPONSES.timetable;
  }

  if (
    m.includes("placement") ||
    m.includes("drive") ||
    m.includes("event")
  ) {
    return MOCK_RESPONSES.placement;
  }

  if (
    m.includes("lab") ||
    m.includes("room") ||
    m.includes("where")
  ) {
    return MOCK_RESPONSES.lab;
  }

  if (
    m.includes("exam") ||
    m.includes("final")
  ) {
    return MOCK_RESPONSES.exam;
  }

  return MOCK_RESPONSES.default;
}

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      role: "bot",

      text:
        "Hello Vanshika 👋\n\nI am your multi-agent campus assistant. Ask me about timetable, placements, academics, campus navigation, or events.",

      agent: "academic",
    },
  ]);

  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const send = async (text) => {
    const msg = (text || input).trim();

    if (!msg || loading) return;

    setInput("");

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: msg,
      },
    ]);

    setLoading(true);

    const detected = [];

    if (
      msg.toLowerCase().includes("class") ||
      msg.toLowerCase().includes("timetable") ||
      msg.toLowerCase().includes("schedule")
    ) {
      detected.push("Timetable Agent activated");
    }

    if (
      msg.toLowerCase().includes("placement") ||
      msg.toLowerCase().includes("drive") ||
      msg.toLowerCase().includes("event")
    ) {
      detected.push("Events Agent activated");
    }

    if (
      msg.toLowerCase().includes("lab") ||
      msg.toLowerCase().includes("room") ||
      msg.toLowerCase().includes("where")
    ) {
      detected.push("Navigation Agent activated");
    }

    if (
      msg.toLowerCase().includes("exam") ||
      msg.toLowerCase().includes("academic")
    ) {
      detected.push("Academic Agent activated");
    }

    if (detected.length > 0) {
      setMessages((prev) => [
        ...prev,
        {
          role: "system",
          activations: detected,
        },
      ]);
    }

    await new Promise((r) =>
      setTimeout(r, 1500)
    );

    const { agent, text: reply } =
      getResponse(msg);

    setMessages((prev) => [
      ...prev,
      {
        role: "bot",
        text: reply,
        agent,
      },
    ]);

    setLoading(false);
  };

  const clear = () => {
    setMessages([
      {
        role: "bot",

        text:
          "Chat cleared. Your Campus AI assistant is ready.",

        agent: "academic",
      },
    ]);
  };

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
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* TOP BAR */}

        <div
          style={{
            padding: "20px 32px",
            borderBottom:
              "1px solid rgba(255,255,255,0.06)",

            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 6,
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 12,
                  background:
                    "linear-gradient(135deg,#38bdf8,#818cf8)",

                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Sparkles
                  size={18}
                  color="white"
                />
              </div>

              <h1
                style={{
                  fontSize: 24,
                  color: "#f8fafc",
                  fontWeight: 700,
                }}
              >
                Campus AI
              </h1>
            </div>

            <p
              style={{
                color: "#94a3b8",
                fontSize: 13,
              }}
            >
              Multi-agent intelligent campus assistant
            </p>
          </div>

          <button
            onClick={clear}
            style={{
              background: "#111827",
              border:
                "1px solid rgba(255,255,255,0.08)",

              borderRadius: 12,
              padding: "10px 16px",
              color: "#cbd5e1",
              cursor: "pointer",

              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <RotateCcw size={15} />
            Clear
          </button>
        </div>

        {/* CHAT AREA */}

        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "30px",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {messages.map((m, i) => {
            if (m.role === "system") {
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  {m.activations.map(
                    (a, idx) => (
                      <div
                        key={idx}
                        style={{
                          background:
                            "rgba(56,189,248,0.08)",

                          border:
                            "1px solid rgba(56,189,248,0.2)",

                          color: "#38bdf8",

                          padding:
                            "11px 14px",

                          borderRadius: 12,

                          width: "fit-content",

                          fontSize: 12,

                          fontFamily:
                            "'JetBrains Mono', monospace",
                        }}
                      >
                        ● {a}
                      </div>
                    )
                  )}
                </div>
              );
            }

            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",

                  alignItems:
                    m.role === "user"
                      ? "flex-end"
                      : "flex-start",

                  gap: 6,
                }}
              >
                {m.role === "bot" &&
                  m.agent &&
                  (() => {
                    const c =
                      AGENT_COLORS[m.agent];

                    return (
                      <span
                        style={{
                          fontFamily:
                            "'JetBrains Mono', monospace",

                          fontSize: 10,

                          letterSpacing:
                            "0.08em",

                          textTransform:
                            "uppercase",

                          color: c.text,

                          background:
                            c.bg,

                          border:
                            `1px solid ${c.border}`,

                          padding:
                            "3px 8px",

                          borderRadius: 4,
                        }}
                      >
                        {m.agent}
                      </span>
                    );
                  })()}

                <div
                  style={{
                    maxWidth: "72%",

                    padding:
                      "14px 18px",

                    borderRadius:
                      m.role === "user"
                        ? "18px 18px 4px 18px"
                        : "4px 18px 18px 18px",

                    background:
                      m.role === "user"
                        ? "linear-gradient(135deg,#38bdf8,#818cf8)"
                        : "#111827",

                    border:
                      m.role === "user"
                        ? "none"
                        : "1px solid rgba(255,255,255,0.06)",

                    color: "#f8fafc",

                    lineHeight: 1.7,

                    fontSize: 14,

                    whiteSpace: "pre-line",
                  }}
                >
                  {m.text}
                </div>
              </div>
            );
          })}

          {/* LOADING */}

          {loading && (
            <div
              style={{
                display: "flex",
                gap: 6,
                paddingLeft: 4,
              }}
            >
              {[0, 1, 2].map((n) => (
                <span
                  key={n}
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#38bdf8",
                    animation:
                      "bounce 1s infinite",
                    animationDelay: `${n * 0.15}s`,
                  }}
                />
              ))}
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* SUGGESTIONS */}

        {messages.length <= 1 && (
          <div
            style={{
              padding:
                "0 30px 14px",

              display: "flex",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                style={{
                  padding:
                    "10px 16px",

                  borderRadius: 999,

                  border:
                    "1px solid rgba(255,255,255,0.08)",

                  background:
                    "rgba(255,255,255,0.04)",

                  color: "#cbd5e1",

                  cursor: "pointer",

                  fontSize: 13,
                }}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* INPUT */}

        <div
          style={{
            padding: "20px 30px 26px",

            borderTop:
              "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,

              background: "#111827",

              border:
                "1px solid rgba(255,255,255,0.08)",

              borderRadius: 20,

              padding:
                "14px 16px",
            }}
          >
            <textarea
              rows={1}
              value={input}
              onChange={(e) =>
                setInput(e.target.value)
              }

              onKeyDown={(e) => {
                if (
                  e.key === "Enter" &&
                  !e.shiftKey
                ) {
                  e.preventDefault();

                  send();
                }
              }}

              placeholder="Ask your campus assistant anything..."

              style={{
                flex: 1,

                background:
                  "transparent",

                border: "none",

                outline: "none",

                color: "white",

                resize: "none",

                fontSize: 15,

                fontFamily:
                  "'DM Sans', sans-serif",
              }}
            />

            <button
              onClick={() => send()}

              disabled={
                !input.trim() || loading
              }

              style={{
                width: 46,
                height: 46,

                borderRadius: 14,

                border: "none",

                background:
                  "linear-gradient(135deg,#38bdf8,#818cf8)",

                color: "white",

                cursor: "pointer",

                fontSize: 18,

                fontWeight: 700,
              }}
            >
              <ArrowUp size={18} />
            </button>
          </div>

          <p
            style={{
              textAlign: "center",

              color: "#64748b",

              fontSize: 11,

              marginTop: 10,
            }}
          >
            Press Enter to send · Shift + Enter for new line
          </p>
        </div>
      </main>

      <style>{`
        @keyframes bounce {
          0%, 60%, 100% {
            transform: translateY(0);
            opacity: 0.4;
          }

          30% {
            transform: translateY(-6px);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}