export default async function getShipments() {
  const response = await fetch(
    import.meta.env.VITE_REACT_BACKEND_URL + "/shipmentTracking"
  );

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    return "Couldn't fetch shipments";
  }
}
