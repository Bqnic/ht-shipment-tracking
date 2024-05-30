import { useNavigate } from "react-router-dom";
import { IShipmentsComp } from "../assets/Interfaces";

export default function DesktopShipments({
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
      <div className="table-header">
        <div>Shipment ID</div>
        <div>Status</div>
        <div>Carrier</div>
        <div>Order ID</div>
        <div>Customer ID</div>
        <div>Actions</div>
      </div>
      {filteredArr.map((shipment, index) => (
        <div key={index} className="shipment-row">
          <div>{shipment.id}</div>
          <div>{shipment.status}</div>
          <div>{shipment.carrier}</div>
          <div>
            <a
              href={shipment.order.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {shipment.order.id}
            </a>
          </div>
          <div>
            <a
              href={shipment.relatedCustomer.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {shipment.relatedCustomer.id}
            </a>
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
