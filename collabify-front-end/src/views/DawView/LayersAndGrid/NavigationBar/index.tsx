import { styled } from "@mui/system";
import { blueGrey, orange, grey, yellow } from "@mui/material/colors";
import React from "react";

const Container = styled("div")`
  width: 100%;
  height: 30px;
  background: ${grey["900"]};
  border-bottom: 1px solid ${(props) => props.theme.palette.background.default};
  border-right: 2px solid ${(props) => props.theme.palette.background.default};

  z-index: 1;
  position: sticky;
  top: 0;
  left: 0;
`;
type NavigationBarProps = {};
export const NavigationBar: React.FC<NavigationBarProps> = () => {
  return <Container id={"left nav bar"}></Container>;
};
