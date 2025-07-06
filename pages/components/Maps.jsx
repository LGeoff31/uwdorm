import "mapbox-gl/dist/mapbox-gl.css";
import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { Box, Typography, Paper } from "@mui/material";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZWxlY3RyaWNvY2h5IiwiYSI6ImNseG8xdzg5bDBhZW0yanB4Y2RlNnA1MmkifQ.el_Y0mXT3qJvURGNdy9e0g";

const Maps = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  const residences = [
    { name: "Village 1 (V1)", coords: [-80.5498, 43.4725] },
    { name: "Ron Eydt Village (REV)", coords: [-80.5545, 43.4707] },
    { name: "Claudette Millar Hall (CMH)", coords: [-80.53569, 43.4704] },
    { name: "University of Waterloo Place (UWP)", coords: [-80.5349, 43.4704] },
    { name: "Mackenzie King Village (MKV)", coords: [-80.5525, 43.4717] },
    { name: "United College", coords: [-80.546, 43.468] },
  ];

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/electricochy/clxo2yhca02rl01qk664fb82k",
      center: [-80.544, 43.473],
      zoom: 15.2,
    });
    mapRef.current = map;

    residences.forEach((res) => {
      const el = document.createElement("div");
      el.className = "custom-marker";
      el.style.background = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
      el.style.width = "32px";
      el.style.height = "32px";
      el.style.borderRadius = "50%";
      el.style.display = "flex";
      el.style.alignItems = "center";
      el.style.justifyContent = "center";
      el.style.boxShadow = "0 4px 16px rgba(102,126,234,0.15)";
      el.style.cursor = "pointer";
      el.innerHTML = `<span style='color:white;font-size:1.3rem;font-weight:bold;'>🏠</span>`;
      new mapboxgl.Marker(el)
        .setLngLat(res.coords)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<div style="padding: 12px 18px; background: rgba(255,255,255,0.97); border-radius: 12px; box-shadow: 0 2px 12px rgba(102,126,234,0.10); min-width: 160px; text-align: center;">
              <div style="font-size: 1.1rem; font-weight: 700; color: #4f46e5; margin-bottom: 2px;">${res.name}</div>
            </div>`
          )
        )
        .addTo(map);
    });

    const handleResize = () => {
      map.resize();
    };
    window.addEventListener("resize", handleResize);
    setTimeout(() => map.resize(), 300);

    map.on("moveend", handleResize);
    map.on("zoomend", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      map.off("moveend", handleResize);
      map.off("zoomend", handleResize);
      map.remove();
    };
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 8,
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: { xs: "100%", md: "70%" },
          maxWidth: 900,
          mx: "auto",
          p: { xs: 2, md: 4 },
          borderRadius: 5,
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 8px 32px rgba(102, 126, 234, 0.15)",
          mb: 6,
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: 700,
            mb: 1,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Residences Map
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          sx={{ color: "text.secondary", mb: 3 }}
        >
          See where each residence is located on campus
        </Typography>
        <Box
          ref={mapContainerRef}
          sx={{
            width: "100%",
            height: { xs: 300, md: 450 },
            borderRadius: 4,
            overflow: "hidden",
            boxShadow: "0 4px 24px rgba(102,126,234,0.10)",
            border: "2px solid #e0e7ff",
            mx: "auto",
          }}
        />
      </Paper>
      <style>{`
        .custom-marker {
          transition: box-shadow 0.2s;
        }
        .custom-marker:hover {
          box-shadow: 0 8px 32px rgba(102,126,234,0.25);
        }
      `}</style>
    </Box>
  );
};

export default Maps;
