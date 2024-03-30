import { styled } from "@mui/system";
import { blueGrey, orange, grey, yellow } from "@mui/material/colors";
import React from "react";

const Container = styled("div")`
  width: 100%;
  height: 30px;
  background: ${blueGrey["800"]};
  border-top: 1px solid ${grey["900"]};
  border-bottom: 1px solid ${grey["900"]};
  border-right: 2px solid ${(props) => props.theme.palette.background.default};

  z-index: 4; //See collabify-front-end/reference/zIndexGrid.md
  position: sticky;
  top: 0;
  left: 0;
`;
type NavigationBarProps = {};
export const NavigationBar: React.FC<NavigationBarProps> = () => {
  return <Container id={"left nav bar"}></Container>;
};
