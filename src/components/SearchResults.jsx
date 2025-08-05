import { useQueryClient, useQuery } from "@tanstack/react-query";
import React from "react";
import BusStopName from "./BusStopName";
import Button from "./Button";
import TimeTillArrival from "./TimeTillArrival";
import { useParams } from "react-router-dom";
import LandingPage from "./LandingPage";

const SearchResults = () => {
  const queryClient = useQueryClient();
  const busStopNumber = useParams().busStopNumber;

  // GET BUS ARRIVAL TIMINGS WITH BUS STOP INPUT
  const getBusData = async () => {
    const resGetData = await fetch(
      `${import.meta.env.VITE_SERVER}/?id=${busStopNumber}`
    );
    if (!resGetData.ok) {
      throw new Error("error getting bus services data");
    }
    return await resGetData.json();
  };

  const querySearch = useQuery({
    queryKey: ["getBuses"],
    queryFn: getBusData,
  });

  // // ADD BUS STOP TO FAVOURITES
  // const addBusData = async () => {
  //   const resAddFavourite =
  // }

  return (
    <div className="container">
      {/* <h1 className="row header">BusLeh?</h1> */}
      <LandingPage />
      <div className="row">
        <BusStopName
          className="search-result"
          //   busStopNo={props.busStopToSearch}
          busStopNo={busStopNumber}
          busStopDetailIdx={2}
        />
        {", "}
        <BusStopName
          className="search-result"
          //   busStopNo={props.busStopToSearch}
          busStopNo={busStopNumber}
          busStopDetailIdx={3}
        />
        <Button className="col-md-2">Add to favourites</Button>
      </div>
      {/* <div>{JSON.stringify(querySearch.data.services)}</div> */}
      {/* // BUS ARRIVAL TIMINGS THAT MATCH THE SEARCHED BUS STOP */}
      {querySearch.isSuccess &&
        querySearch.data.services.map((bus, idx) => (
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
    </div>
  );
};

export default SearchResults;
