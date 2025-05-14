import React, { useState } from 'react'
import {toast} from 'react-hot-toast'
import useAuthContext from '../hooks/useAuthContext.js';

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const { authUser, setAuthUser } = useAuthContext();

    const logout = async (_id) => {
        setLoading(true);
        _id = authUser._id
        try {
            const res = await fetch("/api/auth/logout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({_id})
            });

            const data = res.json();

            if(data.error) {
                throw new Error(data.error);
            }

            localStorage.removeItem("chat-user");
            setAuthUser(null);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return {loading, logout}
}

export default useLogout;