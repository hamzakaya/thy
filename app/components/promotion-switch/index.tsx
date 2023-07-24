import { usePromotionStatus } from "@/app/store/promotion";
import React, { useState } from "react";

export default function PromotionSwitch() {
  const { status, toggle } = usePromotionStatus();

  return (
    <React.Fragment>
      <label className="flex cursor-pointer select-none items-center">
        <div className="relative">
          <input
            type="checkbox"
            checked={status}
            onChange={toggle}
            className="sr-only"
          />
          <div
            className={`box bg-primary block h-6 w-14 rounded-full ${
              status ? "bg-red-700" : "bg-gray-500"
            }`}
          ></div>
          <div
            className={`dot absolute left-1 top-1 flex h-4 w-6 items-center justify-center rounded-full transition  ${
              status ? "bg-white left-6" : "bg-white"
            }`}
          ></div>
        </div>
      </label>
    </React.Fragment>
  );
}
