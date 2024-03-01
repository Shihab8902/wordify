"use client";

import { UserContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useContext } from "react";


const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(UserContext);

    const router = useRouter();

    if (loading) {
        return <div className="flex justify-center my-20">
            <span className="loading loading-spinner text-primary"></span>
        </div>
    }

    if (user) {
        return children;
    }

    return router.push("/login");
}

export default PrivateRoute