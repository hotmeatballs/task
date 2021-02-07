import {IUser} from '../models/user'
import {IProfile} from "../models/profile";

interface IAuthResponse {
    status: number;
    profile: IProfile | null;
    errorText?: string;
}

const checkCredentials = (users: IUser[], data: IUser): boolean => {
    return !!users.find(x => x.username === data.username && x.password === data.password);
}

export const authenticate = (users: IUser[], data: IUser): IAuthResponse => {
    console.log(data);
    if (!checkCredentials(users, data)) {
        return {
            status: 500,
            errorText: 'Error',
            profile: null,
        };
    } else {
        return {
            status: 200,
            profile: {
                username: data.username,
                token: '123'
            },
        };
    }
}
