import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

import {
  ArrowRight,
  BookOpen,
  Zap,
  MapPin,
  Sparkles,
  ShieldCheck,
  GraduationCap,
  Bot,
} from "lucide-react";

const FEATURES = [
  {
    icon: BookOpen,
    label: "Academic Assistant",
    desc: "Syllabus, attendance, exams & results",
  },

  {
    icon: Zap,
    label: "Live Campus Updates",
    desc: "Placements, workshops & events",
  },

  {
    icon: MapPin,
    label: "Smart Navigation",
    desc: "Labs, rooms & buildings instantly",
  },
];

export default function Login() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser, refreshUser } = useContext(UserContext);

  const [rollNo, setRollNo] = useState("");
  const [password, setPassword] = useState("");

  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard");
    }
  }, [currentUser, navigate]);

  const handleLogin = async () => {
    setError("");

    if (role !== "student") {
      setError("Only student login is supported right now.");
      return;
    }

    try {
      console.log("🔵 Login started");
      setLoading(true);

      console.log("📤 Sending data:", { rollNo, password });

      const res = await fetch("/api/student/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // REQUIRED for cookies
        body: JSON.stringify({
          rollNo,
          password,
        }),
      });

      console.log("📥 Response status:", res.status);

      const data = await res.json();
      console.log("📦 Response body:", data);

      if (!res.ok) {
        const message = data?.message || "Invalid login credentials";
        setError(message);
        console.error("❌ Login failed:", message);
        return;
      }

      console.log("✅ Login successful");
      console.log("👤 User data:", data.data);
      setCurrentUser(data.data);
      await refreshUser();

      // navigate after success
      navigate("/dashboard");
    } catch (error) {
      console.error("🔥 Error during login:", error);
      setError("Unable to login right now. Please try again.");
    } finally {
      setLoading(false);
      console.log("🔚 Login finished");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1.1fr 0.9fr",
        background: "#050816",
        fontFamily: "'DM Sans', sans-serif",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* BACKGROUND LIGHT */}

      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "rgba(6,182,212,0.12)",
          filter: "blur(120px)",
          top: -180,
          left: -120,
        }}
      />

      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "rgba(139,92,246,0.12)",
          filter: "blur(120px)",
          bottom: -200,
          right: -120,
        }}
      />

      {/* LEFT PANEL */}

      <div
        style={{
          position: "relative",
          overflow: "hidden",
          borderRight:
            "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* IMAGE */}

        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1400&auto=format&fit=crop"
          alt="students"

          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: "scale(1.04)",
          }}
        />

        {/* OVERLAY */}

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(5,8,22,0.98), rgba(5,8,22,0.55), rgba(5,8,22,0.25))",
          }}
        />

        {/* CONTENT */}

        <div
          style={{
            position: "absolute",
            inset: 0,
            padding: "56px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            zIndex: 2,
          }}
        >
          {/* TOP */}

          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background:
                  "rgba(255,255,255,0.08)",
                border:
                  "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(10px)",
                borderRadius: 999,
                padding: "10px 18px",
                marginBottom: 34,
              }}
            >
              <Bot
                size={16}
                color="#22d3ee"
              />

              <span
                style={{
                  color: "#e2e8f0",
                  fontSize: 13,
                  fontWeight: 500,
                }}
              >
                Agentic AI Platform
              </span>
            </div>

            <p
              style={{
                color: "#22d3ee",
                fontSize: 12,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: 18,
                fontWeight: 600,
              }}
            >
              Smart Campus Ecosystem
            </p>

            <h1
              style={{
                fontSize: 82,
                lineHeight: 0.92,
                color: "white",
                marginBottom: 24,
                fontWeight: 800,
                letterSpacing: "-0.05em",
              }}
            >
              Campus
              <br />
              Assistant
            </h1>

            <p
              style={{
                color: "#cbd5e1",
                fontSize: 17,
                lineHeight: 1.9,
                maxWidth: 520,
              }}
            >
              AI-powered campus companion
              for timetable management,
              academics, placements,
              navigation, and real-time
              student assistance.
            </p>

            {/* FEATURES */}

            <div
              style={{
                marginTop: 42,
                display: "flex",
                flexDirection: "column",
                gap: 18,
              }}
            >
              {FEATURES.map(
                ({
                  icon: Icon,
                  label,
                  desc,
                }) => (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      gap: 14,
                    }}
                  >
                    <div
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: 14,
                        background:
                          "rgba(6,182,212,0.12)",
                        border:
                          "1px solid rgba(6,182,212,0.18)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Icon
                        size={18}
                        color="#22d3ee"
                      />
                    </div>

                    <div>
                      <p
                        style={{
                          color: "white",
                          fontSize: 15,
                          fontWeight: 600,
                          marginBottom: 4,
                        }}
                      >
                        {label}
                      </p>

                      <p
                        style={{
                          color: "#94a3b8",
                          fontSize: 13,
                        }}
                      >
                        {desc}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>

          {/* FOOTER */}

          <div
            style={{
              display: "flex",
              gap: 16,
            }}
          >
            {[
              {
                value: "24/7",
                label: "AI Support",
              },

              {
                value: "12K+",
                label: "Students",
              },

              {
                value: "4",
                label: "AI Agents",
              },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  background:
                    "rgba(255,255,255,0.06)",
                  border:
                    "1px solid rgba(255,255,255,0.08)",
                  backdropFilter:
                    "blur(10px)",
                  borderRadius: 20,
                  padding: "16px 20px",
                  minWidth: 120,
                }}
              >
                <h3
                  style={{
                    color: "white",
                    fontSize: 26,
                    marginBottom: 6,
                  }}
                >
                  {item.value}
                </h3>

                <p
                  style={{
                    color: "#94a3b8",
                    fontSize: 12,
                  }}
                >
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 420,
          }}
        >
          {/* ICON */}

          <div
            style={{
              width: 78,
              height: 78,
              borderRadius: 24,
              background:
                "linear-gradient(135deg,#06b6d4,#8b5cf6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 30,
              boxShadow:
                "0 0 40px rgba(6,182,212,0.3)",
            }}
          >
            <Sparkles
              size={32}
              color="white"
            />
          </div>

          {/* TITLE */}

          <h2
            style={{
              color: "white",
              fontSize: 44,
              lineHeight: 1.1,
              marginBottom: 14,
              fontWeight: 700,
            }}
          >
            Welcome Back 👋
          </h2>

          <p
            style={{
              color: "#94a3b8",
              lineHeight: 1.8,
              fontSize: 15,
              marginBottom: 34,
            }}
          >
            Continue to your AI-powered
            campus workspace.
          </p>

          {/* ROLE */}

          <div
            style={{
              display: "flex",
              gap: 14,
              marginBottom: 28,
            }}
          >
            {[
              {
                key: "student",
                label: "Student",
                icon: GraduationCap,
                gradient:
                  "linear-gradient(135deg,#06b6d4,#3b82f6)",
              },

              {
                key: "admin",
                label: "Admin",
                icon: ShieldCheck,
                gradient:
                  "linear-gradient(135deg,#8b5cf6,#d946ef)",
              },
            ].map((item) => {
              const Icon = item.icon;

              const active =
                role === item.key;

              return (
                <button
                  key={item.key}
                  onClick={() =>
                    setRole(item.key)
                  }

                  style={{
                    flex: 1,
                    height: 90,
                    borderRadius: 24,
                    border: active
                      ? "none"
                      : "1px solid rgba(255,255,255,0.08)",
                    background: active
                      ? item.gradient
                      : "rgba(255,255,255,0.04)",
                    color: "white",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection:
                      "column",
                    alignItems: "center",
                    justifyContent:
                      "center",
                    gap: 10,
                  }}
                >
                  <Icon size={24} />

                  <span
                    style={{
                      fontWeight: 600,
                    }}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* INPUTS */}

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 18,
            }}
          >
            <input
              type="text"
              value={rollNo}
              onChange={(e) =>
                setRollNo(e.target.value)
              }

              placeholder={
                role === "student"
                  ? "Enter Roll Number"
                  : "Enter Admin ID"
              }

              style={{
                width: "100%",
                height: 66,
                borderRadius: 20,
                border:
                  "1px solid rgba(255,255,255,0.08)",
                background:
                  "rgba(255,255,255,0.04)",
                color: "white",
                fontSize: 15,
                outline: "none",
                padding: "0 22px",
              }}
            />

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }

              placeholder="Enter Password"

              style={{
                width: "100%",
                height: 66,
                borderRadius: 20,
                border:
                  "1px solid rgba(255,255,255,0.08)",
                background:
                  "rgba(255,255,255,0.04)",
                color: "white",
                fontSize: 15,
                outline: "none",
                padding: "0 22px",
              }}
            />

            {error && (
              <div
                style={{
                  color: "#f87171",
                  background: "rgba(248,113,113,0.12)",
                  border: "1px solid rgba(248,113,113,0.2)",
                  borderRadius: 14,
                  padding: "12px 16px",
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                {error}
              </div>
            )}
          </div>

          {/* BUTTON */}

          <button
            onClick={handleLogin}
            disabled={loading}

            style={{
              width: "100%",
              marginTop: 28,
              height: 68,
              border: "none",
              borderRadius: 22,
              background:
                role === "student"
                  ? "linear-gradient(135deg,#06b6d4,#3b82f6)"
                  : "linear-gradient(135deg,#8b5cf6,#d946ef)",
              color: "white",
              fontSize: 16,
              fontWeight: 700,
              cursor: loading
                ? "not-allowed"
                : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              boxShadow:
                "0 14px 40px rgba(6,182,212,0.22)",
            }}
          >
            {loading
              ? "Signing in..."
              : "Continue to Dashboard"}

            {!loading && (
              <ArrowRight size={18} />
            )}
          </button>

          {/* FOOTER */}

          <p
            style={{
              marginTop: 26,
              textAlign: "center",
              fontSize: 12,
              color: "#64748b",
              lineHeight: 1.7,
            }}
          >
            Secure AI-powered campus
            management platform
          </p>
        </div>
      </div>

      {/* MOBILE */}

      <style>{`
        @media (max-width: 900px) {
          div[style*="gridTemplateColumns"] {
            grid-template-columns: 1fr !important;
          }

          div[style*="gridTemplateColumns"] > div:first-child {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}