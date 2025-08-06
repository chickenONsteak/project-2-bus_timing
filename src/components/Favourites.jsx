import React, { use } from "react";
import Button from "./Button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import BusStopName from "./BusStopName";

const Favourites = (props) => {
  const queryFavourites = useQueryClient();

  // RETRIEVE DATA FROM AIRTABLE
  const getFavourites = async () => {
    const getRes = await fetch(import.meta.env.VITE_AIRTABLE, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + import.meta.env.VITE_AIRTABLE_KEY,
      },
    });
    if (!getRes.ok) {
      return new Error("error getting favourites");
    }
    return await getRes.json();
  };

  const queryGet = useQuery({
    queryKey: ["getFavourites"],
    queryFn: getFavourites,
  });

  // // UPDATE DATA ON AIRTABLE
  // const updateFavourites = async () => {
  //   const updateRes = await fetch(import.meta.env.VITE_AIRTABLE, {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + import.meta.env.VITE_AIRTABLE_KEY,
  //     },
  //   });
  //   if (!updateRes.ok) {
  //     return new Error("error updating favourites");
  //   }
  // };

  // const {
  //   mutate: mutateUpd,
  //   isLoading: isLoadingUpd,
  //   isError: isErrorUpd,
  //   error: errorUpd,
  // } = useMutation({
  //   mutationFn: updateFavourites,
  //   onSuccess: () => {
  //     queryFavourites.invalidateQueries(["getFavourites"]);
  //   },
  // });

  // DELETE DATA ON AIRTABLE
  const deleteFavourites = async () => {
    const deleteRes = await fetch(import.meta.env.VITE_AIRTABLE, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + import.meta.env.VITE_AIR_TABLE_KEY,
      },
    });
    if (!deleteRes.ok) {
      return new Error("error deleting favourites");
    }
  };

  const {
    mutate: mutateDel,
    isLoading: isLoadingDel,
    isError: isErrorDel,
    error: errorDel,
  } = useMutation({
    mutationFn: deleteFavourites,
    onSuccess: () => {
      queryFavourites.invalidateQueries(["getFavourites"]);
    },
  });

  return (
    <div className="container">
      <div>Saved favourites</div>
      <div className="row">
        <Button className="col-md-6">Nearby</Button>
        <Button className="col-md-6">Favourites</Button>
      </div>
      {/* <div>{JSON.stringify(queryGet.data)}</div> */}
      {queryGet.isSuccess &&
        queryGet.data.records.map((busStop) => {
          return (
            <div className="row" key={busStop.id}>
              <div className="col-md-12">{busStop.fields["Saved name"]}</div>
              {/* <div>{busStop.fields["Bus stop number"]}</div> */}
              <div className="col-md-9">
                {
                  <BusStopName
                    busStopNo={busStop.fields["Bus stop number"]}
                    busStopDetailIdx={2}
                  />
                }
              </div>
              {/* <Button className="col-md-6">Update</Button> */}
              <Button className="col-md-3">Del</Button>
            </div>
          );
        })}
    </div>
  );
};

export default Favourites;
