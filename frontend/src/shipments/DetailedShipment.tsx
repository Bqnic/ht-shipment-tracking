import { useParams } from "react-router-dom";
import {
  IDetailedShipment,
  IDetailedShipmentComp,
  Status,
} from "../assets/Interfaces";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDetailedShipments } from "../apiCalls/shipmentApi";

export default function DetailedShipment({
  deleteFromShipmentArr,
  setDetailsNotEdit,
}: IDetailedShipmentComp) {
  const navigate = useNavigate();
  const shipmentID = useParams();
  const [shipment, setShipment] = useState<IDetailedShipment>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDetailedShipments(shipmentID.id).then((res) => {
      setShipment(res);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  } else {
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
              <h2>Shipment ID: {shipment?.id}</h2>
              <p>
                Carrier: <strong>{shipment?.carrier}</strong>
              </p>
              <p>
                Tracking Code:{" "}
                <a
                  href={shipment?.carrierTrackingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {shipment?.trackingCode}
                </a>
              </p>
              <p>Tracking Date: {shipment?.trackingDate as string}</p>
              <p>
                Status:{" "}
                <strong>{shipment ? Status[shipment.status] : null}</strong>
              </p>
              <p>Status Change Date: {shipment?.statusChangeDate as string}</p>
              <p>Status Change Reason: {shipment?.statusChangeReason}</p>
              <p>Weight: {shipment?.weight} kg</p>
              <p>
                Estimated Delivery Date:{" "}
                {shipment?.estimatedDeliveryDate as string}
              </p>
            </div>
            <div>
              <h3>Address From:</h3>
              <p>
                {shipment?.addressFrom.streetNr}{" "}
                {shipment?.addressFrom.streetName}{" "}
                {shipment?.addressFrom.streetSuffix}
              </p>
              <p>
                {shipment?.addressFrom.postcode} {shipment?.addressFrom.city}
              </p>
              <p>{shipment?.addressFrom.country}</p>

              <h3>Address To:</h3>
              <p>
                {shipment?.addressTo.streetNr} {shipment?.addressTo.streetName}{" "}
                {shipment?.addressTo.streetSuffix}
              </p>
              <p>
                {shipment?.addressTo.postcode} {shipment?.addressTo.city}
              </p>
              <p>{shipment?.addressTo.country}</p>
            </div>
            <div>
              <h3>Order:</h3>
              <p>
                Order ID:{" "}
                <a
                  href={shipment?.order.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {shipment?.order.id}
                </a>
              </p>
              <p>
                Order Name: <strong>{shipment?.order.name}</strong>
              </p>
              <p>Order Type: {shipment?.order.referredType}</p>
            </div>
            <div>
              <h3>Related Customer:</h3>
              <p>
                Customer ID:{" "}
                <a
                  href={shipment?.relatedCustomer.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {shipment?.relatedCustomer.id}
                </a>
              </p>
              <p>
                Customer Name: <strong>{shipment?.relatedCustomer.name}</strong>
              </p>
              <p>
                Customer Description: {shipment?.relatedCustomer.description}
              </p>
            </div>
            <p>Create Date: {shipment?.createDate as string}</p>
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
}
