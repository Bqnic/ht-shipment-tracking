import { Navigate, Route, Routes } from "react-router-dom";
import Tracking from "./Tracking.tsx";
import DetailedShipment from "./DetailedShipment.tsx";
import { IShipment } from "./assets/Interfaces.tsx";
import { shipments } from "./assets/mockShipment.tsx";
import { useState } from "react";
import Head from "./Head.tsx";
import { EditShipment } from "./EditShipment.tsx";
import { CreateShipment } from "./CreateShipment.tsx";

export default function App() {
  const [shipmentArr, setShipmentArr] = useState([...shipments]);
  const [detailsNotEdit, setDetailsNotEdit] = useState(true);
  const [notCreating, setNotCreating] = useState(true);
  const [filter, setFilter] = useState("nofilter");
  const [subFilter, setSubFilter] = useState("");

  function deleteFromShipmentArr(shipment: IShipment) {
    const tempArr = [...shipmentArr];
    const index: number = tempArr.findIndex((s) => s === shipment);
    tempArr.splice(index, 1);
    setShipmentArr(tempArr);
  }

  function editShipmentArr(shipment: IShipment) {
    const tempArr = [...shipmentArr];
    const index: number = tempArr.findIndex((s) => s.id === shipment.id);
    tempArr[index] = shipment;
    setShipmentArr(tempArr);
  }

  function addShipment(shipment: IShipment) {
    const tempArr = [...shipmentArr];
    let id = 1;
    while (id in tempArr) {
      id = Math.ceil(Math.random() * 1000);
    }
    shipment.id = id.toString();
    tempArr.push(shipment);
    setShipmentArr(tempArr);
  }

  return (
    <>
      <Head setNotCreating={setNotCreating}></Head>
      <Routes>
        <Route path="/" element={<Navigate to="shipmentTracking/" />}></Route>
        <Route
          path="shipmentTracking"
          element={
            notCreating ? (
              <Tracking
                shipmentArr={shipmentArr}
                deleteFromShipmentArr={deleteFromShipmentArr}
                setDetailsNotEdit={setDetailsNotEdit}
                setNotCreating={setNotCreating}
                filter={filter}
                subFilter={subFilter}
                setFilter={setFilter}
                setSubFilter={setSubFilter}
              />
            ) : (
              <CreateShipment
                setNotCreating={setNotCreating}
                addShipment={addShipment}
              />
            )
          }
        />
        <Route
          path="/shipmentTracking/:id"
          element={
            detailsNotEdit ? (
              <DetailedShipment
                shipmentArr={shipmentArr}
                deleteFromShipmentArr={deleteFromShipmentArr}
                setDetailsNotEdit={setDetailsNotEdit}
              />
            ) : (
              <EditShipment
                shipmentArr={shipmentArr}
                editShipmentArr={editShipmentArr}
                setDetailsNotEdit={setDetailsNotEdit}
              />
            )
          }
        />
      </Routes>
    </>
  );
}
