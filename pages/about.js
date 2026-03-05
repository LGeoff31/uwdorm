import Navbar from "./components/Navbar";
import { Stack } from "@mui/material";
import FooterOther from "./components/footerOther";
import React, { useState } from "react";
import Image from "next/image";

export default function About() {
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
          About UW Rez
        </h1>
      </div>

      {/* Body */}
      <div style={{ background: "linear-gradient(180deg, #f8faff 0%, #eef2ff 100%)", minHeight: "60vh" }}>
        <div className="max-w-3xl mx-auto px-6 py-16">
          <div
            className="rounded-2xl p-8 mb-10"
            style={{
              background: "rgba(255,255,255,0.97)",
              border: "1px solid rgba(102,126,234,0.08)",
              boxShadow: "0 4px 24px rgba(102,126,234,0.06)",
            }}
          >
            <h2 className="text-2xl font-bold mb-4" style={{ color: "#4f46e5" }}>
              Welcome to UW Rez!
            </h2>
            <p className="text-gray-600 leading-relaxed">
              UW Rez is a platform for University of Waterloo incoming students
              and current students. You can find every on-campus residence
              through navigating our website! Our goal is to help students
              decide where to live based off the experiences of others and
              ratings for different campus housing.
            </p>
          </div>

          <h3 className="text-xl font-semibold mb-6" style={{ color: "#4f46e5" }}>
            Meet the Team
          </h3>

          <div className="flex flex-col gap-6">
            {/* Geoffrey */}
            <div
              className="flex flex-row items-center gap-5 p-5 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.97)",
                border: "1px solid rgba(102,126,234,0.08)",
                boxShadow: "0 2px 12px rgba(102,126,234,0.05)",
                transition: "all 0.3s ease",
              }}
            >
              <Image
                alt="Geoffrey Lee"
                className="rounded-full"
                src="/geo.png"
                width={100}
                height={100}
                style={{ border: "3px solid rgba(102,126,234,0.2)", objectFit: "cover" }}
              />
              <div>
                <h4 className="text-lg font-bold">Geoffrey Lee</h4>
                <p className="text-sm text-gray-500 italic">
                  Founder &mdash; Software Engineering
                </p>
              </div>
            </div>

            {/* James */}
            <div
              className="flex flex-row items-center gap-5 p-5 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.97)",
                border: "1px solid rgba(102,126,234,0.08)",
                boxShadow: "0 2px 12px rgba(102,126,234,0.05)",
                transition: "all 0.3s ease",
              }}
            >
              <Image
                alt="James Yu"
                className="rounded-full"
                src="/james.jpg"
                width={100}
                height={100}
                style={{ border: "3px solid rgba(102,126,234,0.2)", objectFit: "cover" }}
              />
              <div>
                <h4 className="text-lg font-bold">James Yu</h4>
                <p className="text-sm text-gray-500 italic">
                  Founder &mdash; Biomedical Engineering
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterOther />
    </>
  );
}
