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
      <label>
        * Carrier:
        <input
          name="carrier"
          value={editableShipment.carrier}
          onChange={handleChange}
        />
      </label>
      <label>
        * Tracking Code:
        <input
          name="trackingCode"
          value={editableShipment.trackingCode}
          onChange={handleChange}
        />
      </label>
      <label>
        Carrier Tracking URL:
        <input
          name="carrierTrackingUrl"
          value={editableShipment.carrierTrackingUrl}
          onChange={handleChange}
        />
      </label>
      <label>
        Tracking Date:
        <input
          name="trackingDate"
          type="date"
          value={editableShipment.trackingDate.toISOString().substr(0, 10)}
          onChange={handleChange}
        />
      </label>
      <label>
        Status:
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
      </label>
      <label>
        Status Change Date:
        <input
          name="statusChangeDate"
          type="date"
          value={editableShipment.statusChangeDate.toISOString().substr(0, 10)}
          onChange={handleChange}
        />
      </label>
      <label>
        Status Change Reason:
        <textarea
          name="statusChangeReason"
          value={editableShipment.statusChangeReason}
          onChange={handleChange}
        />
      </label>
      <label>
        * Weight:
        <input
          name="weight"
          type="number"
          value={editableShipment.weight}
          onChange={handleChange}
        />
      </label>
      <label>
        Estimated Delivery Date:
        <input
          name="estimatedDeliveryDate"
          type="date"
          value={editableShipment.estimatedDeliveryDate
            .toISOString()
            .substr(0, 10)}
          onChange={handleChange}
        />
      </label>
      <h3>Address From:</h3>
      <label>
        * Street Number:
        <input
          name="addressFrom.streetNr"
          value={editableShipment.addressFrom.streetNr}
          onChange={handleChange}
        />
      </label>
      <label>
        * Street Name:
        <input
          name="addressFrom.streetName"
          value={editableShipment.addressFrom.streetName}
          onChange={handleChange}
        />
      </label>
      <label>
        Street Suffix:
        <input
          name="addressFrom.streetSuffix"
          value={editableShipment.addressFrom.streetSuffix}
          onChange={handleChange}
        />
      </label>
      <label>
        * Postcode:
        <input
          name="addressFrom.postcode"
          value={editableShipment.addressFrom.postcode}
          onChange={handleChange}
        />
      </label>
      <label>
        * City:
        <input
          name="addressFrom.city"
          value={editableShipment.addressFrom.city}
          onChange={handleChange}
        />
      </label>
      <label>
        * Country:
        <input
          name="addressFrom.country"
          value={editableShipment.addressFrom.country}
          onChange={handleChange}
        />
      </label>
      <h3>Address To:</h3>
      <label>
        * Street Number:
        <input
          name="addressTo.streetNr"
          value={editableShipment.addressTo.streetNr}
          onChange={handleChange}
        />
      </label>
      <label>
        * Street Name:
        <input
          name="addressTo.streetName"
          value={editableShipment.addressTo.streetName}
          onChange={handleChange}
        />
      </label>
      <label>
        Street Suffix:
        <input
          name="addressTo.streetSuffix"
          value={editableShipment.addressTo.streetSuffix}
          onChange={handleChange}
        />
      </label>
      <label>
        * Postcode:
        <input
          name="addressTo.postcode"
          value={editableShipment.addressTo.postcode}
          onChange={handleChange}
        />
      </label>
      <label>
        * City:
        <input
          name="addressTo.city"
          value={editableShipment.addressTo.city}
          onChange={handleChange}
        />
      </label>
      <label>
        * Country:
        <input
          name="addressTo.country"
          value={editableShipment.addressTo.country}
          onChange={handleChange}
        />
      </label>
      <h3>Order:</h3>
      <label>
        * Order ID:
        <input
          name="order.id"
          value={editableShipment.order.id}
          onChange={handleChange}
        />
      </label>
      <label>
        Order Name:
        <input
          name="order.name"
          value={editableShipment.order.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Order Type:
        <input
          name="order.referredType"
          value={editableShipment.order.referredType}
          onChange={handleChange}
        />
      </label>
      <h3>Related Customer:</h3>
      <label>
        * Customer ID:
        <input
          name="relatedCustomer.id"
          value={editableShipment.relatedCustomer.id}
          onChange={handleChange}
        />
      </label>
      <label>
        Customer Name:
        <input
          name="relatedCustomer.name"
          value={editableShipment.relatedCustomer.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Customer Description:
        <input
          name="relatedCustomer.description"
          value={editableShipment.relatedCustomer.description}
          onChange={handleChange}
        />
      </label>
      <label>
        Create Date:
        <input
          name="createDate"
          type="date"
          value={editableShipment.createDate.toISOString().substr(0, 10)}
          onChange={handleChange}
        />
      </label>
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
    </form>
  );
}
