import { ROUTES } from "./constants";
import RealTimeTrain from "./RealTimeTrain";

export default function Trains() {
  return (
    <>
      {ROUTES.map((route, index) => (
        <RealTimeTrain key={index} route={route} />
      ))}
    </>
  );
}
