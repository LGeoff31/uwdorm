import Link from "next/link";
import Logo from "../../public/logo.png";
import Image from "next/image";
import { CiMail } from "react-icons/ci";
import { CiLinkedin } from "react-icons/ci";
import { IoLogoInstagram } from "react-icons/io";

function footerOther() {
  return (
    <>
      <div className="flex flex-row justify-center text-xl p-3 bg-[rgba(225,246,255,1)]">
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
          className="mr-1 duration-300 ease-in-out hover:scale-125"
        >
          <IoLogoInstagram size={28} color="tomato" />
        </Link>
        <Link
          href="mailto:james.yuu@hotmail.com"
          target="_blank"
          className="mr-1 duration-300 ease-in-out hover:scale-125"
        >
          <CiMail size={28} color="MediumSeaGreen" />
        </Link>
        <Link
          href="https://www.linkedin.com/company/uw-rez/"
          target="_blank"
          className="duration-300 ease-in-out hover:scale-125"
        >
          <CiLinkedin size={28} color="darkblue" />
        </Link>
      </div>
      <div className=" flex flex-row justify-center text-med bg-[rgba(225,246,255,1)] p-1">
        <Link href="/" className="hover:text-blue-400">
          {" "}
          Home
        </Link>
        <Link href="/privacy" className="hover:text-blue-400">
          &nbsp;&nbsp;Privacy
        </Link>
        <Link href="/about" className="hover:text-blue-400">
          &nbsp;&nbsp;About
        </Link>
        <Link href="/contact" className="hover:text-blue-400">
          &nbsp;&nbsp;Contact
        </Link>
        <br></br>
      </div>
    </>
  );
}

export default footerOther;
