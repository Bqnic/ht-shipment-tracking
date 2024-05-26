import { useState } from "react";
import Selector from "./Selector";
import Shipments from "./Shipments";
import { ITrackingComp } from "./assets/Interfaces";

export default function Tracking({
  shipmentArr,
  deleteFromShipmentArr,
  setDetailsNotEdit,
  setNotCreating,
  filter,
  setFilter,
  subFilter,
  setSubFilter,
}: ITrackingComp) {
  return (
    <div className="tracking">
      <Selector
        setFilter={setFilter}
        setSubFilter={setSubFilter}
        filter={filter}
        subFilter={subFilter}
      ></Selector>
      <button
        id="adding-shipment"
        onClick={() => {
          setNotCreating(false);
        }}
      >
        +
      </button>
      <Shipments
        shipmentArr={shipmentArr}
        deleteFromShipmentArr={deleteFromShipmentArr}
        setDetailsNotEdit={setDetailsNotEdit}
        filter={filter}
        subFilter={subFilter}
      ></Shipments>
    </div>
  );
}
