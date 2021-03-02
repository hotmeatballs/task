import { createContext } from "react";
import { IEvent } from "../../models/event";
import { IProfile } from "../../models/profile";
import { IUser } from "../../models/user";

export type AppContextState = {
  users: IUser[];
  profile: IProfile | null;
  setProfile: (value: IProfile | null) => void;
  events: IEvent[];
  setEvents: (value: IEvent[]) => void;
  logout: () => void;
};
const contextDefaultValues: AppContextState = {
  users: [],
  profile: null,
  setProfile: () => {},
  events: [],
  setEvents: () => {},
  logout: () => {},
};

const AppContext = createContext<AppContextState>(contextDefaultValues);
export default AppContext;
