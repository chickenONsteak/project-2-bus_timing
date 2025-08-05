import { useQueryClient, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Button from "./Button";
import BusStopName from "./BusStopName";
import TimeTillArrival from "./TimeTillArrival";
import Favourites from "./Favourites";

const LandingPage = () => {
  const queryClient = useQueryClient();
  const [searchInput, setSearchInput] = useState("");
  const [busStopToSearch, setBusStopToSearch] = useState("");

  // get bus arrival timings by bus stop input
  const getBusData = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_SERVER}/?id=${busStopToSearch}`,
      {
        headers: {
          "Content-Type": "application/json",
          AccountKey: import.meta.env.LTA_KEY,
        },
      }
    );

    if (!res.ok) {
      throw new Error("error getting bus services data");
    }

    return await res.json();
  };

  const querySearch = useQuery({
    queryKey: ["getBuses"],
    queryFn: () => getBusData(busStopToSearch),
    enabled: !!busStopToSearch,
  });

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

  return (
    <div className="container">
      <h1>BusLeh?</h1>
      <div className="row">
        <input
          className="col-md-5"
          type="search"
          id="search-bar"
          placeholder="Enter bus stop number here"
          onChange={(event) => setSearchInput(event.target.value)}
        />
        <Button
          className="col-md-1"
          propFunction={() => setBusStopToSearch(searchInput)}
        >
          Search
        </Button>
        <Button className="col-md-2">View all bus stops</Button>
      </div>

      <div className="col-md-2">
        <Favourites />
      </div>

      {/* // BUS STOP SEARCH RESULTS */}
      {querySearch.isSuccess && (
        <>
          <Button>Add to favourites</Button>
          <div className="row">
            <BusStopName
              className="col-md-2"
              busStopNo={busStopToSearch}
              busStopDetailIdx={2}
            />
            {", "}
            <BusStopName
              className="col-md-2"
              busStopNo={busStopToSearch}
              busStopDetailIdx={3}
            />
          </div>
          {/* <div>{JSON.stringify(querySearch.data.services)}</div> */}

          {/* // BUS ARRIVAL TIMINGS THAT MATCH THE SEARCHED BUS STOP */}
          {querySearch.data.services.map((bus, idx) => (
            <div className="row" key={idx}>
              <div>{bus.no}</div>
              <BusStopName
                className="col-md-2"
                busStopNo={bus.next.origin_code}
                busStopDetailIdx={2}
              />
              {" - "}
              <BusStopName
                className="col-md-2"
                busStopNo={bus.next.destination_code}
                busStopDetailIdx={2}
              />
              {/* GET THE DIFFERENCE IN TIME NOW VS INCOMING BUS TIME */}
              <TimeTillArrival
                incomingBus1={bus.next}
                incomingBus2={bus.next2}
                incomingBus3={bus.next3}
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default LandingPage;
