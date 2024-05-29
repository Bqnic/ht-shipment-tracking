import { IEditShipment, Status } from "./assets/Interfaces.tsx";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function EditShipment({
  shipmentArr,
  editShipmentArr,
  setDetailsNotEdit,
}: IEditShipment) {
  const navigate = useNavigate();
  const param = useParams();
  const index = shipmentArr.findIndex((s) => s.id === param.id);
  const [editableShipment, setEditableShipment] = useState(shipmentArr[index]);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = e.target;

    const keys = name.split(".");
    if (keys.length === 2) {
      const [parent, child] = keys;
      setEditableShipment({
        ...editableShipment,
        [parent]: {
          ...(editableShipment as any)[parent],
          [child]: value,
        },
      });
    } else if (
      name === "trackingDate" ||
      name === "statusChangeDate" ||
      name === "estimatedDeliveryDate" ||
      name === "createDate"
    ) {
      setEditableShipment({
        ...editableShipment,
        [name]: new Date(value),
      });
    } else {
      setEditableShipment({
        ...editableShipment,
        [name]: value,
      });
    }
  }

  function checkValidity() {
    const {
      carrier,
      trackingCode,
      weight,
      addressFrom,
      addressTo,
      order,
      relatedCustomer,
      id,
    } = editableShipment;

    const isNotEmpty = (str: string) => str && str.trim() !== "";
    const isPositiveNumber = (num: number) => !isNaN(num) && Number(num) > 0;

    if (
      isNotEmpty(carrier) &&
      isNotEmpty(trackingCode) &&
      isPositiveNumber(weight) &&
      isNotEmpty(addressFrom?.streetNr) &&
      isNotEmpty(addressFrom?.streetName) &&
      isNotEmpty(addressFrom?.postcode) &&
      isNotEmpty(addressFrom?.city) &&
      isNotEmpty(addressFrom?.country) &&
      isNotEmpty(addressTo?.streetNr) &&
      isNotEmpty(addressTo?.streetName) &&
      isNotEmpty(addressTo?.postcode) &&
      isNotEmpty(addressTo?.city) &&
      isNotEmpty(addressTo?.country) &&
      isNotEmpty(order?.id) &&
      isNotEmpty(relatedCustomer?.id)
    ) {
      editShipmentArr(editableShipment);
      setDetailsNotEdit(true);
      navigate(`/shipmentTracking/${id}`);
    } else {
      alert("Please fill out the required fields (marked with *)");
    }
  }

  return (
    <form className="edit-shipment">
      <h2>Edit Shipment ID: {editableShipment.id}</h2>
      <div className="form-group">
        <label>* Carrier:</label>
        <input
          name="carrier"
          value={editableShipment.carrier}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>* Tracking Code:</label>
        <input
          name="trackingCode"
          value={editableShipment.trackingCode}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Carrier Tracking URL:</label>
        <input
          name="carrierTrackingUrl"
          value={editableShipment.carrierTrackingUrl}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Tracking Date:</label>
        <input
          name="trackingDate"
          type="date"
          value={editableShipment.trackingDate.toISOString().substr(0, 10)}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Status:</label>
        <select
          name="status"
          value={editableShipment.status}
          onChange={handleChange}
        >
          {Object.values(Status).map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Status Change Date:</label>
        <input
          name="statusChangeDate"
          type="date"
          value={editableShipment.statusChangeDate.toISOString().substr(0, 10)}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Status Change Reason:</label>
        <textarea
          name="statusChangeReason"
          value={editableShipment.statusChangeReason}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>* Weight:</label>
        <input
          name="weight"
          type="number"
          value={editableShipment.weight}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Estimated Delivery Date:</label>
        <input
          name="estimatedDeliveryDate"
          type="date"
          value={editableShipment.estimatedDeliveryDate
            .toISOString()
            .substr(0, 10)}
          onChange={handleChange}
        />
      </div>
      <h3>Address From:</h3>
      <div className="form-group">
        <label>* Street Number:</label>
        <input
          name="addressFrom.streetNr"
          value={editableShipment.addressFrom.streetNr}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>* Street Name:</label>
        <input
          name="addressFrom.streetName"
          value={editableShipment.addressFrom.streetName}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Street Suffix:</label>
        <input
          name="addressFrom.streetSuffix"
          value={editableShipment.addressFrom.streetSuffix}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>* Postcode:</label>
        <input
          name="addressFrom.postcode"
          value={editableShipment.addressFrom.postcode}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>* City:</label>
        <input
          name="addressFrom.city"
          value={editableShipment.addressFrom.city}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>* Country:</label>
        <input
          name="addressFrom.country"
          value={editableShipment.addressFrom.country}
          onChange={handleChange}
        />
      </div>
      <h3>Address To:</h3>
      <div className="form-group">
        <label>* Street Number:</label>
        <input
          name="addressTo.streetNr"
          value={editableShipment.addressTo.streetNr}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>* Street Name:</label>
        <input
          name="addressTo.streetName"
          value={editableShipment.addressTo.streetName}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Street Suffix:</label>
        <input
          name="addressTo.streetSuffix"
          value={editableShipment.addressTo.streetSuffix}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>* Postcode:</label>
        <input
          name="addressTo.postcode"
          value={editableShipment.addressTo.postcode}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>* City:</label>
        <input
          name="addressTo.city"
          value={editableShipment.addressTo.city}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>* Country:</label>
        <input
          name="addressTo.country"
          value={editableShipment.addressTo.country}
          onChange={handleChange}
        />
      </div>
      <h3>Order:</h3>
      <div className="form-group">
        <label>* Order ID:</label>
        <input
          name="order.id"
          value={editableShipment.order.id}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Order Name:</label>
        <input
          name="order.name"
          value={editableShipment.order.name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Order Type:</label>
        <input
          name="order.referredType"
          value={editableShipment.order.referredType}
          onChange={handleChange}
        />
      </div>
      <h3>Related Customer:</h3>
      <div className="form-group">
        <label>* Customer ID:</label>
        <input
          name="relatedCustomer.id"
          value={editableShipment.relatedCustomer.id}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Customer Name:</label>
        <input
          name="relatedCustomer.name"
          value={editableShipment.relatedCustomer.name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Customer Description:</label>
        <input
          name="relatedCustomer.description"
          value={editableShipment.relatedCustomer.description}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Create Date:</label>
        <input
          name="createDate"
          type="date"
          value={editableShipment.createDate.toISOString().substr(0, 10)}
          onChange={handleChange}
        />
      </div>
      <div className="shipment-btns">
        <button
          type="button"
          onClick={() => {
            checkValidity();
          }}
        >
          Save
        </button>
        <button
          type="button"
          onClick={() => {
            setDetailsNotEdit(true);
            navigate(`/shipmentTracking/${editableShipment.id}`);
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
