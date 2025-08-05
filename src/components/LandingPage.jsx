import React, { useState } from "react";
import Button from "./Button";
import Favourites from "./Favourites";
import { useNavigate } from "react-router-dom";
import Hero from "./Hero";

const LandingPage = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = () => {
    navigate(`/search-result/${searchInput}`);
  };

  return (
    <div className="container">
      {/* <h1 className="row header">BusLeh?</h1>
      <div className="row header">
        <input
          className="col-md-3"
          type="search"
          id="search-bar"
          placeholder="Enter bus stop number here"
          onChange={(event) => setSearchInput(event.target.value)}
        />
        <Button className="col-md-1 button-header" propFunction={handleSearch}>
          {/* <Link to={`/search-result/${searchInput}`}>Search</Link> */}
      {/* Search */}
      {/* </Button> */}
      {/* // <Button className="col-md-1 button-header">View all bus stops</Button> */}
      {/* // </div> */}
      <Hero setSearchInputFn={setSearchInput} />

      <br />
      <br />

      <div className="row">
        <div className="col-md-2">
          <Favourites />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
