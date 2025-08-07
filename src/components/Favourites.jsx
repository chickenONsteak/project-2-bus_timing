import React, { useEffect, useState } from "react";
import Button from "./Button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import BusStopName from "./BusStopName";
import favouriteStyles from "./Favourites.module.css";

const Favourites = (props) => {
  const queryFavourites = useQueryClient();
  const [isNearbyFocus, setIsNearbyFocus] = useState(true);
  const [listOfNearbyBusStops, setListOfNearbyBusStops] = useState([]);

  // FOR RENDERING NEARBY BUS STOPS
  // CALCULATE DISTANCE WITH HAVERSINE FORMULA — source: https://www.movable-type.co.uk/scripts/latlong.html
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // metres
    const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // where d is distance (in metres)
    return d;
  };

  // GET ALL BUS STOPS
  const getBusStopData = async () => {
    const getBusStopRes = await fetch(import.meta.env.VITE_BUS_STOP_NAMES);
    if (!getBusStopRes.ok) {
      throw new Error("error getting bus stop data");
    }
    return await getBusStopRes.json();
  };

  // QUERY.DATA RETURNS AN OBJECT, NEED TO USE FOR...IN TO MAP THROUGH AND CALCULATE DISTANCE
  const listNearbyBusStops = () => {
    for (const busStopNo in getBusStopQuery.data) {
      const lat = getBusStopQuery.data[busStopNo][1];
      const long = getBusStopQuery.data[busStopNo][0];
      const searchInputLat = props.addressLatLong.lat;
      const searchInputLong = props.addressLatLong.long;
      const distance = calculateDistance(
        searchInputLat,
        searchInputLong,
        lat,
        long
      );
      if (distance <= 500) {
        setListOfNearbyBusStops((prevState) => [...prevState, busStopNo]);
      }
    }
  };

  useEffect(() => {
    getBusStopData(), listNearbyBusStops();
  }, []);

  const getBusStopQuery = useQuery({
    queryKey: ["getBusStopData"],
    queryFn: getBusStopData,
  });

  // FOR RENDERING FAVOURITES
  // RETRIEVE FAVOURITES SAVED ON AIRTABLE
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
    queryKey: ["getFavourites", isNearbyFocus],
    queryFn: getFavourites,
  });

  // DELETE FAVOURITES SAVED ON AIRTABLE
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
      {/* <div>{JSON.stringify(props.addressLatLong)}</div> */}
      <div className={`${favouriteStyles.favouriteHeader}`}>
        Saved favourites
      </div>
      <div className="row">
        <Button
          className="col-md-6"
          propFunction={() => setIsNearbyFocus(true)}
        >
          Nearby
        </Button>
        <Button
          className="col-md-6"
          propFunction={() => setIsNearbyFocus(false)}
        >
          Favourites
        </Button>
      </div>

      {/* NEARBY BUS STOPS */}
      {isNearbyFocus && getBusStopQuery.isSuccess && (
        <>
          {listOfNearbyBusStops.map((busStopNo) => {
            return (
              <>
                <BusStopName busStopNo={busStopNo} busStopDetailIdx={2} />
                <BusStopName busStopNo={busStopNo} busStopDetailIdx={3} />
              </>
            );
          })}
        </>
      )}

      {/* FAVOURITE BUS STOPS */}
      {/* <div>{JSON.stringify(queryGet.data)}</div> */}
      {!isNearbyFocus && queryGet.isLoading && (
        <div className={`row ${favouriteStyles.loading}`}>Loading...</div>
      )}

      {!isNearbyFocus && isLoadingDel && (
        <div className={`row ${favouriteStyles.loading}`}>Deleting...</div>
      )}

      {!isNearbyFocus &&
        queryGet.isSuccess &&
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
