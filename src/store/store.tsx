import {
  IDDLocationData,
  ILocationDatas,
  ISunsetSunriseData,
} from "@/interfaces/api.interfaces";
import { AppActions } from "@/types/action.types";
import { Nullable } from "@/types/common.types";
import { Props } from "@/types/react.types";
import React, { createContext, useReducer } from "react";
import dayJs from "@/libs/dayjs";

export interface IGlobalState {
  locations: ILocationDatas;
  pickedLocation: Nullable<IDDLocationData>;
  pickedDate: Nullable<Date>;
  sunriseSunsetData: Nullable<ISunsetSunriseData>;
  error: Nullable<string>;
}

const initialState: IGlobalState = {
  locations: [],
  sunriseSunsetData: null,
  pickedLocation: null,
  pickedDate: dayJs().toDate(),
  error: null,
};
const store = createContext<[IGlobalState, React.Dispatch<any>]>([
  { ...initialState },
  () => {},
]);
const { Provider } = store;

const StateProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(
    (state: IGlobalState, action: AppActions) => {
      switch (action.type) {
        case "setlocatios":
          return { ...state, locations: action.payload };
        case "setpickeddate":
          return { ...state, pickedDate: action.payload };
        case "setpickedlocation":
          return { ...state, pickedLocation: action.payload };
        case "seterror":
          return { ...state, error: action.payload };
        case "setsunrisesunsetdata":
          return { ...state, sunriseSunsetData: action.payload };
        default:
          return state;
      }
    },
    initialState
  );

  return <Provider value={[state, dispatch]}>{children}</Provider>;
};

export { store, StateProvider };
