import { styled } from "@mui/system";
import { blueGrey } from "@mui/material/colors";
import {
  Button,
  ButtonBase,
  Checkbox,
  IconButton,
  Tooltip,
} from "@mui/material";

export const ControlButtonIconContainer = styled(IconButton)`
  display: flex;

  width: 24px;
  height: 24px;
  align-items: center;
  justify-content: center;
  background: ${blueGrey["900"]};
  border-radius: 5px;

  box-shadow:
    0 4px 2px 0 rgba(0, 0, 0, 0.2),
    0 2px 4px 0 rgba(0, 0, 0, 0.19);
`;

export const ControlButtonBaseContainer = styled(ButtonBase)`
  display: flex;

  width: 24px;
  height: 24px;
  align-items: center;
  justify-content: center;
  background: ${blueGrey["900"]};
  border-radius: 5px;

  box-shadow:
    0 4px 2px 0 rgba(0, 0, 0, 0.2),
    0 2px 4px 0 rgba(0, 0, 0, 0.19);
`;
