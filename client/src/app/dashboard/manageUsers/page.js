"use client";

import useAxiosSecure from "@/hooks/useAxiosSecure";
import useGetSecure from "@/hooks/useGetSecure";
import { MdManageAccounts } from "react-icons/md";
import Swal from "sweetalert2";

const ManageUserPage = () => {

    const { data: users, isPending, refetch } = useGetSecure(["all-users"], `/api/users`);

    const axiosSecure = useAxiosSecure();



    //Handle admin promote
    const handleAdminPromote = (id, name) => {
        Swal.fire({
            title: "Promote?",
            text: `Are you sure want to promote ${name} as an admin?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm"
        })
            .then(result => {
                if (result.isConfirmed) {
                    axiosSecure.put(`/api/user?id=${id}`, { role: "admin" })
                        .then(res => {
                            if (res.data?.message === "success") {
                                Swal.fire({
                                    icon: "success",
                                    text: `${name} is now an admin!`,
                                    timer: 1500,
                                    showConfirmButton: false
                                });
                                refetch();
                            }
                        })
                }
            })
    }





    return <div className=" px-5 py-10 bg-white shadow rounded-lg min-h-screen">

        <h3 className="text-center font-semibold text-xl uppercase">Manage Users</h3>

        <div className="my-10">
            {
                isPending ? <div className="flex justify-center my-20">
                    <span className="loading loading-spinner text-primary"></span>
                </div>
                    :
                    users?.length > 0 ? <div className="overflow-x-auto">



                        <div className="overflow-x-auto">
                            <table className="table">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th>Sl.</th>
                                        <th>Profile</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Make Admin</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {users?.map((user, index) => {

                                        const { name, email, role, _id } = user;

                                        return <tr>

                                            <td className="font-semibold">{index + 1}</td>
                                            <td>
                                                <img src="https://i.ibb.co/FKyGxmB/gray-photo-placeholder-icon-design-ui-vector-35850819.webp" className="w-10 h-10 rounded-lg" alt="user" />
                                            </td>
                                            <td>
                                                <p className="text-xs font-semibold">{name}</p>
                                            </td>
                                            <td>
                                                <p className="text-xs font-semibold">{email}</p>
                                            </td>
                                            <td>
                                                <p className="text-xs font-semibold text-primary">{role}</p>
                                            </td>
                                            <td className="text-center">
                                                <button onClick={() => handleAdminPromote(_id, name)} disabled={user.role === "admin"} className="text-2xl disabled:text-gray-500 text-green-600"><MdManageAccounts /></button>
                                            </td>


                                        </tr>
                                    })}
                                </tbody>


                            </table>
                        </div>




                    </div> :
                        <div>
                            <h3 className="text-center my-20 text-gray-400 font-semibold text-3xl">No user found!</h3>
                        </div>
            }
        </div>


    </div>

}

export default ManageUserPage;