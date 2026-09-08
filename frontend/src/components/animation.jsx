import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";

export default function InventoryAnimation() {
  return (
    <div>
      <Player
        autoplay
        loop
        src="/assets/ecommerceOrderFulfillmentAutomation.json" // path to your downloaded JSON
        style={{ height: "600px", width: "600px"}}
      />
    </div>
  );
}
