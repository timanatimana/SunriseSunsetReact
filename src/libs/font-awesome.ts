import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import {
  faGlobe,
  faCheck,
  faXmark,
  faHandPointRight,
  faSun,
  faArrowsUpToLine,
  faArrowsDownToLine,
  faRuler,
  faPizzaSlice,
} from "@fortawesome/free-solid-svg-icons";

// seems not to work
library.add(
  faGlobe,
  faCheck,
  faXmark,
  faHandPointRight,
  faSun,
  faArrowsUpToLine,
  faArrowsDownToLine,
  faRuler,
  faArrowsDownToLine,
  faPizzaSlice,
  fas,
  fab,
  far
);

export { FontAwesomeIcon };
