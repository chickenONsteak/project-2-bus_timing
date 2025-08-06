import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
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
  const [savedName, setSavedName] = useState();

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

  // ADD BUS STOP TO FAVOURITES BY CREATING DATA ON AIRTABLE
  const addFavourites = async () => {
    const addRes = await fetch(import.meta.env.VITE_AIRTABLE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + import.meta.env.VITE_AIRTABLE_KEY,
      },
      body: JSON.stringify({
        records: [
          {
            fields: {
              "Bus stop number": Number(busStopNumber), // Airtable column wants int and not string
              "Saved name": savedName,
            },
          },
        ],
      }),
    });
    if (!addRes.ok) {
      return new Error("error adding to favourites");
    }
    return await addRes.json();
  };

  const {
    mutate: mutateAdd,
    isLoading: isLoadingAdd,
    isError: isErrorAdd,
    error: errorAdd,
  } = useMutation({
    mutationFn: addFavourites,
    onSuccess: () => {
      queryClient.invalidateQueries(["getFavourites"]);
    },
  });

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
          {/* <div
            className={`col-md-10 ${searchResultsStyles.searchResultHeader}`}
          >
            {busStopNumber}
          </div> */}
          <div className="row">
            <div
              className={`col-md-7 ${searchResultsStyles.searchResultHeader}`}
            >
              <BusStopName
                className={searchResultsStyles.searchResult}
                //   busStopNo={props.busStopToSearch}
                busStopNo={busStopNumber}
                busStopDetailIdx={2}
              />
              <span className={searchResultsStyles.searchResult}>
                {` (${busStopNumber})`}
              </span>
              <span>{" — at "}</span>
              <BusStopName
                className={searchResultsStyles.searchResult}
                //   busStopNo={props.busStopToSearch}
                busStopNo={busStopNumber}
                busStopDetailIdx={3}
              />
            </div>
            <input
              className={`col-md-2 ${searchResultsStyles.addFavourite}`}
              type="text"
              onChange={(event) => setSavedName(event.target.value)}
            />
            <Button
              className={`col-md-2 ${searchResultsStyles.addFavourite}`}
              propFunction={mutateAdd}
            >
              Add to favourites
            </Button>
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
