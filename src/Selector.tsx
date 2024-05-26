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
          <select name="filter" id="filter" value={selected}>
            <option
              value="nofilter"
              onClick={() => {
                setSelected("nofilter");
                setSubSelector("");
              }}
            >
              No filter
            </option>
            <option
              value="id"
              onClick={() => {
                setSelected("id");
                setSubSelector("");
              }}
            >
              Shipment ID
            </option>
            <option
              value="customerID"
              onClick={() => {
                setSelected("customerID");
                setSubSelector("");
              }}
            >
              Customer ID
            </option>
            <option
              value="orderID"
              onClick={() => {
                setSelected("orderID");
                setSubSelector("");
              }}
            >
              Order ID
            </option>
            <option
              value="status"
              onClick={() => {
                setSelected("status");
                setSubSelector("Initialized");
              }}
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
            <select name="status-filter" id="status-filter" value={subSelector}>
              <option
                value="Initialized"
                onClick={() => setSubSelector("Initialized")}
              >
                Initialized
              </option>
              <option
                value="In process"
                onClick={() => setSubSelector("In process")}
              >
                In process
              </option>
              <option
                value="Processed"
                onClick={() => setSubSelector("Processed")}
              >
                Processed
              </option>
              <option value="Shipped" onClick={() => setSubSelector("Shipped")}>
                Shipped
              </option>
              <option
                value="In customs"
                onClick={() => setSubSelector("In customs")}
              >
                In customs
              </option>
              <option
                value="Delivered"
                onClick={() => setSubSelector("Delivered")}
              >
                Delivered
              </option>
              <option
                value="Returned"
                onClick={() => setSubSelector("Returned")}
              >
                Returned
              </option>
              <option value="Error" onClick={() => setSubSelector("Error")}>
                Error
              </option>
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
