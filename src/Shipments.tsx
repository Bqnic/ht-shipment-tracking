import { useNavigate } from "react-router-dom";
import { IShipmentsComp } from "./assets/Interfaces";

export default function Shipments({
  shipmentArr,
  deleteFromShipmentArr,
  setDetailsNotEdit,
}: IShipmentsComp) {
  const navigate = useNavigate();

  return (
    <div className="shipments-wrapper">
      {shipmentArr.map((shipment, index) => (
        <div key={index} className="shipment-wrapper">
          <div className="shipment">
            <h3>Shipment ID: {shipment.id}</h3>
            <p>Status: {shipment.status}</p>
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
          <div className="shipment-btns">
            <button
              onClick={() => {
                setDetailsNotEdit(true);
                navigate(`/shipmentTracking/${shipment.id}`);
              }}
              id="detail-btn"
            >
              View details
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
