import { shipments } from "./assets/mockShipment.tsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { IShipment } from "./assets/Interfaces.tsx";

export default function Shipments() {
  const navigate = useNavigate();
  const [shipmentArr, setShipmentArr] = useState([...shipments]);

  function deleteFromShipmentArr(shipment: IShipment) {
    const tempArr = [...shipmentArr];
    const index: number = tempArr.findIndex((s) => s === shipment);
    tempArr.splice(index, 1);
    setShipmentArr(tempArr);
  }

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
              onClick={() => navigate(`shipmentTracking/${shipment.id}`)}
              id="detail-btn"
            >
              View details
            </button>
            <button id="edit-btn">Edit</button>
            <button
              onClick={() => deleteFromShipmentArr(shipment)}
              id="delete-btn"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
