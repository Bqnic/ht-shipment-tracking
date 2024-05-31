import { useState } from "react";
import { ISelectorComp } from "./assets/Interfaces";

export default function Selector({
  setFilter,
  setSubFilter,
  filter,
  subFilter,
}: ISelectorComp) {
  const [selected, setSelected] = useState(`${filter}`);
  const [subSelector, setSubSelector] = useState(`${subFilter}`);

  return (
    <form action="">
      <div>
        <div className="selector">
          <p>Get by: </p>
          <select
            name="filter"
            id="filter"
            value={selected}
            onChange={(e) => {
              setSelected(e.target.value);
              setSubSelector("");
            }}
          >
            <option value="nofilter">No filter</option>
            <option value="id">Shipment ID</option>
            <option value="customerID">Customer ID</option>
            <option value="orderID">Order ID</option>
            <option
              value="status"
              onClick={() => setSubSelector("Initialized")}
            >
              Status
            </option>
          </select>
        </div>
        <div className="detailed-selector">
          {selected === "id" ||
          selected === "customerID" ||
          selected === "orderID" ? (
            <div>
              <input
                type="text"
                name=""
                id=""
                value={subSelector}
                onChange={(e) => setSubSelector(e.target.value)}
              />
            </div>
          ) : null}
          {selected === "status" ? (
            <select
              name="status-filter"
              id="status-filter"
              value={subSelector}
              onChange={(e) => setSubSelector(e.target.value)}
            >
              <option value="Initialized">Initialized</option>
              <option value="In process">In process</option>
              <option value="Processed">Processed</option>
              <option value="Shipped">Shipped</option>
              <option value="In customs">In customs</option>
              <option value="Delivered">Delivered</option>
              <option value="Returned">Returned</option>
              <option value="Error">Error</option>
            </select>
          ) : null}
        </div>
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          setFilter(selected);
          setSubFilter(subSelector);
        }}
        type="button"
        id="get-shipment"
      >
        Get Shipments
      </button>
    </form>
  );
}
