import { useAxios } from "@/hooks/useAxios";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@/libs/font-awesome";
import {
  faCheck,
  faGlobe,
  faHandPointRight,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Nullable } from "@/types/common.types";
import { store } from "@/store/store";
import {
  IDDLocationDatas,
  ILocationData,
  ILocationDatas,
} from "@/interfaces/api.interfaces";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  sendDate: (date: Date) => void;
  sendLocationId: (id: number) => void;
}

const Location = (props: Props) => {
  const [state, dispatch] = useContext(store);

  const [locationValid, setLocationValid] = useState<Nullable<boolean>>(null);
  const [locationError, setLocationError] = useState(null);
  const [location, setLocation] = useState<string>("");
  const [dd_locations, setDD_Locations] = useState<IDDLocationDatas>([]);
  const [date, setDate] = useState(state.pickedDate);
  const [selectedLocationId, setSelectedLocationId] =
    useState<Nullable<number>>(null);

  const [data, error, loading, fetchData] = useAxios();

  const getLocation = async () => {
    await fetchData({
      method: "POST",
      url: `/Positionstack?location=${location}`,
    });
  };

  const setPickedDate = async (date: Nullable<Date>) => {
    if (date) {
      setDate(date);
      props.sendDate(date);
    }
  };

  const onChangeLocation = (e: ChangeEvent<HTMLInputElement>) => {
    const location = e.target.value;
    setLocation(location);
  };

  const onChangeSelected = (e: ChangeEvent<HTMLSelectElement>) => {
    const dd_locationId = parseInt(e.target.value);
    setSelectedLocationId(dd_locationId);
    props.sendLocationId(dd_locationId);
  };

  useEffect(() => {
    if (location.length === 0) {
      setLocationValid(null);
    } else if (location.length > 3) {
      setLocationValid(true);
    } else {
      setLocationValid(false);
    }
  }, [location]);

  const LocationInputValidation = () => {
    if (locationValid === null) {
      return <span className="icon is-small is-right"></span>;
    } else if (!locationValid) {
      return (
        <span className="icon is-small is-right has-text-danger-dark">
          <FontAwesomeIcon icon={faXmark} />
        </span>
      );
    }
    return (
      <span className="icon is-small is-right has-text-success-dark">
        <FontAwesomeIcon icon={faCheck} />
      </span>
    );
  };

  useEffect(() => {
    if (data) {
      setLocationError(null);
      const locations = data.filter(
        (d: ILocationData) => d.latitude != null && d.longitude != null
      ) as ILocationDatas;

      dispatch({ type: "setlocatios", payload: locations });

      setDD_Locations(
        locations.map((l) => ({
          id: l.id,
          name: l.name,
          region: l.region,
          continent: l.continent,
          country: l.country,
        }))
      );

      setSelectedLocationId(1);
      props.sendLocationId(1);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setLocationError(error);
      return;
    }
  }, [error]);

  const DropDownLocations = () => {
    if (selectedLocationId) {
      return (
        <select
          value={selectedLocationId}
          onChange={(e) => onChangeSelected(e)}
        >
          {dd_locations.map((l) => (
            <option value={l.id} key={l.id}>
              {Object.values(l)
                .filter(
                  (v) => v != null && typeof v == "string" && v.length > 0
                )
                .join(", ")}
            </option>
          ))}
        </select>
      );
    }
    return (
      <select>
        <option></option>
      </select>
    );
  };

  const Paragraph = () => {
    if (locationValid !== null && !locationValid) {
      return (
        <p className="help is-danger">
          Please enter a valid location (min 3 letters)
        </p>
      );
    } else if (locationError !== null) {
      return <p className="help is-danger">{locationError}</p>;
    }
    return <p>&nbsp;</p>;
  };

  const myComponentClasses = classNames({
    input: true,
    "is-danger": locationValid !== null && !locationValid,
    "is-success": locationValid !== null,
  });

  const buttonClasses = classNames({
    "button is-small is-success mt-1": true,
    "is-loading": loading,
  });

  return (
    <div>
      <div className="field columns is-tablet">
        <div className="column is-three-quarters">
          <span className="icon is-small is-left">
            <FontAwesomeIcon icon={faGlobe} />
            <label className="label is-expanded pl-2">Location</label>
          </span>
          <div className="field is-grouped">
            <p className="control is-expanded has-icons-right">
              <input
                value={location}
                onChange={onChangeLocation}
                className={myComponentClasses}
                type="text"
                placeholder="Text input"
              />
              <LocationInputValidation />
            </p>
          </div>
          <Paragraph />
        </div>
        <div className="column is-align-self-center mb-2">
          <p className="control">
            <button
              onClick={getLocation}
              disabled={!locationValid || locationValid == null}
              className={buttonClasses}
            >
              Find location
            </button>
          </p>
        </div>
      </div>

      <div className="field">
        <span className="icon is-small is-left">
          <FontAwesomeIcon icon={faHandPointRight} />
          <label className="label label-lg pl-2">Pick location: </label>
        </span>
        <div className="control">
          <div className="select is-small">
            <DropDownLocations />
          </div>
        </div>
        <div className="field mt-5">
          <span className="icon is-small is-left">
            <FontAwesomeIcon icon={faHandPointRight} />
            <label className="label label-lg pl-2">Pick date: </label>
          </span>
          <DatePicker
            dateFormat="dd/MM/yyyy"
            selected={date}
            onChange={(date) => setPickedDate(date)}
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
          />
        </div>
      </div>
    </div>
  );
};

export { Location };
