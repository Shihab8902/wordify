"use client";

import { UserContext } from "@/context/AuthContext"
import { useRouter } from "next/navigation";
import { useContext } from "react"
import Swal from "sweetalert2";

const UserProfile = () => {
    const { user, logOutUser } = useContext(UserContext);

    const router = useRouter();

    //Handle user log out
    const handleUserLogOut = () => {
        Swal.fire({
            title: "Logout?",
            text: "Are you sure want to logout?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm"
        }).then(result => {
            if (result.isConfirmed) {
                logOutUser();
                router.push("/");
                Swal.fire({
                    icon: "success",
                    text: "You are logged out!",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        })
    }



    return <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
                <img alt="user" src="https://res.cloudinary.com/dvwwkobql/image/upload/v1709224308/d4ry1uogwqltbbobia8i.jpg" />
            </div>
        </div>
        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li className="text-center font-semibold">{user?.name}</li>
            <li className="text-center text-xs text-gray-400">{user?.email}</li>

            <button onClick={handleUserLogOut} className="bg-red-600 px-5 w-full py-2 mt-4 font-semibold text-white rounded-lg">Logout</button>
        </ul>
    </div>

}

export default UserProfile