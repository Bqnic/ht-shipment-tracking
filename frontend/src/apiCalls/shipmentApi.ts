import { IDetailedShipment } from "../assets/Interfaces";

export async function getShipments() {
  const response = await fetch(
    import.meta.env.VITE_REACT_BACKEND_URL + "/shipmentTracking"
  );

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    console.log("Couldn't fetch shipments");
  }
}

export async function getDetailedShipments(id: string | undefined) {
  const response = await fetch(
    import.meta.env.VITE_REACT_BACKEND_URL + `/shipmentTracking/${id}`
  );

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    console.log(`Couldn't fetch shipment with id ${id}`);
  }
}

export async function postShipment(shipmentData: IDetailedShipment) {
  try {
    const response = await fetch(
      import.meta.env.VITE_REACT_BACKEND_URL + "/shipmentTracking",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(shipmentData),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error posting shipment:", error);
    throw error;
  }
}

export async function deleteShipment(shipmentId: string) {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_REACT_BACKEND_URL
      }/shipmentTracking/${shipmentId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error deleting shipment:", error);
    throw error;
  }
}

export async function updateShipment(
  shipmentId: string,
  updateData: IDetailedShipment
) {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_REACT_BACKEND_URL
      }/shipmentTracking/${shipmentId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error updating shipment:", error);
    throw error;
  }
}
