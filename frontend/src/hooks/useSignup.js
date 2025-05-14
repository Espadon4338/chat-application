import { useState } from "react";
import { toast } from 'react-hot-toast';
import useAuthContext from "./useAuthContext";

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const signup = async ({username, display_name, password, confirm_password}) => {
        const success = validateInputs({username, display_name, password, confirm_password});
        if(!success)
            return;

        setLoading(true);
        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({username, display_name, password, confirm_password})
            })

            const data = await res.json();
            if(data.error) {
                throw new Error(data.error);   
            }

            localStorage.setItem("chat-user", JSON.stringify(data));
            setAuthUser(data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, signup };
}

export default useSignup;

const validateInputs = ({username, display_name, password, confirm_password}) => {
    console.log({username, display_name, password, confirm_password});
    if(!username || !display_name || !password || !confirm_password) {
        toast.error("Not all fields are filled");
        return false;   
    }

    if(password !== confirm_password) {
        toast.error("Passwords fo not match");
        return false;
    }

    if(password.length < 8) {
        toast.error("Password must be at least 8 characters long");
        return false;
    }

    if(display_name.length > 20) {
        toast.error("The display name cannot be greater than 20 charatcers long");
        return false;
    }

    return true;
}