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
            <option value="status">Status</option>
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
              <option value="initialized">Initialized</option>
              <option value="inProcess">In process</option>
              <option value="processed">Processed</option>
              <option value="shipped">Shipped</option>
              <option value="inCustoms">In customs</option>
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
