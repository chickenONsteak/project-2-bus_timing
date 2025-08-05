import React from "react";

const TimeTillArrival = (props) => {
  const convertToMins = (incomingBusDuration) => {
    const durationInMins = Math.floor(incomingBusDuration / 60000);
    if (durationInMins > 0) {
      return durationInMins;
    } else {
      return "Arr";
    }
  };

  return (
    <div className="row">
      {props.incomingBus1 ? (
        <div className={`col-md-2 ${props.busAvailableLarge}`}>
          {convertToMins(props.incomingBus1.duration_ms)}
        </div>
      ) : (
        <div className={`col-md-2 ${props.busNotAvailableLarge}`}>{"-"}</div>
      )}

      {props.incomingBus2 ? (
        <div className={`col-md-2 ${props.busAvailableLarge}`}>
          {convertToMins(props.incomingBus2.duration_ms)}
        </div>
      ) : (
        <div className={`col-md-2 ${props.busNotAvailableLarge}`}>{"-"}</div>
      )}

      {props.incomingBus3 ? (
        <div className={`col-md-2 ${props.busAvailableLarge}`}>
          {convertToMins(props.incomingBus3.duration_ms)}
        </div>
      ) : (
        <div className={`col-md-2 ${props.busNotAvailableLarge}`}>{"-"}</div>
      )}
    </div>
  );
};

export default TimeTillArrival;
