import { useState } from "react";
import { ISelectorComp } from "./assets/Interfaces";

export default function Selector({ setFilter }: ISelectorComp) {
  const [selected, setSelected] = useState("nofilter");

  return (
    <form action="">
      <div>
        <div className="selector">
          <p>Get by: </p>
          <select name="filter" id="filter">
            <option value="nofilter" onClick={() => setSelected("nofilter")}>
              No filter
            </option>
            <option value="id" onClick={() => setSelected("id")}>
              Shipment ID
            </option>
            <option
              value="customerID"
              onClick={() => setSelected("customerID")}
            >
              Customer ID
            </option>
            <option value="orderID" onClick={() => setSelected("orderID")}>
              Order ID
            </option>
            <option value="status" onClick={() => setSelected("status")}>
              Status
            </option>
          </select>
        </div>
        <div className="detailed-selector">
          {selected === "id" ||
          selected === "customerID" ||
          selected === "orderID" ? (
            <div>
              <input type="number" name="" id="" />
            </div>
          ) : null}
          {selected === "status" ? (
            <select name="status-filter" id="status-filter">
              <option value="initialized">Initialized</option>
              <option value="inProcess">In Process</option>
              <option value="processed">Processed</option>
              <option value="shipped">Shipped</option>
              <option value="inCustoms">In Customs</option>
              <option value="delivered">Delivered</option>
              <option value="returned">Returned</option>
              <option value="error">Error</option>
            </select>
          ) : null}
        </div>
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          setFilter(selected);
        }}
        type="button"
        id="get-shipment"
      >
        Get Shipments
      </button>
    </form>
  );
}
