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
