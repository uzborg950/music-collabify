import React, { forwardRef } from "react";
import { green } from "@mui/material/colors";

type PlayTickerProps = {
  gridCol: string;
  gridRow: string;
  translateX: string;
};

export const GridPlayTicker = forwardRef<
  HTMLDivElement | null,
  PlayTickerProps
>(({ gridCol, gridRow, translateX }, ref) => {
  return (
    <div
      id={"ticker-line"}
      style={{
        //vanilla css is faster than styled components
        gridColumn: gridCol,
        gridRow: gridRow,
        width: `2px`,
        background: green["A100"],
        transform: `translateX(${translateX})`,
        boxShadow: `-10px 0px 30px 1px ${green["A200"]}`, //commented out for smoother performance
      }}
      ref={ref}
    />
  );
});
