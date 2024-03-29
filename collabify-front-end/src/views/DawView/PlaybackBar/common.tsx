import {styled} from "@mui/system";
import {IconButton} from "@mui/material";

export const IconWrapper = styled(IconButton)<{ isPressed?: boolean }>`
  display: flex;
  width: 64px;
  height: 64px;
  border-radius: 8px;
  box-shadow:
    ${({ isPressed }) =>
      isPressed
        ? `0 2px 2px 0 rgba(0, 0, 0, 0.2),
    0 2px 2px 0 rgba(0, 0, 0, 0.19);`
        : `0 4px 6px 0 rgba(0, 0, 0, 0.2),
    0 2px 8px 0 rgba(0, 0, 0, 0.19);`} 

  justify-content: center;
  align-items: center;
`;