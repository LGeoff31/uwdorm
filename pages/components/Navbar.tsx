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
import { FaSignOutAlt } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";

const Navbar = ({ setUser }: { setUser: any }) => {
  const [user, loading] = useAuthState(auth);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const route = useRouter();
  const googleProvider = new GoogleAuthProvider();
  const GoogleLogin = async () => {
    console.log("user1", user);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      route.push("/");
    } catch (error) {
      console.log("google sign in error", error);
    }
    console.log("user2", user);
  };

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (loading) return <h1>Loading...</h1>;
  console.log(user);
  setUser(user);
  return (
    <nav className="bg-white">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-1">
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex items-center">
            <img
              className="ml-3 h-30 w-20 max-w-xs transition duration-400 ease-in-out hover:shadow-lg dark:hover:shadow-black"
              src={"./topLogo.png"}
            />
          </Link>
        </div>

        {!user ? (
          <Box fontSize={"2rem"} marginRight="2rem">
            <IconButton onClick={handleClick}>
              <MdAccountCircle className="h-[3rem] w-[3rem]" />
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
                    width: "2.5rem",
                    height: "2.5rem",
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
                <MenuItem onClick={() => auth.signOut()}>
                  <FaSignOutAlt />
                  &nbsp;Sign Out
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
