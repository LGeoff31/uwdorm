import Link from "next/link"
import Logo from '../../public/logo.png'
import Image from "next/image"
import { CiMail } from "react-icons/ci";

import { IoLogoInstagram } from "react-icons/io";

function footer(){
    return(
        <>
            <div className="flex flex-row justify-center p-4 text-lg mt-5">
                {/*add logo*/}
                <Link href="/">
                    <Image src={Logo} alt="UW Rez Logo" width={30} height={30} />
                </Link>
                <Link href="/">
                    <h1 className="mr-2 ml-1">UW Rez</h1>
                </Link>
                <Link href="https://www.instagram.com/" target="_blank" className="mr-1">
                    <IoLogoInstagram size={28}/>
                </Link>
                <Link href="https://www.instagram.com/" target="_blank">
                    <CiMail size={28}/>
                </Link>
                
                
            </div>
            <div className="flex flex-row justify-center mb-5 text-sm ">
                <Link href="/" className="hover:text-blue-400"> Home</Link>
                <Link href="/privacy" className="hover:text-blue-400" >&nbsp;&nbsp;Privacy</Link>
                <Link href="/about" className="hover:text-blue-400">&nbsp;&nbsp;About</Link>
                <Link href="/contact" className="hover:text-blue-400">&nbsp;&nbsp;Contact</Link>
            </div>
        </>
    )
}

export default footer