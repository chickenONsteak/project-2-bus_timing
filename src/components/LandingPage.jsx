import React, { useState } from "react";
import Button from "./Button";
import Favourites from "./Favourites";
import { useNavigate } from "react-router-dom";
import Hero from "./Hero";

const LandingPage = () => {
  // const navigate = useNavigate();
  // const [searchInput, setSearchInput] = useState("");

  // const handleSearch = () => {
  //   navigate(`/search-result/${searchInput}`);
  // };

  return (
    <div className="container">
      <div className="row">
        <Hero className="col-md-12" />
      </div>

      <br />
      <br />

      <div className="row">
        <div className="col-md-2">
          <Favourites />
        </div>
        <div className="col-md-10">map</div>
      </div>
    </div>
  );
};

export default LandingPage;
