import React, { createContext, useContext } from "react";
import { ToneJSAction, ToneJSState } from "../reducer/toneJSReducer";

type Context = {
  state: ToneJSState;
  dispatch: React.Dispatch<ToneJSAction>;
};
export const CustomToneJSContext = createContext<Context | undefined>(
  undefined,
);

export const useCustomToneJSContext = () => useContext(CustomToneJSContext);
