import { useState } from "react";
import Head from "./Head";
import Selector from "./Selector";
import Shipments from "./Shipments";

export default function Tracking() {
  const [filter, setFilter] = useState("nofilter");

  return (
    <>
      <Head></Head>
      <Selector setFilter={setFilter}></Selector>
      <Shipments></Shipments>
    </>
  );
}
