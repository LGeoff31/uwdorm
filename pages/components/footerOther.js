import Link from "next/link";
import Logo from "../../public/logo.png";
import Image from "next/image";
import { motion } from "framer-motion";

function footerOther() {
  return (
    <footer
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "2rem 1rem 1.5rem",
        marginTop: "2rem",
      }}
    >
      <motion.div
        className="flex flex-col items-center gap-3"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={Logo}
            alt="UW Rez Logo"
            width={32}
            height={32}
            className="duration-300 ease-in-out hover:scale-110"
          />
          <span
            style={{
              color: "white",
              fontWeight: 700,
              fontSize: "1.2rem",
              letterSpacing: "0.02em",
            }}
          >
            UW Rez
          </span>
        </Link>

        <div
          className="flex flex-row gap-5"
          style={{ fontSize: "0.95rem" }}
        >
          <Link href="/" style={{ color: "rgba(255,255,255,0.85)" }} className="hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/privacy" style={{ color: "rgba(255,255,255,0.85)" }} className="hover:text-white transition-colors">
            Privacy
          </Link>
          <Link href="/about" style={{ color: "rgba(255,255,255,0.85)" }} className="hover:text-white transition-colors">
            About
          </Link>
        </div>

        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", marginTop: "0.5rem" }}>
          &copy; {new Date().getFullYear()} UW Rez. All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
}

export default footerOther;
