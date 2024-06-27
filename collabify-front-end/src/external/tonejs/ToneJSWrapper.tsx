import React, { useEffect, useReducer } from "react";
import { initState, toneJSReducer } from "./reducer/toneJSReducer";
import { CustomToneJSContext } from "./context";
import { useAppSelector } from "../../redux/hooks";
import { useToneJs } from "./useToneJs";

export const ToneJSWrapper: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(toneJSReducer, initState);
  useToneJs({ state, dispatch });
  return (
    <CustomToneJSContext.Provider value={{ state, dispatch }}>
      {children}
    </CustomToneJSContext.Provider>
  );
};
