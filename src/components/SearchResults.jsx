import { useQueryClient, useQuery } from "@tanstack/react-query";
import React from "react";
import BusStopName from "./BusStopName";
import Button from "./Button";
import TimeTillArrival from "./TimeTillArrival";
import { useParams } from "react-router-dom";
import Hero from "./Hero";
import Favourites from "./Favourites";
import searchResultsStyles from "./SearchResults.module.css";
import busArrivalStyles from "./TimeTillArrival.module.css";

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
    queryKey: ["getBuses", busStopNumber],
    queryFn: getBusData,
  });

  // // ADD BUS STOP TO FAVOURITES
  // const addBusData = async () => {
  //   const resAddFavourite =
  // }

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

        <div className="col-md-10">
          <div className="row">
            <div
              className={`col-md-8 ${searchResultsStyles.searchResultHeader}`}
            >
              <BusStopName
                className={searchResultsStyles.searchResult}
                //   busStopNo={props.busStopToSearch}
                busStopNo={busStopNumber}
                busStopDetailIdx={2}
              />
              <span>, at </span>
              <BusStopName
                className={searchResultsStyles.searchResult}
                //   busStopNo={props.busStopToSearch}
                busStopNo={busStopNumber}
                busStopDetailIdx={3}
              />
            </div>
            <Button className="col-md-2">Add to favourites</Button>
          </div>

          <br />

          {/* <div>{JSON.stringify(querySearch.data.services)}</div> */}
          {/* // BUS ARRIVAL TIMINGS THAT MATCH THE SEARCHED BUS STOP */}
          {querySearch.isSuccess &&
            querySearch.data.services.map((bus, idx) => (
              <div className="row" key={idx}>
                <div
                  className={`col-md-1 ${searchResultsStyles.busNumberLarge}`}
                >
                  {bus.no}
                </div>
                <div className={`col-md-5 ${searchResultsStyles.busRoute}`}>
                  <BusStopName
                    className={searchResultsStyles.busJourney}
                    busStopNo={bus.next.origin_code}
                    busStopDetailIdx={2}
                  />
                  <span>-</span>
                  <BusStopName
                    className={searchResultsStyles.busJourney}
                    busStopNo={bus.next.destination_code}
                    busStopDetailIdx={2}
                  />
                </div>

                <div className="col-md-5">
                  <TimeTillArrival
                    incomingBus1={bus.next}
                    incomingBus2={bus.next2}
                    incomingBus3={bus.next3}
                    busAvailableLarge={busArrivalStyles.busAvailableLarge}
                    busNotAvailableLarge={busArrivalStyles.busNotAvailableLarge}
                  />
                </div>

                <br />
                <br />
                <br />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
