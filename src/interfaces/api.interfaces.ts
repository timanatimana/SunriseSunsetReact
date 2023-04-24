export interface ILocationData {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  region: string;
  country: string;
  continent: string;
  label: string;
  timezoneString: string;
}

export type IDDLocationData = Omit<
  ILocationData,
  "latitude" | "longitude" | "label" | "timezoneString"
>;

export type ILocationDatas = ILocationData[];

// for drop down control of locations
export type IDDLocationDatas = IDDLocationData[];

export enum Timezone {
  UTC = 1,
  CEST = 2,
  CET = 3,
}

export interface ISunsetSunriseData {
  sunrise: string;
  sunset: string;
  firstLight: string;
  lastLight: string;
  dawn: string;
  dusk: string;
  solarNoon: string;
  goldenHour: string;
  dayLength: string;
  timezone: Timezone;
  timezoneString: string;
  dateString: string;
  locationName?: string;
}

export interface ICoordinates {
  latitude: number;
  longitude: number;
}

export interface ISunsetSunriseReqData {
  coordinates: ICoordinates;
  timezone: Timezone;
  dateString: string;
}
