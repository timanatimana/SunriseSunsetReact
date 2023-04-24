import { useAxios } from "@/hooks/useAxios";
import { useContext, useEffect, useState } from "react";
import classNames from "classnames";
import { Location } from "@/components/Location";
import { store } from "@/store/store";
import {
  ICoordinates,
  ILocationData,
  ISunsetSunriseReqData,
  Timezone,
} from "@/interfaces/api.interfaces";
import { Nullable, Undefined } from "@/types/common.types";
import dayJs from "@/libs/dayjs";

const Input = () => {
  const [state, dispatch] = useContext(store);

  const [date, setDate] = useState<Nullable<Date>>();
  const [location, setLocation] = useState<Undefined<ILocationData>>();
  const [selectedLocationId, setSelectedLocationId] =
    useState<Nullable<number>>(null);

  const [data, error, loading, fetchData] = useAxios();

  const getSunriseSunset = async () => {
    const location = state.locations.find((l) => l.id === selectedLocationId);
    setLocation(location);
    if (location !== undefined) {
      const coordinates: ICoordinates = {
        latitude: location.latitude,
        longitude: location.longitude,
      };

      const payload: ISunsetSunriseReqData = {
        coordinates: coordinates,
        dateString: date ? date.toISOString() : dayJs().toISOString(),
        timezone: Timezone.UTC,
      };

      await fetchData({
        method: "POST",
        url: "/SunriseSunset",
        data: payload,
      });
    }
  };

  const sendDate = (date: Date) => {
    setDate(date);
  };

  const sendLocationId = (id: number) => {
    setSelectedLocationId(id);
  };

  const buttonClasses = classNames({
    "button is-link is-purple": true,
    "is-loading": loading,
  });

  useEffect(() => {
    if (data && location) {
      dispatch({ type: "seterror", payload: null });
      dispatch({
        type: "setsunrisesunsetdata",
        payload: {
          ...data,
          locationName: `${location.name} (${location.country})`,
          timezoneString: location.timezoneString,
        },
      });
      dispatch({
        type: "setpickedlocation",
        payload: {
          ...location,
        },
      });
      dispatch({ type: "setpickeddate", payload: date });
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      dispatch({ type: "seterror", payload: error });
      return;
    }
  }, [error]);

  return (
    <div className="row">
      <div className="card has-background-light">
        <div className="card-content">
          <Location
            sendDate={sendDate}
            sendLocationId={sendLocationId}
          ></Location>
          <div className="field is-grouped mt-3">
            <div className="control">
              <button
                onClick={getSunriseSunset}
                disabled={selectedLocationId === null || date === null}
                className={buttonClasses}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Input };
