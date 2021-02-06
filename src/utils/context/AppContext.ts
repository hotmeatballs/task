import { createContext } from 'react';
type ContextProps = {
    authenticated: boolean,
    setAuthenticated: (_:boolean) => void,
    profile: object,
    setProfile: (_:object) => void,
};
const AppContext = createContext(<Partial<ContextProps>>({}));


export default AppContext;
