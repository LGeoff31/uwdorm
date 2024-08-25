import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

// Add your Mapbox access token
mapboxgl.accessToken =
  "pk.eyJ1IjoiZWxlY3RyaWNvY2h5IiwiYSI6ImNseG8xdzg5bDBhZW0yanB4Y2RlNnA1MmkifQ.el_Y0mXT3qJvURGNdy9e0g";

const Maps = () => {
  const mapContainerRef = useRef(null);

  // Coordinates for the first-year residences
  const residences = [
    { name: "Village 1 (V1)", coords: [43.4723, -80.5464] },
    { name: "Ron Eydt Village (REV)", coords: [43.4745, -80.546] },
    { name: "Claudette Millar Hall (CMH)", coords: [43.4742, -80.5452] },
    { name: "University of Waterloo Place (UWP)", coords: [43.4734, -80.5409] },
    { name: "Mackenzie King Village (MKV)", coords: [43.4717, -80.5465] },
    { name: "United College", coords: [43.4728, -80.543] },
  ];

  useEffect(() => {
    // Initialize the map
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/electricochy/clxo2yhca02rl01qk664fb82k", // style URL
      center: [-87.661557, 41.893748], // center around the residences
      zoom: 10.7, // zoom to show all residences clearly
    });
    map.on("click", (event) => {
      // If the user clicked on one of your markers, get its information.
      const features = map.queryRenderedFeatures(event.point, {
        layers: ["chicago-parks"], // replace with your layer name
      });
      if (!features.length) {
        return;
      }
      const feature = features[0];

      const popup = new mapboxgl.Popup({ offset: [0, -15] })
        .setLngLat(feature.geometry.coordinates)
        .setHTML(
          `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
        )
        .addTo(map);
    });
  }, []);

  return (
    <div
      ref={mapContainerRef}
      style={{ width: "50%", height: "400px", margin: "0 auto" }}
    />
  );
};

export default Maps;
