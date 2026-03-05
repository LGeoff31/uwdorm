import {
  Box,
  Button,
  Stack,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Link,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import {
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { FaSignOutAlt } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";

const Navbar = ({ setUser }: { setUser: any }) => {
  const [user, loading] = useAuthState(auth);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const route = useRouter();
  const googleProvider = new GoogleAuthProvider();
  const GoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      route.push("/");
    } catch (error) {
      // sign-in dismissed or failed silently
    }
  };

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (loading) return null;
  setUser(user);
  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        transition: 'box-shadow 0.35s ease, backdrop-filter 0.35s ease, background 0.35s ease',
        boxShadow: isScrolled ? '0 4px 30px rgba(102,126,234,0.13)' : 'none',
        backdropFilter: isScrolled ? 'saturate(180%) blur(14px)' : 'none',
        background: isScrolled ? 'rgba(255,255,255,0.78)' : 'rgba(225,246,255,1)',
        borderBottom: isScrolled ? '1px solid rgba(102,126,234,0.08)' : '1px solid transparent',
      }}
    >
      <div className="max-w-screen-xl flex items-center justify-between mx-auto px-4 py-2">
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex items-center">
            <img
              className="ml-1 h-auto w-16 max-w-xs transition-all duration-300 ease-in-out hover:scale-105 hover:drop-shadow-md"
              src={"./topLogo.png"}
              alt="UW Rez logo"
            />
          </Link>
        </div>

        {!user ? (
          <Box marginRight="1rem">
            <Button
              onClick={handleClick}
              startIcon={<MdAccountCircle style={{ fontSize: '1.6rem' }} />}
              endIcon={<ExpandMoreIcon sx={{ fontSize: '1.1rem !important' }} />}
              sx={{
                textTransform: 'none',
                color: '#4f46e5',
                borderRadius: '999px',
                px: 2, py: 0.8,
                border: '1.5px solid rgba(102,126,234,0.25)',
                fontWeight: 600,
                fontSize: '0.9rem',
                transition: 'all 0.25s ease',
                '&:hover': {
                  background: 'rgba(102,126,234,0.06)',
                  borderColor: '#667eea',
                },
              }}
            >
              Sign In
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem onClick={GoogleLogin} href="/" sx={{ gap: 1, fontWeight: 500 }}>
                <FcGoogle style={{ fontSize: '1.3rem' }} /> Sign in with Google
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <>
            <Box marginRight="1rem">
              <IconButton onClick={handleClick} sx={{ p: 0.5 }}>
                <img
                  src={user.photoURL || undefined}
                  alt="Profile photo"
                  style={{
                    borderRadius: "50%",
                    width: "2.2rem",
                    height: "2.2rem",
                    border: '2px solid rgba(102,126,234,0.3)',
                    transition: 'border-color 0.25s ease',
                  }}
                />
                <ExpandMoreIcon sx={{ color: "#4f46e5", ml: 0.3 }} />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem onClick={() => auth.signOut()} sx={{ gap: 1, fontWeight: 500 }}>
                  <FaSignOutAlt style={{ color: '#667eea' }} />
                  Sign Out
                </MenuItem>
              </Menu>
            </Box>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
