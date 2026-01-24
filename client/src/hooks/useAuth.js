import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function useAuth() {
     const { accessToken } = useContext(UserContext);
     const options = {
        headers: {
            'X-Authorization': accessToken,
        }
    }

     return {
        accessToken,
        options,
     }
}
