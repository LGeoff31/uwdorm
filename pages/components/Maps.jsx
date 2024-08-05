// import React, { useState, useEffect } from "react";
// import {
//   TextField,
//   Stack,
//   Typography,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   IconButton,
//   Rating,
//   MenuItem,
//   Alert,
//   Grid,
//   Paper,
// } from "@mui/material";
// import GoogleMapReact from "google-map-react";
// // import LocationOnOutlinedIcon from "@mui/material/icons/LocationOnOutlined";
// import useStyles from "./styles";
// import geoffrey from "../../public/geoff.png";
// const Marker = ({ text }) => (
//   <div
//     style={{
//       color: "white",
//       background: "red",
//       padding: "5px 10px",
//       display: "inline-flex",
//       textAlign: "center",
//       alignItems: "center",
//       justifyContent: "center",
//       borderRadius: "50%",
//       transform: "translate(-50%, -50%)",
//     }}
//   >
//     <Typography variant="body2">{text}</Typography>
//   </div>
// );

// const Maps = () => {
//   // const [coordinates, setCoordinates] = useState({});
//   // useEffect(() => {
//   //   navigator.geolocation.getCurrentPosition(
//   //     ({ coords: { latitude, longitude } }) => {
//   //       setCoordinates({ lat: latitude, lng: longitude });
//   //     }
//   //   );
//   // }, []);
//   const classes = useStyles();

//   const coordinates = { lat: 43.47871, lng: -80.562103 };

//   return (
//     <div className={classes.mapContainer}>
//       <GoogleMapReact
//         bootstrapURLKeys={{ key: "AIzaSyACTuBQL3SNY1bKRuaAfchknur7EVGEjtg" }}
//         defaultCenter={coordinates}
//         center={coordinates}
//         defaultZoom={16}
//         margin={[50, 50, 50, 50]}
//         options={""}
//         onChange={""}
//         onChildClick={""}
//       >
//         {/* <div lat={43.47063} lng={-80.54138}>
//           <Paper elevation={3}>
//             <Typography
//               // className={classes.Typography}
//               variant="subtitle2"
//               gutterBottom
//             >
//               Geof
//             </Typography>
//             <img
//               // className={classes.pointer}
//               src={geoffrey}
//             />
//           </Paper>
//         </div> */}
//         <Marker lat={43.47063} lng={-80.54138} text="Your Location" />
//       </GoogleMapReact>
//     </div>
//   );
// };

// export default Maps;
