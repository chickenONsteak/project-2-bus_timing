import React from "react";
import Button from "./Button";

const Hero = (props) => {
  const handleSearch = () => {
    navigate(`/search-result/${searchInput}`);
  };
  return (
    <>
      <h1 className="row header">BusLeh?</h1>
      <div className="row header">
        <input
          className="col-md-3"
          type="search"
          id="search-bar"
          placeholder="Enter bus stop number here"
          onChange={(event) => props.setSearchInputFn(event.target.value)}
        />
        <Button className="col-md-1 button-header" propFunction={handleSearch}>
          {/* <Link to={`/search-result/${searchInput}`}>Search</Link> */}
          Search
        </Button>
        <Button className="col-md-1 button-header">View all bus stops</Button>
      </div>
    </>
  );
};

export default Hero;
