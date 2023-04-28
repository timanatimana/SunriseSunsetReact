import { useContext } from "react";
import dayJs from "@/libs/dayjs";
import { FontAwesomeIcon } from "@/libs/font-awesome";
import {
  faArrowsDownToLine,
  faArrowsUpToLine,
  faPizzaSlice,
  faRuler,
  faSun,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { store } from "@/store/store";
import ReactLogo from "@/assets/react.svg";
import ViteLogo from "@/assets/vite.svg";
import TSLogo from "@/assets/ts_logo.svg";

const Output = () => {
  const [state] = useContext(store);

  const Header = () => {
    if (state.pickedLocation && state.sunriseSunsetData) {
      return (
        <p className="card-header-title">
          {state.sunriseSunsetData.locationName} - on &nbsp;
          {dayJs(state.sunriseSunsetData.dateString).format(
            "dddd, MMM D, YYYY"
          )}
        </p>
      );
    }
    return <p>&nbsp;</p>;
  };

  const SunriseLabel = () => {
    if (state.sunriseSunsetData) {
      return (
        <label className="label label-lg mb-5 pl-2">
          {dayJs
            .utc(
              dayJs(state.sunriseSunsetData.dateString).format("dd/MM/YY ") +
                state.sunriseSunsetData.sunrise,
              "dd/MM/YY HH:mm:ss"
            )
            .tz(state.sunriseSunsetData.timezoneString)
            .format("h:mm:ss A")}
        </label>
      );
    }
    return <label className="label label-lg mb-5 pl-2"></label>;
  };

  const SunsetLabel = () => {
    if (state.sunriseSunsetData) {
      return (
        <label className="label label-lg mb-5 pl-2">
          {dayJs
            .utc(
              dayJs(state.sunriseSunsetData.dateString).format("dd/MM/YY ") +
                state.sunriseSunsetData.sunset,
              "dd/MM/YY HH:mm:ss"
            )
            .tz(state.sunriseSunsetData.timezoneString)
            .format("h:mm:ss A")}
        </label>
      );
    }
    return <label className="label label-lg mb-5 pl-2"></label>;
  };

  const DayLengthLabel = () => {
    if (state.sunriseSunsetData) {
      return (
        <label className="label label-lg mt-5 pl-2">
          {dayJs(state.sunriseSunsetData.dayLength, "HH:mm:ss").format(
            "H:mm:ss"
          )}
        </label>
      );
    }
    return <label className="label label-lg mt-5 pl-2"></label>;
  };

  const SolarMoonLabel = () => {
    if (state.sunriseSunsetData) {
      return (
        <label className="label label-lg mt-5 pl-2">
          {dayJs
            .utc(
              dayJs(state.sunriseSunsetData.dateString).format("dd/MM/YY ") +
                state.sunriseSunsetData.solarNoon,
              "dd/MM/YY HH:mm:ss"
            )
            .tz(state.sunriseSunsetData.timezoneString)
            .format("h:mm:ss A")}
        </label>
      );
    }
    return <label className="label label-lg mt-5 pl-2"></label>;
  };

  const CardContent = () => {
    if (state.sunriseSunsetData) {
      return (
        <div className="columns is-mobile">
          <div className="column">
            <div className="field is-align-items-center is-grouped">
              <div className="field no-margin-bottom">
                <label className="label is-small">Sunrise: </label>
                <div>
                  <span className="icon is-small is-left">
                    <FontAwesomeIcon icon={faSun} />
                  </span>
                </div>
                <div>
                  <span className="icon is-small is-left">
                    <FontAwesomeIcon icon={faArrowsUpToLine} />
                    <SunriseLabel />
                  </span>
                </div>
              </div>
            </div>
            <div className="field is-align-items-center is-grouped">
              <div className="field no-margin-bottom">
                <label className="label is-small">Sunset: </label>
                <div>
                  <span className="icon is-small is-left">
                    <FontAwesomeIcon icon={faArrowsDownToLine} />
                  </span>
                </div>
                <div>
                  <span className="icon is-small is-left">
                    <FontAwesomeIcon icon={faSun} />
                    <SunsetLabel />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field is-align-items-center is-grouped">
              <div className="field no-margin-bottom">
                <label className="label is-small">Day length: </label>
                <div>
                  <span className="icon is-small is-left">
                    <FontAwesomeIcon icon={faSun} />
                    <DayLengthLabel />
                  </span>
                </div>
                <div>
                  <span className="icon is-small is-left">
                    <FontAwesomeIcon icon={faRuler} />
                  </span>
                </div>
              </div>
            </div>
            <div className="field is-align-items-center is-grouped">
              <div className="field no-margin-bottom">
                <label className="label is-small">Solar noon: </label>
                <div>
                  <span
                    data-tooltip="Solar noon is defined as when the sun is at the local meridian and is highest in the sky."
                    className="icon label-lg is-small is-left has-tooltip-multiline"
                  >
                    <FontAwesomeIcon icon={faSun} />
                    <SolarMoonLabel />
                  </span>
                </div>
                <div>
                  <span className="icon is-small is-left">
                    <FontAwesomeIcon icon={faPizzaSlice} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (state.error !== null) {
      return (
        <div className="notification is-mobile has-background-dark has-text-danger has-text-centered mt-5">
          <FontAwesomeIcon icon={faXmark} />
          <FontAwesomeIcon icon={faXmark} />
          <FontAwesomeIcon icon={faXmark} />
          <p>{state.error}</p>

          <FontAwesomeIcon icon={faXmark} />
          <FontAwesomeIcon icon={faXmark} />
          <FontAwesomeIcon icon={faXmark} />
        </div>
      );
    }
    return (
      <div className="notification is-mobile has-background-dark has-text-warning has-text-centered mt-5">
        <FontAwesomeIcon icon={faSun} />
        <FontAwesomeIcon icon={faSun} />
        <FontAwesomeIcon icon={faSun} />
        <p>Hello! Please pick a location and date to get information about</p>
        <p>sunrise, sunset, day's length, and solar noon.</p>
        <FontAwesomeIcon icon={faSun} />
        <FontAwesomeIcon icon={faSun} />
        <FontAwesomeIcon icon={faSun} />
      </div>
    );
  };

  return (
    <div className="card has-background-success mb-5">
      <header className="card-header">
        <div className="column">
          <div className="row has-background-dark has-text-light">
            <img className="ml-1 mr-2" alt="React logo" src={ReactLogo}></img>
            <img className="mr-2" alt="Vite logo" src={ViteLogo}></img>
            <img alt="TS logo" src={TSLogo}></img>
            <div>React - Vite - Typescript</div>
          </div>
          <Header />
        </div>
      </header>
      <div className="card-content">
        <CardContent></CardContent>
      </div>
    </div>
  );
};

export { Output };
