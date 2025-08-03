import { useQueryClient, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Button from "./Button";
import BusStopName from "./BusStopName";

const LandingPage = () => {
  const queryClient = useQueryClient();
  const [searchInput, setSearchInput] = useState("");
  const [busStopToSearch, setBusStopToSearch] = useState("");

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
        <Button className="col-md-2">View all buses</Button>
      </div>

      {querySearch.isSuccess && (
        <div>
          <h2>Bus stop name</h2>
          <BusStopName busStopNo={busStopToSearch} />
          {querySearch.data.services.map((bus, idx) => (
            <div className="row" key={idx}>
              <div>{bus.no}</div>
              <div></div>
              {JSON.stringify(bus)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LandingPage;
