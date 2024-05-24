import { useNavigate } from "react-router-dom";
import { IHead } from "./assets/Interfaces";

export default function Head({ setNotCreating }: IHead) {
  const navigate = useNavigate();

  return (
    <div className="head">
      <p>Shipment & Tracking</p>
      <div className="head-btn">
        <button
          onClick={() => {
            setNotCreating(true);
            navigate("/shipmentTracking");
          }}
        >
          Dashboard
        </button>
        <button>Graph</button>
      </div>
    </div>
  );
}
