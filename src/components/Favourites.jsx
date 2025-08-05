import React from "react";
import Button from "./Button";

const Favourites = (props) => {
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
