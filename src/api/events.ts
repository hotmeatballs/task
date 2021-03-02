import { IEvent } from "../models/event";

interface IEventsResponse {
  status: number;
  events: IEvent[];
  errorText?: string;
}
export const getEvents = (): IEventsResponse => {
  const events = JSON.parse(localStorage.getItem("events") as string);
  if (events) {
    return {
      status: 200,
      events,
    };
  } else {
    return {
      status: 500,
      errorText: "Error",
      events: [],
    };
  }
};
export const updateEvents = (events: IEvent[]) => {
  localStorage.setItem("events", JSON.stringify(events));
};
