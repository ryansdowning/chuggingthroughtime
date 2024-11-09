import { Dispatch } from "react";

export type TimeState = {
  secondsSinceMidnight: number;
  paused: boolean;
};

export type TimeAction =
  | {
      type: "set-time";
      payload: { secondsSinceMidnight: number };
    }
  | {
      type: "increment-time";
      payload: { seconds: number };
    }
  | {
      type: "toggle-pause";
    }
  | {
      type: "set-pause";
      payload: { paused: boolean };
    };

function clampTime(seconds: number): number {
  return Math.max(Math.min(seconds, 86400), 0);
}

export function timeReducer(state: TimeState, action: TimeAction): TimeState {
  switch (action.type) {
    case "set-time":
      return {
        ...state,
        secondsSinceMidnight: clampTime(action.payload.secondsSinceMidnight),
      };
    case "increment-time":
      return {
        ...state,
        secondsSinceMidnight: clampTime(
          state.secondsSinceMidnight + action.payload.seconds
        ),
      };
    case "toggle-pause":
      return {
        ...state,
        paused: !state.paused,
      };
    case "set-pause":
      return {
        ...state,
        paused: action.payload.paused,
      };
    default:
      return state;
  }
}

export interface TimeReducerProps {
  timeState: TimeState;
  dispatchTime: Dispatch<TimeAction>;
}
