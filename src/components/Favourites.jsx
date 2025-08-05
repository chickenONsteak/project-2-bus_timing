import React from "react";
import Button from "./Button";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const Favourites = (props) => {
  const queryFavourites = useQueryClient();

  const getFavourites = async () => {
    const res = await fetch(
      import.meta.env.VITE_AIRTABLE + "/recp2GYDmWrNrFqlW",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: Bearer + import.meta.env.AIRTABLE_KEY,
        },
      }
    );
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
      <div>Jurong Polyclinic</div>
    </div>
  );
};

export default Favourites;
