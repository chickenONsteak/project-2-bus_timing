import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

const BusStopName = (props) => {
  //   const [busStopName, setBusStopName] = useState("");

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
  // if props.busStopDetailIdx = 2, it means that we're returning the name of the bus stop
  // if props.busStopDetailIdx = 3, it means that we're returning the address of the bus stop
  const busStopDetail = query.data[props.busStopNo][props.busStopDetailIdx];

  return <div className={props.className}>{busStopDetail}</div>;
};

export default BusStopName;
