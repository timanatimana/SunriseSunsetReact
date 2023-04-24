import {
  ILocationData,
  ILocationDatas,
  ISunsetSunriseData,
} from "@/interfaces/api.interfaces";

export type SetLocaations = { type: "setlocatios"; payload: ILocationDatas };
export type SetPickedDate = { type: "setpickeddate"; payload: Date };
export type SetPickedLocation = {
  type: "setpickedlocation";
  payload: ILocationData;
};
export type SetError = {
  type: "seterror";
  payload: string;
};
export type SetSunriseSunset = {
  type: "setsunrisesunsetdata";
  payload: ISunsetSunriseData;
};

export type AppActions =
  | SetLocaations
  | SetPickedDate
  | SetPickedLocation
  | SetError
  | SetSunriseSunset;
