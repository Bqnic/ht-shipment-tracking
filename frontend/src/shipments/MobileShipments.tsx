import { useNavigate } from "react-router-dom";
import { IShipmentsComp, Status } from "../assets/Interfaces";

export default function MobileShipments({
  shipmentArr,
  deleteFromShipmentArr,
  setDetailsNotEdit,
  filter,
  subFilter,
}: IShipmentsComp) {
  const navigate = useNavigate();
  let filteredArr = [];

  if (filter === "id") {
    filteredArr = shipmentArr.filter((s) => s.id === subFilter);
  } else if (filter === "customerID") {
    filteredArr = shipmentArr.filter((s) => s.relatedCustomer.id === subFilter);
  } else if (filter === "orderID") {
    filteredArr = shipmentArr.filter((s) => s.order.id === subFilter);
  } else if (filter === "status") {
    filteredArr = shipmentArr.filter((s) => s.status === subFilter);
  } else {
    filteredArr = [...shipmentArr];
  }

  return (
    <div className="shipments-wrapper">
      {filteredArr.map((shipment, index) => (
        <div key={index} className="shipment-wrapper">
          <div className="shipment">
            <h3>Shipment ID: {shipment.id}</h3>
            <p>Status: {Status[shipment.status]}</p>
            <p>Carrier: {shipment.carrier}</p>
            <p>
              Order ID:{" "}
              <a
                href={shipment.order.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {shipment.order.id}
              </a>
            </p>
            <p>
              Customer ID:{" "}
              <a
                href={shipment.relatedCustomer.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {shipment.relatedCustomer.id}
              </a>
            </p>
          </div>
          <div className="shipment-main-btns">
            <button
              onClick={() => {
                setDetailsNotEdit(true);
                navigate(`/shipmentTracking/${shipment.id}`);
              }}
              className="detail-btn"
            >
              Details
            </button>
            <button
              className="edit-btn"
              onClick={() => {
                setDetailsNotEdit(false);
                navigate(`/shipmentTracking/${shipment.id}`);
              }}
            >
              Edit
            </button>
            <button
              onClick={() => deleteFromShipmentArr(shipment)}
              className="delete-btn"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
