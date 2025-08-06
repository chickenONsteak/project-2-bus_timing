import React, { use } from "react";
import Button from "./Button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import BusStopName from "./BusStopName";
import favouriteStyles from "./Favourites.module.css";

const Favourites = () => {
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

  // DELETE DATA ON AIRTABLE
  const deleteFavourites = async (id) => {
    const deleteRes = await fetch(
      `${import.meta.env.VITE_AIRTABLE}?records[]=${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + import.meta.env.VITE_AIRTABLE_KEY,
        },
      }
    );
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
      <div className={`${favouriteStyles.favouriteHeader}`}>
        Saved favourites
      </div>
      <div className="row">
        <Button className="col-md-6">Nearby</Button>
        <Button className="col-md-6">Favourites</Button>
      </div>
      {/* <div>{JSON.stringify(queryGet.data)}</div> */}
      {queryGet.isLoading && (
        <div className={`row ${favouriteStyles.loading}`}>Loading...</div>
      )}

      {isLoadingDel && (
        <div className={`row ${favouriteStyles.loading}`}>Deleting...</div>
      )}

      {queryGet.isSuccess &&
        queryGet.data.records.map((busStop) => {
          return (
            <div key={busStop.id}>
              <br />
              <div className="row">
                <div
                  className={`col-md-12 ${favouriteStyles.favouriteSavedName}`}
                >
                  {busStop.fields["Saved name"]}
                </div>
                <div
                  className={`col-md-9 ${favouriteStyles.favouriteBusStopDetails}`}
                >
                  {
                    <BusStopName
                      busStopNo={busStop.fields["Bus stop number"]}
                      busStopDetailIdx={2}
                    />
                  }
                </div>
                <Button
                  className={`col-md-2 ${favouriteStyles.delete}`}
                  propFunction={() => mutateDel(busStop.id)}
                >
                  X
                </Button>
                <div
                  className={`col-md-12 ${favouriteStyles.favouriteBusStopDetails}`}
                >
                  {busStop.fields["Bus stop number"]}
                </div>
                {/* <Button className="col-md-6">Update</Button> */}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Favourites;
