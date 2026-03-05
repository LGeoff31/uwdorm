import Navbar from "./components/Navbar";
import FooterOther from "./components/footerOther";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { MdOutlineRateReview } from "react-icons/md";
import { CiDatabase } from "react-icons/ci";
import { FaExchangeAlt } from "react-icons/fa";
import React, { useState } from "react";

const sections = [
  {
    icon: IoIosInformationCircleOutline,
    title: "Information We Collect",
    body: "When you voluntarily login with us, we collect your email address. However, this is not required to access the site.",
  },
  {
    icon: MdOutlineRateReview,
    title: "User-Generated Content",
    body: "When you add a review, we will list your name (optional), message, and reviews.",
  },
  {
    icon: CiDatabase,
    title: "Automatically Collected Data",
    body: "We may automatically collect certain information when you visit our website, including your browser type, operating system, and browsing behavior.",
  },
  {
    icon: FaExchangeAlt,
    title: "Changes to this Policy",
    body: "We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements.",
  },
];

export default function Privacy() {
  const [user, setUser] = useState(null);
  return (
    <>
      <Navbar setUser={setUser} />
      {/* Hero */}
      <div
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          minHeight: "28vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              'url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')',
          }}
        />
        <h1
          className="text-4xl md:text-5xl font-extrabold text-white text-center"
          style={{ textShadow: "0 2px 20px rgba(0,0,0,0.15)", position: "relative", zIndex: 1 }}
        >
          Privacy Policy
        </h1>
      </div>

      {/* Body */}
      <div style={{ background: "linear-gradient(180deg, #f8faff 0%, #eef2ff 100%)", minHeight: "60vh" }}>
        <div className="max-w-3xl mx-auto px-6 py-16">
          <p className="text-gray-600 text-lg leading-relaxed mb-10">
            Thank you for using UW Rez! This Privacy Policy explains how we
            collect, use, and disclose your information while you are on our site.
          </p>

          <div className="flex flex-col gap-5">
            {sections.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.title}
                  className="rounded-2xl p-6 flex items-start gap-5 transition-all duration-300"
                  style={{
                    background: "rgba(255,255,255,0.97)",
                    border: "1px solid rgba(102,126,234,0.08)",
                    boxShadow: "0 4px 24px rgba(102,126,234,0.06)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.boxShadow =
                      "0 8px 32px rgba(102,126,234,0.12)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.boxShadow =
                      "0 4px 24px rgba(102,126,234,0.06)")
                  }
                >
                  <div
                    className="flex-shrink-0 rounded-xl flex items-center justify-center"
                    style={{
                      width: 48,
                      height: 48,
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    }}
                  >
                    <Icon style={{ fontSize: "1.4rem", color: "#fff" }} />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold mb-1" style={{ color: "#1e293b" }}>
                      {s.title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed">{s.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <FooterOther />
    </>
  );
}
