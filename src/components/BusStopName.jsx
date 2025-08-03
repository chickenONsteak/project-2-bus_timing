import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

const BusStopName = (props) => {
  const [busStopName, setBusStopName] = useState("");

  // GET BUS STOP NAMES
  const getBusStopData = async () => {
    const res = await fetch(import.meta.env.BUS_STOP_NAMES);
    if (!res.ok) {
      throw new Error("error getting bus stop names");
    }
    return await res.json();
  };

  const query = useQuery({
    queryKey: ["getBusStopNames"],
    queryFn: getBusStopData,
  });

  console.log(props.busStopNo);
  //   console.log(query.data[props.busStopNo][2]);

  return (
    <div>{query.data ? JSON.stringify(query.data["10009"]) : "Loading..."}</div>
  );
};

export default BusStopName;
