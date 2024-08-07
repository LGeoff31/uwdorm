import Link from "next/link";
import Logo from "../../public/logo.png";
import Image from "next/image";
import { CiMail } from "react-icons/ci";

import { IoLogoInstagram } from "react-icons/io";

function footer() {
  return (
    <>
      <div className="flex flex-row justify-center p-2 text-xl mt-5 text-zinc-300">
        <Link href="/">
          <Image
            src={Logo}
            alt="UW Rez Logo"
            width={30}
            height={30}
            className="duration-300 ease-in-out hover:scale-125"
          />
        </Link>
        <Link href="/">
          <h1 className="mr-2 ml-1 hover:text-blue-300">UW Rez</h1>
        </Link>
        <Link
          href="https://www.instagram.com/uw.rez/"
          target="_blank"
          className="mr-1 duration-300 ease-in-out hover:scale-125 "
        >
          <IoLogoInstagram size={28} />
        </Link>
        <Link
          href="https://www.instagram.com/"
          target="_blank"
          className="duration-300 ease-in-out hover:scale-125"
        >
          <CiMail size={28} />
        </Link>
      </div>
      <div className="text-zinc-300 flex flex-row justify-center mb-5 text-med ">
        <Link href="/" className="hover:text-blue-400">
          {" "}
          Home
        </Link>
        <Link href="/Privacy" className="hover:text-blue-400">
          &nbsp;&nbsp;Privacy
        </Link>
        <Link href="/About" className="hover:text-blue-400">
          &nbsp;&nbsp;About
        </Link>
        <Link href="/Contact" className="hover:text-blue-400">
          &nbsp;&nbsp;Contact
        </Link>
      </div>
    </>
  );
}

export default footer;
