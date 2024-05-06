import Navbar from "./components/Navbar";
import { Stack } from "@mui/material";
import FooterOther from "./components/footerOther";
import React, { useState } from "react";
import { LuSendHorizonal } from "react-icons/lu";

export default function Contact() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

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
    const toast = document.createElement('div');
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

  const handleSubmit = async () => {
    if (!firstName || !lastName || !email || !message) {
      alert("Please fill in all input fields!");
      return;
    }
    if (!email.includes("@")) {
      alert("Please enter a valid email address");
      return;
    }
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
    showToast("Thank you for submitting your message! We will contact you back shortly!");
  };

  return (
    <>
      <Navbar setUser={setUser} />
      <div
        style={{
          background: `url('https://coolbackgrounds.io/images/backgrounds/index/compute-ea4c57a4.png') no-repeat center center fixed`,
          backgroundSize: "cover",
          height: "25vh",
          display: "flex",
        }}
      >
        <Stack margin="">
          <span className="text-4xl p-20 ml-20 text-blue-300">
            UW Rez Contact
          </span>
        </Stack>
      </div>
      <div className="bg-[rgba(225,246,255,1)]">
        <div className="p-20 mr-40 ml-20">
          <div className="text-3xl font-bold">Contact:</div>
          <br></br>
          <div className="flex flex-row mb-5 ">
            <label for="firstname" className="flex flex-col text-lg">
              First Name:
              <input
                required
                value={firstName}
                className="w-[15rem] border-2 border-zinc-300 rounded-lg p-2"
                id="firstname"
                placeholder="Enter First Name"
                onChange={handleFirstNameChange}
              ></input>
            </label>
            <label for="lastname" className="flex flex-col text-lg ml-5">
              Last Name:
              <input
                required
                value={lastName}
                id="lastname"
                className="w-[15rem] border-2 border-zinc-300 rounded-lg p-2"
                placeholder="Enter Last Name"
                onChange={handleLastNameChange}
              ></input>
            </label>
            <label for="email" className="flex flex-col text-lg ml-5">
              Email:
              <input
                required
                value={email}
                className="w-[28rem] border-2 border-zinc-300 rounded-lg p-2"
                id="email"
                placeholder="Enter Email"
                onChange={handleEmailChange}
              ></input>
            </label>
          </div>
          <div className="text-lg">
            Message:
            <label for="message" className="flex flex-col">
              <textarea
                required
                value={message}
                id="message"
                className="w-[60.5rem] h-[9rem] border-2 border-zinc-300 rounded-lg p-2"
                placeholder="Enter Message"
                onChange={handleMessageChange}
              ></textarea>
            </label>
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="flex flex-row mt-5 text-lg bg-blue-300 rounded-lg w-[8rem]
                             h-[2.3rem] justify-center items-center focus:ring-4 shadow-lg transform active:scale-75 transition-transform"
          >
            Submit <LuSendHorizonal size={16} className="ml-2" />
          </button>
        </div>
      </div>
      
      <FooterOther />
    </>
  );
}
