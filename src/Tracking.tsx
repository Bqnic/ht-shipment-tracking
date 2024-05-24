import { useState } from "react";
import Selector from "./Selector";
import Shipments from "./Shipments";
import { ITrackingComp } from "./assets/Interfaces";
import { useNavigate } from "react-router-dom";

export default function Tracking({
  shipmentArr,
  deleteFromShipmentArr,
  setDetailsNotEdit,
  setNotCreating,
}: ITrackingComp) {
  const [filter, setFilter] = useState("nofilter");
  const navigate = useNavigate();

  return (
    <div className="tracking">
      <Selector setFilter={setFilter}></Selector>
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
      ></Shipments>
    </div>
  );
}
