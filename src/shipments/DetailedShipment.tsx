import { useParams } from "react-router-dom";
import { IDetailedShipmentComp } from "../assets/Interfaces";
import { useNavigate } from "react-router-dom";

export default function DetailedShipment({
  shipmentArr,
  deleteFromShipmentArr,
  setDetailsNotEdit,
}: IDetailedShipmentComp) {
  const navigate = useNavigate();
  const shipmentID = useParams();
  const index: number = shipmentArr.findIndex((s) => s.id === shipmentID.id);
  const shipment = shipmentArr[index];

  return (
    <>
      <button
        className="go-back"
        onClick={() => {
          navigate("/shipmentTracking");
        }}
      >
        ◀
      </button>
      <div className="detailed-shipment-wrapper">
        <div className="detailed-shipment">
          <div>
            <h2>Shipment ID: {shipment.id}</h2>
            <p>
              Carrier: <strong>{shipment.carrier}</strong>
            </p>
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
            <p>
              Status: <strong>{shipment.status}</strong>
            </p>
            <p>
              Status Change Date: {shipment.statusChangeDate.toDateString()}
            </p>
            <p>Status Change Reason: {shipment.statusChangeReason}</p>
            <p>Weight: {shipment.weight.toString()} kg</p>
            <p>
              Estimated Delivery Date:{" "}
              {shipment.estimatedDeliveryDate.toDateString()}
            </p>
          </div>
          <div>
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
          </div>
          <div>
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
            <p>
              Order Name: <strong>{shipment.order.name}</strong>
            </p>
            <p>Order Type: {shipment.order.referredType}</p>
          </div>
          <div>
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
            <p>
              Customer Name: <strong>{shipment.relatedCustomer.name}</strong>
            </p>
            <p>Customer Description: {shipment.relatedCustomer.description}</p>
          </div>
          <p>Create Date: {shipment.createDate.toDateString()}</p>
          <div className="buttons">
            <button
              className="delete-btn"
              onClick={() => {
                deleteFromShipmentArr(shipment);
                navigate("/shipmentTracking");
              }}
            >
              Delete
            </button>
            <button
              className="edit-btn"
              onClick={() => setDetailsNotEdit(false)}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
