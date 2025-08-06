import React, { useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const Hero = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [isValidSearch, setIsValidSearch] = useState(true);

  // GET BUS STOP NAMES
  const getBusStopData = async () => {
    const res = await fetch(import.meta.env.VITE_BUS_STOP_NAMES);
    if (!res.ok) {
      throw new Error("error getting bus stop names");
    }
    return await res.json();
  };

  const query = useQuery({
    queryKey: ["getBusStopNames"],
    queryFn: getBusStopData,
  });

  const handleSearch = () => {
    // GET ALL THE VALID BUS STOPS THAT USERS CAN KEY IN
    const validBusStops = Object.keys(query.data);
    const isValid = validBusStops.some(
      (busStopNum) => searchInput.toString() === busStopNum.toString()
    );
    setIsValidSearch(isValid);
    if (isValid) {
      navigate(`/search-result/${searchInput}`);
    }
  };

  return (
    <div className="">
      <h1 className="row header" onClick={() => navigate("/")}>
        BusLeh?
      </h1>
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
          Search
        </Button>
        {/* <Button className="col-md-1 button-header">View all bus stops</Button> */}
      </div>
      {isValidSearch ? (
        <div>&nbsp;</div>
      ) : (
        <div className="col-md-12 errorMessage">
          Please enter a valid bus stop number
        </div>
      )}
    </div>
  );
};

export default Hero;
