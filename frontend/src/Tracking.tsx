import Selector from "./Selector";
import MobileShipments from "./shipments/MobileShipments";
import { ITrackingComp } from "./assets/Interfaces";
import useViewport from "./assets/useViewport";
import DesktopShipments from "./shipments/DesktopShipments";

export default function Tracking({
  shipmentArr,
  deleteFromShipmentArr,
  setDetailsNotEdit,
  setNotCreating,
  filter,
  setFilter,
  subFilter,
  setSubFilter,
}: ITrackingComp) {
  const screenWidth = useViewport();

  return (
    <div className="tracking">
      <Selector
        setFilter={setFilter}
        setSubFilter={setSubFilter}
        filter={filter}
        subFilter={subFilter}
      ></Selector>
      <button
        id="adding-shipment"
        onClick={() => {
          setNotCreating(false);
        }}
      >
        +
      </button>
      {screenWidth < 900 ? (
        <MobileShipments
          shipmentArr={shipmentArr}
          deleteFromShipmentArr={deleteFromShipmentArr}
          setDetailsNotEdit={setDetailsNotEdit}
          filter={filter}
          subFilter={subFilter}
        />
      ) : (
        <DesktopShipments
          shipmentArr={shipmentArr}
          deleteFromShipmentArr={deleteFromShipmentArr}
          setDetailsNotEdit={setDetailsNotEdit}
          filter={filter}
          subFilter={subFilter}
        />
      )}
    </div>
  );
}
