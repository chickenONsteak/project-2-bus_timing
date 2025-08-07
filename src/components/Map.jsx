import React, { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

const Map = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    // Prevent initialising map multiple times
    if (mapRef.current !== null) return;

    // Define bounds
    const sw = window.L.latLng(1.144, 103.535);
    const ne = window.L.latLng(1.494, 104.502);
    const bounds = window.L.latLngBounds(sw, ne);

    // Initialise map on the div in return statement
    mapRef.current = window.L.map("mapdiv", {
      center: window.L.latLng(1.2868108, 103.8545349),
      zoom: 16,
    });

    mapRef.current.setMaxBounds(bounds);

    // Add tile layer — for zooming (maps are built on tile layers)
    window.L.tileLayer(
      "https://www.onemap.gov.sg/maps/tiles/Default/{z}/{x}/{y}.png",
      {
        detectRetina: true,
        maxZoom: 19,
        minZoom: 11,
        attribution:
          '<img src="https://www.onemap.gov.sg/web-assets/images/logo/om_logo.png" style="height:20px;width:20px;"/>&nbsp;<a href="https://www.onemap.gov.sg/" target="_blank" rel="noopener noreferrer">OneMap</a>&nbsp;&copy;&nbsp;contributors&nbsp;&#124;&nbsp;<a href="https://www.sla.gov.sg/" target="_blank" rel="noopener noreferrer">Singapore Land Authority</a>',
      }
    ).addTo(mapRef.current);

    // Cleanup function to remove map on component unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div
      id="mapdiv"
      style={{ height: "800px", width: "100%" }}
      className="leaflet-container"
    ></div>
  );
};

export default Map;
