import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import axios from "axios";
import Cookies from "js-cookie";

// Todo: validate the token on the server
export const validateToken = async () => {
    try {
        const token = Cookies.get("token");

        if (!token) {
            return false;
        }

        const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/validate-token`, {
            token,
        });

        if (response.data.success) {
            return true;
        }

        return false;
    } catch (error) {
        console.error(error);
        return false;
    }
}

const useAuth = () => {
    const isValid = validateToken();

    if (!isValid) {
        Cookies.remove("token");
    }

    return useContext(AuthContext);
}

export default useAuth;