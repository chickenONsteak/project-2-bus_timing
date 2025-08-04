import React from "react";

const TimeTillArrival = (props) => {
  const convertToMins = (incomingBusDuration) => {
    const durationInMins = Math.floor(incomingBusDuration / 60000);
    if (durationInMins > 0) {
      return durationInMins;
    } else {
      return "Arriving";
    }
  };

  return (
    <div className="row">
      <div className="col-md-1">
        {props.incomingBus1
          ? convertToMins(props.incomingBus1.duration_ms)
          : "-"}
      </div>
      <div className="col-md-1">
        {props.incomingBus2
          ? convertToMins(props.incomingBus2.duration_ms)
          : "-"}
      </div>
      <div className="col-md-1">
        {props.incomingBus3
          ? convertToMins(props.incomingBus3.duration_ms)
          : "-"}
      </div>
    </div>
  );
};

export default TimeTillArrival;
