import { ROUTES } from "./constants";
import RealTimeTrain from "./RealTimeTrain";
import { TimeReducerProps } from "./time-reducer";

export default function Trains(props: TimeReducerProps) {
  return (
    <>
      {ROUTES.map((route, index) => (
        <RealTimeTrain key={index} route={route} {...props} />
      ))}
    </>
  );
}
