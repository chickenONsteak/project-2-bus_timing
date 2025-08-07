import React, { useRef, useState } from "react";
import Favourites from "./Favourites";
import Hero from "./Hero";
import Map from "./Map";

const LandingPage = () => {
  const [addressLatLong, setAddressLatLong] = useState({});

  return (
    <div className="container">
      <div className="row">
        <Hero setLatLong={setAddressLatLong} checkLatLong={addressLatLong} />
      </div>

      <br />

      <div className="row">
        <div className="col-md-2">
          <Favourites addressLatLong={addressLatLong} />
        </div>
        <div className="col-md-10">
          <Map addressLatLong={addressLatLong} />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
