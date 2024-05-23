import { useNavigate } from "react-router-dom";

export default function Head() {
  const navigate = useNavigate();

  return (
    <div className="head">
      <p>Shipment & Tracking</p>
      <div className="head-btn">
        <button onClick={() => navigate("/shipmentTracking")}>Dashboard</button>
        <button>Graph</button>
      </div>
    </div>
  );
}
