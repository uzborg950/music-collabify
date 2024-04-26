import React, { forwardRef } from "react";
import { styled } from "@mui/system";
import { green } from "@mui/material/colors";
import { PositionProps } from "../types";

type PlayTickerProps = {
  zIndex: number;
} & PositionProps;

const Container = styled("div")<{ zIndex: number }>`
  position: relative;
  z-index: ${(props) => props.zIndex};
`;
export const PlayTicker = forwardRef<HTMLDivElement | null, PlayTickerProps>(
  ({ top, left, height, zIndex }, ref) => {
    const fixed = {
      top: top.toFixed(1),
      left: left.toFixed(1),
      height: height.toFixed(0),
    };
    return (
      <Container zIndex={zIndex}>
        <div
          style={{
            //vanilla css is faster than styled components
            position: "absolute",
            // left: `${fixed.left}px`, translate is faster?
            top: `${fixed.top}px`,
            width: `2px`,
            height: `${fixed.height}px`,
            background: green["A100"],
            transform: `translateX(${fixed.left}px)`,
            boxShadow: `-10px 0px 30px 1px ${green["A200"]}`, //commented out for smoother performance
          }}
          className={"ticker-line"}
          ref={ref}
        />
      </Container>
    );
  },
);
