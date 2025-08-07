import React, { useState } from "react";
import Button from "./Button";
import Favourites from "./Favourites";
import { useNavigate } from "react-router-dom";
import Hero from "./Hero";
import Map from "./Map";

const LandingPage = () => {
  const [addressLatLong, setAddressLatLong] = useState({});

  return (
    <div className="container">
      {/* <div>{JSON.stringify(addressLatLong)}</div> */}
      <div className="row">
        <Hero
          className="col-md-12"
          setLatLong={setAddressLatLong}
          checkLatLong={addressLatLong}
        />
      </div>

      <br />

      <div className="row">
        <div className="col-md-2">
          <Favourites addressLatLong={addressLatLong} />
        </div>
        <div className="col-md-10">
          <Map />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
