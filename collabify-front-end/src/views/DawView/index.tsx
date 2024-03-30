import React from "react";
import styled from "styled-components";
import { PlaybackBar } from "./PlaybackBar";
import { blueGrey } from "@mui/material/colors";
import { LayersAndGrid } from "./LayersAndGrid";
import { PlayEngine } from "./PlayEngine";

const VerticalFlexLayout = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background: ${blueGrey["900"]};
`;

export const DawView: React.FC = () => {
  return (
    <VerticalFlexLayout>
      <PlaybackBar />
      <LayersAndGrid />
      <PlayEngine />
    </VerticalFlexLayout>
  );
};
