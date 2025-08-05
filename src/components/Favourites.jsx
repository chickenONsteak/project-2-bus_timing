import React from "react";
import Button from "./Button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import BusStopName from "./BusStopName";

const Favourites = (props) => {
  const queryFavourites = useQueryClient();

  const getFavourites = async () => {
    const res = await fetch(import.meta.env.VITE_AIRTABLE, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + import.meta.env.VITE_AIRTABLE_KEY,
      },
    });
    if (!res.ok) {
      return new Error("error getting favourites");
    }
    return await res.json();
  };

  const query = useQuery({
    queryKey: ["getFavourites"],
    queryFn: getFavourites,
  });

  return (
    <div className="container">
      <div>Saved favourites</div>
      <div className="row">
        <Button className="col-md-6">Nearby</Button>
        <Button className="col-md-6">Favourites</Button>
      </div>
      {/* <div>{JSON.stringify(query.data)}</div> */}
      {query.isSuccess &&
        query.data.records.map((busStop) => {
          return (
            <div className="row" key={busStop.id}>
              <div>{busStop.fields["Saved name"]}</div>
              <div>{busStop.fields["Bus stop number"]}</div>
              <div>
                {
                  <BusStopName
                    busStopNo={busStop.fields["Bus stop number"]}
                    busStopDetailIdx={2}
                  />
                }
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Favourites;
