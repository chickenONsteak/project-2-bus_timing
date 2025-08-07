import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

const BusStopName = (props) => {
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

  // // if props.busStopDetailIdx = 2, it means that we're returning the name of the bus stop
  // // if props.busStopDetailIdx = 3, it means that we're returning the address of the bus stop
  // const busStopDetail = query.data[props.busStopNo][props.busStopDetailIdx]; // done on the return statement because we need the query to be done first, else will throw undefined
  // // using .at will be better since non-valid inputs will return as undefined, which you can then specify what to return to the user — but you need to convert it to array, which will require quite a bit of effort, hence deprioritised for this
  // // const busStopDetail = query.data.at(props.busStopNo)[props.busStopDetailIdx];
  return (
    <>
      {query.isSuccess && (
        <div className={props.className}>
          {query.data[props.busStopNo][props.busStopDetailIdx]}
        </div>
      )}
    </>
  );
};

export default BusStopName;
