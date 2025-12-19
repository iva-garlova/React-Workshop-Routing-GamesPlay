import { createContext } from "react";

export const UserContext = createContext({
_id: '',
email: '',
userName: '', 
accessToken: '',
userLoginHandler: () => null,
});