import { IUser } from "../models/user";
import { IProfile } from "../models/profile";

interface IAuthResponse {
  status: number;
  profile: IProfile | null;
  errorText?: string;
}

const checkCredentials = (users: IUser[], data: IUser): boolean => {
  return !!users.find(
    (x) => x.username === data.username && x.password === data.password
  );
};

export const authenticate = (users: IUser[], data: IUser): IAuthResponse => {
  if (!checkCredentials(users, data)) {
    return {
      status: 500,
      errorText: "Error",
      profile: null,
    };
  } else {
    const profile = {
      username: data.username,
      token: "123",
    };
    localStorage.setItem("auth", JSON.stringify(profile));
    return {
      status: 200,
      profile,
    };
  }
};
export const checkAuth = (): IAuthResponse => {
  const profile = JSON.parse(localStorage.getItem("auth") as string);
  if (profile) {
    return {
      status: 200,
      profile,
    };
  } else {
    return {
      status: 500,
      errorText: "Error",
      profile: null,
    };
  }
};
