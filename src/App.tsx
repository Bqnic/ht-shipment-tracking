import { Navigate, Route, Routes } from "react-router-dom";
import Tracking from "./Tracking.tsx";

export default function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="shipmentTracking"></Navigate>}
        ></Route>
        <Route path="shipmentTracking" element={<Tracking></Tracking>} />
        <Route path="shipmentTracking/{id}" element={<Tracking></Tracking>} />
      </Routes>
    </>
  );
}
