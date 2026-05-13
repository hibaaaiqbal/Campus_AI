import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Sparkles,
  ArrowRight,
  User,
  Mail,
  Lock,
  GraduationCap,
} from "lucide-react";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    rollNo: "",
    password: "",
    firstName: "",
    lastName: "",
    semester: "",
    branch: "",
    section: "",
    collegeEmail: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      console.log("SIGNUP DATA:", formData);

      const res = await fetch("/api/student/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rollNo: formData.rollNo,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          semester: parseInt(formData.semester),
          branch: formData.branch,
          section: formData.section.toUpperCase(),
          collegeEmail: formData.collegeEmail,
        }),
      });

      const data = await res.json();
      console.log("Signup response:", data);

      if (!res.ok) {
        setError(data.message || "Signup failed");
        return;
      }

      navigate("/login");
    } catch (error) {
      console.error("Signup error:", error);
      setError("Unable to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        background: "#050816",
        fontFamily: "'DM Sans', sans-serif",
        overflow: "hidden",
      }}
    >
      {/* LEFT SECTION */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background Image */}
        <img
          src="/hero.png"
          alt="campus"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(35%)",
          }}
        />

        {/* Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            padding: "50px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            {/* Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 18px",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "#fff",
                fontSize: "13px",
                marginBottom: "30px",
              }}
            >
              <Sparkles size={15} />
              Agentic AI Platform
            </div>

            {/* Heading */}
            <h1
              style={{
                fontSize: "78px",
                lineHeight: "0.95",
                color: "white",
                fontWeight: "700",
                marginBottom: "24px",
              }}
            >
              Join
              <br />
              Campus AI
            </h1>

            {/* Description */}
            <p
              style={{
                color: "rgba(255,255,255,0.75)",
                fontSize: "18px",
                lineHeight: "1.7",
                maxWidth: "560px",
              }}
            >
              Create your student account to access
              timetable management, academic support,
              placements, smart campus navigation, and
              AI-powered assistance.
            </p>
          </div>

          {/* Bottom Stats */}
          <div
            style={{
              display: "flex",
              gap: "16px",
            }}
          >
            {[
              { number: "24/7", label: "AI Support" },
              { number: "12K+", label: "Students" },
              { number: "4", label: "AI Agents" },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  padding: "22px",
                  borderRadius: "20px",
                  minWidth: "130px",
                  backdropFilter: "blur(10px)",
                }}
              >
                <h2
                  style={{
                    color: "white",
                    fontSize: "34px",
                    marginBottom: "8px",
                  }}
                >
                  {item.number}
                </h2>

                <p
                  style={{
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "14px",
                  }}
                >
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at top, #07152f 0%, #020617 70%)",
          padding: "30px 40px",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: "520px",
          }}
        >
          {/* Logo */}
          <div
            style={{
              width: "74px",
              height: "74px",
              borderRadius: "24px",
              background:
                "linear-gradient(135deg,#06b6d4,#8b5cf6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "28px",
              boxShadow: "0 0 40px rgba(59,130,246,0.3)",
            }}
          >
            <Sparkles size={34} color="white" />
          </div>

          {/* Heading */}
          <h1
            style={{
              color: "white",
              fontSize: "52px",
              lineHeight: "1",
              marginBottom: "14px",
              fontWeight: "700",
            }}
          >
            Create Account 🚀
          </h1>

          <p
            style={{
              color: "rgba(255,255,255,0.65)",
              fontSize: "17px",
              marginBottom: "28px",
            }}
          >
            Register to continue to your AI campus workspace.
          </p>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "14px",
            }}
          >
            {/* Roll Number */}
            <InputField
              icon={<User size={16} />}
              placeholder="Roll Number"
              name="rollNo"
              value={formData.rollNo}
              onChange={handleChange}
            />

            {/* Semester */}
            <InputField
              icon={<GraduationCap size={16} />}
              placeholder="Semester"
              name="semester"
              type="number"
              value={formData.semester}
              onChange={handleChange}
            />

            {/* First Name */}
            <InputField
              icon={<User size={16} />}
              placeholder="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />

            {/* Last Name */}
            <InputField
              icon={<User size={16} />}
              placeholder="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />

            {/* Email */}
            <div style={{ gridColumn: "span 2" }}>
              <InputField
                icon={<Mail size={16} />}
                placeholder="College Email"
                name="collegeEmail"
                type="email"
                value={formData.collegeEmail}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div style={{ gridColumn: "span 2" }}>
              <InputField
                icon={<Lock size={16} />}
                placeholder="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {error && (
              <div style={{ gridColumn: "span 2" }}>
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
              </div>
            )}

            {/* Branch */}
            <select
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              required
              style={selectStyle}
            >
              <option value="">Select Branch</option>
              <option value="CSE">CSE</option>
              <option value="IT">IT</option>
              <option value="ECE">ECE</option>
              <option value="ME">ME</option>
              <option value="CE">CE</option>
            </select>

            {/* Section */}
            <InputField
              icon={<GraduationCap size={16} />}
              placeholder="Section"
              name="section"
              value={formData.section}
              onChange={handleChange}
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                gridColumn: "span 2",
                height: "64px",
                borderRadius: "20px",
                border: "none",
                background:
                  loading ? "#9ca3af" :
                  "linear-gradient(90deg,#06b6d4,#3b82f6)",
                color: "white",
                fontSize: "20px",
                fontWeight: "600",
                cursor: loading ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                marginTop: "8px",
                boxShadow: "0 0 30px rgba(59,130,246,0.25)",
              }}
            >
              {loading ? "Creating Account..." : "Create Account"}
              {loading ? <div style={{width: "20px", height: "20px", border: "2px solid #ffffff", borderTop: "2px solid transparent", borderRadius: "50%", animation: "spin 1s linear infinite"}}></div> : <ArrowRight size={20} />}
            </button>

            {/* Login Link */}
            <p
              style={{
                gridColumn: "span 2",
                textAlign: "center",
                marginTop: "4px",
                color: "rgba(255,255,255,0.65)",
                fontSize: "15px",
              }}
            >
              Already registered?{" "}

              <Link
                to="/login"
                style={{
                  color: "#38bdf8",
                  textDecoration: "none",
                  fontWeight: "600",
                }}
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

/* INPUT FIELD */
function InputField({
  icon,
  placeholder,
  name,
  value,
  onChange,
  type = "text",
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        height: "62px",
        borderRadius: "18px",
        border: "1px solid rgba(255,255,255,0.08)",
        background: "rgba(255,255,255,0.03)",
        padding: "0 18px",
        backdropFilter: "blur(10px)",
      }}
    >
      <div style={{ color: "#38bdf8" }}>
        {icon}
      </div>

      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        required
        style={{
          flex: 1,
          background: "transparent",
          border: "none",
          outline: "none",
          color: "white",
          fontSize: "16px",
        }}
      />
    </div>
  );
}

/* SELECT STYLE */
const selectStyle = {
  width: "100%",
  height: "62px",
  borderRadius: "18px",
  border: "1px solid rgba(255,255,255,0.08)",
  background: "rgba(255,255,255,0.03)",
  padding: "0 18px",
  color: "white",
  fontSize: "16px",
  outline: "none",
  backdropFilter: "blur(10px)",
};