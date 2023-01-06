import AccelerationSVG from "../assets/acceleration.svg";
import ExchangeSVG from "../assets/exchange.svg";
import ForceSVG from "../assets/force.svg";
import GasolineSVG from "../assets/gasoline.svg";
import EnergySVG from "../assets/energy.svg";
import HybridSVG from "../assets/hybrid.svg";
import PeopleSVG from "../assets/people.svg";
import SpeedSVG from "../assets/speed.svg";
import CarSVG from "../assets/car2.svg";

const getAccessoryIcon = (type: string) => {
  switch (type) {
    case "speed":
      return SpeedSVG;
    case "acceleration":
      return AccelerationSVG;
    case "turning_diameter":
      return ForceSVG;
    case "gasoline_motor":
      return GasolineSVG;
    case "exchange":
      return ExchangeSVG;
    case "eletric_motor":
      return EnergySVG;
    case "hybrid_motor":
      return HybridSVG;
    case "seats":
      return PeopleSVG;
    default:
      return CarSVG;
  }
};
export default getAccessoryIcon;
