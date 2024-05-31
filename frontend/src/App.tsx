import { Navigate, Route, Routes } from "react-router-dom";
import Tracking from "./Tracking.tsx";
import DetailedShipment from "./shipments/DetailedShipment.tsx";
import { IDetailedShipment, IShipment } from "./assets/Interfaces.tsx";
//import { shipments } from "./assets/mockShipment.tsx";
import { useEffect, useState } from "react";
import Head from "./Head.tsx";
import { EditShipment } from "./shipments/EditShipment.tsx";
import { CreateShipment } from "./shipments/CreateShipment.tsx";
import {
  deleteShipment,
  getShipments,
  postShipment,
  updateShipment,
} from "./apiCalls/shipmentApi.ts";

export default function App() {
  const [shipmentArr, setShipmentArr] = useState<IShipment[]>([]);
  const [detailsNotEdit, setDetailsNotEdit] = useState(true);
  const [notCreating, setNotCreating] = useState(true);
  const [filter, setFilter] = useState("nofilter");
  const [subFilter, setSubFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getShipments().then((shipments) => {
      setShipmentArr(shipments);
      setLoading(false);
    });
  }, []);

  function deleteFromShipmentArr(shipment: IShipment) {
    deleteShipment(shipment.id).then(() => {
      const tempArr = [...shipmentArr];
      const index: number = tempArr.findIndex((s) => s === shipment);
      tempArr.splice(index, 1);
      setShipmentArr(tempArr);
    });
  }

  function editShipmentArr(shipment: IDetailedShipment) {
    updateShipment(shipment.id, shipment).then(() => {
      const tempArr = [...shipmentArr];
      const index = tempArr.findIndex((s) => s.id === shipment.id);
      const shortShipment: IShipment = {
        id: shipment.id,
        status: shipment.status,
        carrier: shipment.carrier,
        orderId: shipment.order.id,
        orderHref: shipment.order.href,
        relatedCustomerId: shipment.relatedCustomer.id,
        relatedCustomerHref: shipment.relatedCustomer.href,
      };
      tempArr[index] = shortShipment;
      setShipmentArr(tempArr);
    });
  }

  function addShipment(shipment: IDetailedShipment) {
    postShipment(shipment).then((res) => {
      const tempArr = [...shipmentArr];
      const shortShipment: IShipment = {
        id: res.id,
        status: res.status,
        carrier: res.carrier,
        orderId: res.orderId,
        orderHref: res.orderHref,
        relatedCustomerId: res.relatedCustomerId,
        relatedCustomerHref: res.relatedCustomerHref,
      };
      console.log(shortShipment);
      tempArr.push(shortShipment);
      setShipmentArr(tempArr);
    });
  }

  if (loading) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <>
        <Head setNotCreating={setNotCreating}></Head>
        <Routes>
          <Route path="/" element={<Navigate to="shipmentTracking" />}></Route>
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
                  deleteFromShipmentArr={deleteFromShipmentArr}
                  setDetailsNotEdit={setDetailsNotEdit}
                />
              ) : (
                <EditShipment
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
}
