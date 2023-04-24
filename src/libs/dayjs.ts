import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

const dayJs = dayjs;

dayJs.extend(customParseFormat);
dayJs.extend(utc);
dayJs.extend(timezone);
dayJs.extend(LocalizedFormat);

export default dayJs;
