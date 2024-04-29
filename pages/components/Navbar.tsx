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
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { GiNightSleep } from "react-icons/gi";
import {
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Navbar = () => {
  const [user, loading] = useAuthState(auth);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const route = useRouter();
  const googleProvider = new GoogleAuthProvider();
  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      route.push("/");
    } catch (error) {
      console.log("google sign in error", error);
    }
  };
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFetchTest = async () => {
    const response = await fetch("/api/test");
    const data = await response.json();
    console.log(data);
  };

  if (loading) return <h1>Loading...</h1>;

  return (
    <nav className="bg-white">
  <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
    <div className="flex items-center space-x-3">
      <Link href="/" className="flex items-center">
        <img
          className="h-30 w-20 max-w-xs transition duration-400 ease-in-out hover:shadow-lg dark:hover:shadow-black"
          src={"./logo.png"}
        />
      </Link>
    </div>
    <div className="text-med hidden md:block sm:block flex-grow"> 
      <ul className="font-medium flex flex-row justify-end space-x-8 p-5 underline-none"> 
        <li>
          <Link
            href="/contact"
            className="hover:text-blue-600 text-gray-400 "
          >
            Contact Us
          </Link>
        </li>
      </ul>
    </div>
    {!user ? (
      <Box fontSize={"2rem"} marginRight="2rem">
        <IconButton onClick={handleClick}>
          <AccountCircleIcon sx={{ fontSize: "3rem" }} />
          <ExpandMoreIcon style={{ color: "#052A42" }} />
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
          <MenuItem onClick={GoogleLogin} href="/">
            {" "}
            <FcGoogle /> &nbsp; Sign In
          </MenuItem>
        </Menu>
      </Box>
    ) : (
      <>
        <Box marginRight="2rem">
          <IconButton onClick={handleClick}>
            <img
              src={user.photoURL || undefined}
              alt="photo"
              style={{
                borderRadius: "50%",
                width: "50px",
                height: "50px",
              }}
            />
            <ExpandMoreIcon style={{ color: "#052A42" }} />
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
            <MenuItem onClick={() => auth.signOut()}>Sign Out</MenuItem>
          </Menu>
        </Box>
      </>
    )}
  </div>
</nav>


  );
};

export default Navbar;
