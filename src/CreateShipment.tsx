import { ICreateShipment, IShipment, Status } from "./assets/Interfaces";
import { useState } from "react";

export function CreateShipment({ setNotCreating }: ICreateShipment) {
  const initialShipment: IShipment = {
    id: "",
    carrier: "",
    trackingCode: "",
    carrierTrackingUrl: "",
    trackingDate: new Date(),
    status: Status.initialized,
    statusChangeDate: new Date(),
    statusChangeReason: "",
    weight: 0,
    estimatedDeliveryDate: new Date(),
    addressFrom: {
      id: "",
      streetNr: "",
      streetName: "",
      streetSuffix: "",
      postcode: "",
      city: "",
      country: "",
    },
    addressTo: {
      id: "",
      streetNr: "",
      streetName: "",
      streetSuffix: "",
      postcode: "",
      city: "",
      country: "",
    },
    order: {
      id: "",
      href: "",
      name: "",
      referredType: "",
    },
    relatedCustomer: {
      id: "",
      href: "",
      name: "",
      description: "",
    },
    createDate: new Date(),
  };

  const [newShipment, setNewShipment] = useState<IShipment>({
    ...initialShipment,
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = e.target;
    setNewShipment({
      ...newShipment,
      [name]: value,
    });
  }
  return (
    <form className="create-shipment">
      <h2>Create New Shipment</h2>
      <label>
        Carrier:
        <input
          name="carrier"
          value={newShipment.carrier}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Tracking Code:
        <input
          name="trackingCode"
          value={newShipment.trackingCode}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Carrier Tracking URL:
        <input
          name="carrierTrackingUrl"
          value={newShipment.carrierTrackingUrl}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Tracking Date:
        <input
          name="trackingDate"
          type="date"
          value={newShipment.trackingDate.toISOString().substr(0, 10)}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Status:
        <select
          name="status"
          value={newShipment.status}
          onChange={handleChange}
          required
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
          value={newShipment.statusChangeDate.toISOString().substr(0, 10)}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Status Change Reason:
        <textarea
          name="statusChangeReason"
          value={newShipment.statusChangeReason}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Weight:
        <input
          name="weight"
          type="number"
          value={newShipment.weight}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Estimated Delivery Date:
        <input
          name="estimatedDeliveryDate"
          type="date"
          value={newShipment.estimatedDeliveryDate.toISOString().substr(0, 10)}
          onChange={handleChange}
          required
        />
      </label>
      <h3>Address From:</h3>
      <label>
        Street Number:
        <input
          name="addressFrom.streetNr"
          value={newShipment.addressFrom.streetNr}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Street Name:
        <input
          name="addressFrom.streetName"
          value={newShipment.addressFrom.streetName}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Street Suffix:
        <input
          name="addressFrom.streetSuffix"
          value={newShipment.addressFrom.streetSuffix}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Postcode:
        <input
          name="addressFrom.postcode"
          value={newShipment.addressFrom.postcode}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        City:
        <input
          name="addressFrom.city"
          value={newShipment.addressFrom.city}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Country:
        <input
          name="addressFrom.country"
          value={newShipment.addressFrom.country}
          onChange={handleChange}
          required
        />
      </label>
      <h3>Address To:</h3>
      <label>
        Street Number:
        <input
          name="addressTo.streetNr"
          value={newShipment.addressTo.streetNr}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Street Name:
        <input
          name="addressTo.streetName"
          value={newShipment.addressTo.streetName}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Street Suffix:
        <input
          name="addressTo.streetSuffix"
          value={newShipment.addressTo.streetSuffix}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Postcode:
        <input
          name="addressTo.postcode"
          value={newShipment.addressTo.postcode}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        City:
        <input
          name="addressTo.city"
          value={newShipment.addressTo.city}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Country:
        <input
          name="addressTo.country"
          value={newShipment.addressTo.country}
          onChange={handleChange}
          required
        />
      </label>
      <h3>Order:</h3>
      <label>
        Order ID:
        <input
          name="order.id"
          value={newShipment.order.id}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Order Name:
        <input
          name="order.name"
          value={newShipment.order.name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Order Type:
        <input
          name="order.referredType"
          value={newShipment.order.referredType}
          onChange={handleChange}
          required
        />
      </label>
      <h3>Related Customer:</h3>
      <label>
        Customer ID:
        <input
          name="relatedCustomer.id"
          value={newShipment.relatedCustomer.id}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Customer Name:
        <input
          name="relatedCustomer.name"
          value={newShipment.relatedCustomer.name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Customer Description:
        <input
          name="relatedCustomer.description"
          value={newShipment.relatedCustomer.description}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Create Date:
        <input
          name="createDate"
          type="date"
          value={newShipment.createDate.toISOString().substr(0, 10)}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Create</button>
      <button
        type="button"
        onClick={() => {
          setNotCreating(true);
        }}
      >
        Cancel
      </button>
    </form>
  );
}
