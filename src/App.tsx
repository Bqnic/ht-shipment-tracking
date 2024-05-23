import { Navigate, Route, Routes } from "react-router-dom";
import Tracking from "./Tracking.tsx";
import DetailedShipment from "./DetailedShipment.tsx";

export default function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="shipmentTracking/"></Navigate>}
        ></Route>
        <Route path="shipmentTracking" element={<Tracking></Tracking>} />
        <Route path="/shipmentTracking/:id" element={<DetailedShipment />} />
      </Routes>
    </>
  );
}
