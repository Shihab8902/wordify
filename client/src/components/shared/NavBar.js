"use client";

import { UserContext } from "@/context/AuthContext";
import Link from "next/link";
import { useContext } from "react";
import { IoPersonAdd } from "react-icons/io5";

const NavBar = () => {

    //Get the user status
    const { user } = useContext(UserContext);

    const navLinks = [
        {
            route: "Home",
            pathname: "/"
        },
        {
            route: "About",
            pathname: "/about"
        },
        {
            route: "Contact",
            pathname: "/contact"
        }
    ]


    return (
        <div className="navbar bg-base-100 p-5">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {
                            navLinks?.map(link => <li key={link.pathname}><Link href={link.pathname}>{link.route}</Link></li>)
                        }
                    </ul>
                </div>
            </div>
            <div className="navbar-center">
                <Link href="/" className="btn btn-ghost text-xl md:text-2xl">Wordify</Link>
            </div>
            <div className="navbar-end">
                {
                    user ?
                        <Link href="/dashboard/compose"> <button className="bg-blue-600 text-white px-6 py-3 rounded-md text-sm font-medium">Dashboard</button></Link>

                        :
                        <Link href="/login"> <button className="text-xl"> <IoPersonAdd /></button></Link>
                }
            </div>
        </div>
    )
}

export default NavBar