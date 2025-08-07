import React, { useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const Hero = (props) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [isValidSearch, setIsValidSearch] = useState(true);
  const [searchAddress, setSearchAddress] = useState("");
  //   const [busStopsNearby, setBusStopsNearby] = useState([]);

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

  // GET ADDRESS RESULTS
  const getAddressSearch = async () => {
    const addressSearchRes = await fetch(
      `/api/api/common/elastic/search?searchVal=${searchAddress}&returnGeom=Y&getAddrDetails=Y&pageNum=1`
    );
    if (!addressSearchRes.ok) {
      throw new Error("error getting search results");
    }
    return await addressSearchRes.json();
  };

  // FROM CHATGPT — DELETE AFTER REFACTORING
  //   fetch(
  //     `/api/api/common/elastic/search?searchVal=${searchAddress}&returnGeom=Y&getAddrDetails=Y&pageNum=1`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //     });

  const searchAddressQuery = useQuery({
    queryKey: ["getAddress", searchAddress],
    queryFn: getAddressSearch,
    enabled: !!searchAddress, // so that it doesn't fetch when input is empty
  });

  const handleAddressSearch = () => {
    const matchedAddress = searchAddressQuery.data.results[0]; // note: there will only be one match since users are forced to select from the options
    props.setLatLong({
      lat: matchedAddress.LATITUDE,
      long: matchedAddress.LONGITUDE,
    });
    console.log(matchedAddress.LATITUDE);
    console.log(matchedAddress.LONGITUDE);
  };

  return (
    <div>
      <h1 className="row header" onClick={() => navigate("/")}>
        BusLeh?
      </h1>

      {/* For bus stop input */}
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

      {/* For address input */}
      <div className="row header">
        <input
          type="text"
          list="addresses"
          className="col-md-3"
          placeholder="Enter address or postal code"
          onChange={(event) => {
            setSearchAddress(event.target.value);
          }}
        />
        <datalist id="addresses">
          {searchAddressQuery.isSuccess &&
            searchAddressQuery.data.results.map((option, idx) => {
              return <option value={option.ADDRESS} key={idx}></option>;
            })}
        </datalist>
        {/* RESULTS — DELETE AFTERWARDS */}
        {searchAddressQuery.isSuccess && (
          <div>{JSON.stringify(searchAddressQuery.data)}</div>
        )}
        <div>{JSON.stringify(searchAddress)}</div>

        <Button
          className="col-md-1 button-header"
          propFunction={handleAddressSearch}
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default Hero;
