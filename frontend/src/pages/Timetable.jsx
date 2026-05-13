import { useState, useEffect, useContext } from "react";
import Sidebar from "../components/Sidebar";
import { UserContext } from "../context/UserContext";
import {
  Clock,
  MapPin,
  Sparkles,
} from "lucide-react";

export default function Timetable() {
  const { currentUser } = useContext(UserContext);
  const [timetable, setTimetable] = useState({});
  const [days, setDays] = useState([]);
  const [activeDay, setActiveDay] = useState("");
  const [loading, setLoading] = useState(true);

  const timeToMinutes = (timeStr) => {
    const [time, period] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (period === 'PM' && hours !== 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    return hours * 60 + minutes;
  };

  useEffect(() => {
    const fetchTimetable = async () => {
      try {
        const res = await fetch("/api/student/timetable", {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            // Group by day
            const grouped = {};
            data.data.forEach((item) => {
              if (!grouped[item.day]) {
                grouped[item.day] = [];
              }
              grouped[item.day].push(item);
            });

            // Sort each day's slots by startTime (not lectureNumber)
            Object.keys(grouped).forEach((day) => {
              grouped[day].sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));
            });

            setTimetable(grouped);
            const dayList = Object.keys(grouped).sort(); // Sort days
            setDays(dayList);
            if (dayList.length > 0) {
              setActiveDay(dayList[0]); // Set first day as active
            }
          }
        }
      } catch (error) {
        console.error("Error fetching timetable:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTimetable();
  }, []);

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const todaySlots = timetable[today] || [];
  const activeClasses = todaySlots.filter(slot => slot.type !== 'Break').length;
  const nextClass = todaySlots.find(slot => {
    const now = new Date();
    const startTime = new Date();
    const [time, period] = slot.startTime.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    startTime.setHours(period === 'PM' && hours !== 12 ? hours + 12 : hours === 12 && period === 'AM' ? 0 : hours, minutes);
    return startTime > now && slot.type !== 'Break';
  });

  const slots = timetable[activeDay] || [];

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
            Academic Schedule
          </p>

          <h1
            style={{
              fontSize: 40,
              color: "#f8fafc",
              marginBottom: 12,
            }}
          >
            Class Timetable
          </h1>

          <p
            style={{
              color: "#cbd5e1",
              lineHeight: 1.7,
            }}
          >
            {currentUser?.branch} · Semester {currentUser?.semester} · ABES Engineering College
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

            marginBottom: 30,

            display: "flex",
            justifyContent:
              "space-between",

            alignItems: "center",
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
              AI Schedule Insight
            </p>

            <h3
              style={{
                color: "#f8fafc",
                fontSize: 24,
                marginBottom: 8,
              }}
            >
              You have {activeClasses} classes today
            </h3>

            <p
              style={{
                color: "#cbd5e1",
                lineHeight: 1.6,
              }}
            >
              {nextClass ? `${nextClass.subject} starts at ${nextClass.startTime} in ${nextClass.room}.` : "No more classes today."}
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
            }}
          >
            <Sparkles
              size={26}
              color="white"
            />
          </div>
        </div>

        {/* DAY BUTTONS */}

        <div
          style={{
            display: "flex",
            gap: 10,
            marginBottom: 30,
          }}
        >
          {days.map((day) => (
            <button
              key={day}
              onClick={() =>
                setActiveDay(day)
              }

              style={{
                padding: "10px 18px",

                borderRadius: 999,

                border:
                  activeDay === day
                    ? "1px solid rgba(56,189,248,0.28)"
                    : "1px solid rgba(255,255,255,0.08)",

                background:
                  activeDay === day
                    ? "rgba(56,189,248,0.12)"
                    : "transparent",

                color:
                  activeDay === day
                    ? "#38bdf8"
                    : "#cbd5e1",

                cursor: "pointer",
              }}
            >
              {day}
            </button>
          ))}
        </div>

        {/* SLOTS */}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {loading ? (
            <p style={{ color: "#cbd5e1" }}>Loading timetable...</p>
          ) : slots.length === 0 ? (
            <p style={{ color: "#cbd5e1" }}>No classes scheduled for {activeDay}.</p>
          ) : (
            slots.map((slot, index) => (
            <div
              key={index}
              style={{
                background: "#111827",

                border:
                  "1px solid rgba(255,255,255,0.06)",

                borderRadius: 20,

                padding: "22px",

                display: "grid",

                gridTemplateColumns:
                  "180px 1fr auto",

                alignItems: "center",

                gap: 20,
              }}
            >
              {/* TIME */}

              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,

                    color: "#38bdf8",

                    marginBottom: 8,
                  }}
                >
                  <Clock size={15} />

                  {slot.timeSlot}
                </div>

                <span
                  style={{
                    background:
                      slot.type === "Break"
                        ? "rgba(156,163,175,0.12)"
                        : slot.type === "Lab"
                        ? "rgba(244,114,182,0.12)"
                        : "rgba(129,140,248,0.12)",

                    color:
                      slot.type === "Break"
                        ? "#9ca3af"
                        : slot.type === "Lab"
                        ? "#f472b6"
                        : "#818cf8",

                    padding: "4px 8px",

                    borderRadius: 6,

                    fontSize: 11,
                  }}
                >
                  {slot.type}
                </span>
              </div>

              {/* SUBJECT */}

              <div>
                <h2
                  style={{
                    color: "#f8fafc",
                    fontSize: 22,
                    marginBottom: 8,
                  }}
                >
                  {slot.subject}
                </h2>

                <p
                  style={{
                    color: "#cbd5e1",
                    fontSize: 14,
                  }}
                >
                  {slot.faculty}
                </p>
              </div>

              {/* ROOM */}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,

                  background:
                    "rgba(255,255,255,0.04)",

                  border:
                    "1px solid rgba(255,255,255,0.08)",

                  padding: "10px 14px",

                  borderRadius: 12,

                  color: "#cbd5e1",
                }}
              >
                <MapPin size={15} />
                {slot.room}
              </div>
            </div>
          ))
          )}
        </div>
      </main>
    </div>
  );
}