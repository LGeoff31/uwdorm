import Navbar from "./components/Navbar";
import FooterOther from "./components/footerOther";
import React, { useState, useRef } from "react";
import { LuSendHorizontal } from "react-icons/lu";

export default function Contact() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const form = useRef();

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const showToast = (message) => {
    const toast = document.createElement("div");
    toast.innerHTML = `
      <div id="toast-success" class="fixed top-4 right-4 z-50 flex items-center w-max p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
        <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
          </svg>
          <span class="sr-only">Check icon</span>
        </div>
        <div class="ml-3 text-sm font-normal">${message}</div>
      </div>
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!firstName || !lastName || !email || !message) {
    //   alert("Please fill in all input fields!");
    //   return;
    // }
    // if (!email.includes("@")) {
    //   alert("Please enter a valid email address");
    //   return;
    // }
    const data = {
      insertFirstName: firstName,
      insertLastName: lastName,
      insertEmail: email,
      insertMessage: message,
    };
    const response = await fetch("/api/insert-contact-info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const jsonResponse = await response.json();
    setLastName("");
    setFirstName("");
    setEmail("");
    setMessage("");
    showToast(
      "Thank you for submitting your message! We will contact you back shortly!"
    );
  };

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
          Get in Touch
        </h1>
      </div>

      {/* Body */}
      <div style={{ background: "linear-gradient(180deg, #f8faff 0%, #eef2ff 100%)", minHeight: "60vh" }}>
        <div className="max-w-2xl mx-auto px-6 py-16">
          <div
            className="rounded-2xl p-8"
            style={{
              background: "rgba(255,255,255,0.97)",
              border: "1px solid rgba(102,126,234,0.08)",
              boxShadow: "0 4px 24px rgba(102,126,234,0.06)",
            }}
          >
            <h2 className="text-2xl font-bold mb-6" style={{ color: "#4f46e5" }}>
              Contact Us
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label htmlFor="firstname" className="flex flex-col text-sm font-medium text-gray-600">
                  First Name
                  <input
                    required
                    value={firstName}
                    className="mt-1 rounded-xl px-4 py-3 text-base transition-all duration-200 outline-none"
                    style={{
                      border: "1.5px solid rgba(102,126,234,0.15)",
                      background: "#fafbff",
                    }}
                    id="firstname"
                    placeholder="Jane"
                    onChange={handleFirstNameChange}
                    onFocus={(e) => (e.target.style.borderColor = "#667eea")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(102,126,234,0.15)")}
                  />
                </label>
                <label htmlFor="lastname" className="flex flex-col text-sm font-medium text-gray-600">
                  Last Name
                  <input
                    required
                    value={lastName}
                    id="lastname"
                    className="mt-1 rounded-xl px-4 py-3 text-base transition-all duration-200 outline-none"
                    style={{
                      border: "1.5px solid rgba(102,126,234,0.15)",
                      background: "#fafbff",
                    }}
                    placeholder="Doe"
                    onChange={handleLastNameChange}
                    onFocus={(e) => (e.target.style.borderColor = "#667eea")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(102,126,234,0.15)")}
                  />
                </label>
              </div>
              <label htmlFor="email" className="flex flex-col text-sm font-medium text-gray-600">
                Email
                <input
                  required
                  value={email}
                  className="mt-1 rounded-xl px-4 py-3 text-base transition-all duration-200 outline-none"
                  style={{
                    border: "1.5px solid rgba(102,126,234,0.15)",
                    background: "#fafbff",
                  }}
                  id="email"
                  placeholder="you@uwaterloo.ca"
                  onChange={handleEmailChange}
                  onFocus={(e) => (e.target.style.borderColor = "#667eea")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(102,126,234,0.15)")}
                />
              </label>
              <label htmlFor="message" className="flex flex-col text-sm font-medium text-gray-600">
                Message
                <textarea
                  required
                  value={message}
                  id="message"
                  rows={5}
                  className="mt-1 rounded-xl px-4 py-3 text-base transition-all duration-200 outline-none resize-y"
                  style={{
                    border: "1.5px solid rgba(102,126,234,0.15)",
                    background: "#fafbff",
                  }}
                  placeholder="How can we help?"
                  onChange={handleMessageChange}
                  onFocus={(e) => (e.target.style.borderColor = "#667eea")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(102,126,234,0.15)")}
                />
              </label>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 text-white font-semibold rounded-xl px-6 py-3 transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  boxShadow: "0 4px 15px rgba(102,126,234,0.3)",
                  alignSelf: "flex-start",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 6px 20px rgba(102,126,234,0.45)")}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "0 4px 15px rgba(102,126,234,0.3)")}
              >
                Send Message <LuSendHorizontal size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>

      <FooterOther />
    </>
  );
}
