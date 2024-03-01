"use client";


import PrivateRoute from "@/components/shared/PrivateRoute";
import UserProfile from "@/components/ui/Dashboard/UserProfile";
import { UserContext } from "@/context/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import { CgMenuLeftAlt } from "react-icons/cg";
import { FaPencilAlt, FaRegListAlt } from "react-icons/fa";
import { FaList, FaUsers } from "react-icons/fa6";
import { IoIosJournal } from "react-icons/io";


const DashboardLayout = ({ children }) => {
    const { user } = useContext(UserContext);

    const pathname = usePathname();


    const navLinks = <>

        <li className={`font-semibold text-lg mb-5 ${pathname === "/dashboard/compose" ? "bg-blue-600 text-white" : "bg-gray-100 text-black"} rounded-lg`}>  <Link href="/dashboard/compose">< FaPencilAlt /> Compose Blog</Link></li>
        <li className={`font-semibold text-lg mb-5 ${pathname === "/dashboard/myBlogs" ? "bg-blue-600 text-white" : "bg-gray-100 text-black"} rounded-lg`}>  <Link href="/dashboard/myBlogs">< IoIosJournal /> My Blogs</Link></li>

        {
            user?.role === "admin" && <>
                <li className={`font-semibold text-lg mb-5 ${pathname === "/dashboard/manageBlogs" ? "bg-blue-600 text-white" : "bg-gray-100 text-black"} rounded-lg`}>  <Link href="/dashboard/manageBlogs">< FaList />Manage Blogs</Link></li>
                <li className={`font-semibold text-lg mb-5 ${pathname === "/dashboard/manageUsers" ? "bg-blue-600 text-white" : "bg-gray-100 text-black"} rounded-lg`}>  <Link href="/dashboard/manageUsers">< FaUsers />Manage Users</Link></li>
            </>
        }
    </>



    return <PrivateRoute>
        <div className="drawer lg:drawer-open bg-gray-100 container mx-auto">


            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content overflow-x-auto">
                {/* Drawer button */}
                <div className=" lg:hidden  p-3 flex justify-between items-center">
                    <label htmlFor="my-drawer-2" className="text-3xl drawer-button "><CgMenuLeftAlt /></label>
                    <UserProfile />
                </div>

                {/* Render Outlet */}
                <div className="m-4">
                    {children}
                </div>

            </div>
            {/* Drawer sidebar */}
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full z-30 bg-white shadow ">
                    <div className=" mb-10 flex items-center justify-between">
                        <Link href="/" className="btn btn-ghost text-xl md:text-2xl">Wordify</Link>

                        {/* User image and name */}
                        <div className="hidden lg:block">
                            <UserProfile />
                        </div>
                    </div>

                    {navLinks}




                </ul>


            </div>
        </div>
    </PrivateRoute>
}

export default DashboardLayout