import { useState } from "react";
import Selector from "./Selector";
import Shipments from "./Shipments";
import { ITrackingComp } from "./assets/Interfaces";

export default function Tracking({
  shipmentArr,
  deleteFromShipmentArr,
  setDetailsNotEdit,
}: ITrackingComp) {
  const [filter, setFilter] = useState("nofilter");

  return (
    <>
      <Selector setFilter={setFilter}></Selector>
      <Shipments
        shipmentArr={shipmentArr}
        deleteFromShipmentArr={deleteFromShipmentArr}
        setDetailsNotEdit={setDetailsNotEdit}
      ></Shipments>
    </>
  );
}
