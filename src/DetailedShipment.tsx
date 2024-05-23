import { useParams } from "react-router-dom";
import { shipments } from "./assets/mockShipment";

export default function DetailedShipment() {
  const shipmentID = useParams();
  const index: number = shipments.findIndex((s) => s.id === shipmentID.id);
  const shipment = shipments[index];

  return (
    <>
      <div className="shipment-wrapper">
        <div key={index} className="shipment">
          <h2>Shipment ID: {shipment.id}</h2>
          <p>Carrier: {shipment.carrier}</p>
          <p>
            Tracking Code:{" "}
            <a
              href={shipment.carrierTrackingUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {shipment.trackingCode}
            </a>
          </p>
          <p>Tracking Date: {shipment.trackingDate.toDateString()}</p>
          <p>Status: {shipment.status}</p>
          <p>Status Change Date: {shipment.statusChangeDate.toDateString()}</p>
          <p>Status Change Reason: {shipment.statusChangeReason}</p>
          <p>Weight: {shipment.weight.toString()} kg</p>
          <p>
            Estimated Delivery Date:{" "}
            {shipment.estimatedDeliveryDate.toDateString()}
          </p>

          <h3>Address From:</h3>
          <p>
            {shipment.addressFrom.streetNr} {shipment.addressFrom.streetName}{" "}
            {shipment.addressFrom.streetSuffix}
          </p>
          <p>
            {shipment.addressFrom.postcode} {shipment.addressFrom.city}
          </p>
          <p>{shipment.addressFrom.country}</p>

          <h3>Address To:</h3>
          <p>
            {shipment.addressTo.streetNr} {shipment.addressTo.streetName}{" "}
            {shipment.addressTo.streetSuffix}
          </p>
          <p>
            {shipment.addressTo.postcode} {shipment.addressTo.city}
          </p>
          <p>{shipment.addressTo.country}</p>

          <h3>Order:</h3>
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
          <p>Order Name: {shipment.order.name}</p>
          <p>Order Type: {shipment.order.referredType}</p>

          <h3>Related Customer:</h3>
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
          <p>Customer Name: {shipment.relatedCustomer.name}</p>
          <p>Customer Description: {shipment.relatedCustomer.description}</p>

          <p>Create Date: {shipment.createDate.toDateString()}</p>
        </div>
      </div>
    </>
  );
}
