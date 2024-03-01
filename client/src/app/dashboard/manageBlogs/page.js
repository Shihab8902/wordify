"use client";


import { UserContext } from "@/context/AuthContext";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useGetSecure from "@/hooks/useGetSecure";
import Link from "next/link";
import { useContext } from "react";

import { FaComments, FaTrash } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import Swal from "sweetalert2";

const ManageBlogsPage = () => {

    const { user } = useContext(UserContext);



    //Get own blogs
    const { data: blogs = [], isPending, refetch } = useGetSecure([user?.email, "all-blogs"], `/api/admin/blogs`);


    const axiosSecure = useAxiosSecure();


    //Handle blog delete
    const handleBlogDelete = id => {
        Swal.fire({
            title: "Delete?",
            text: "Are you sure want to delete the blog?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        })
            .then(result => {
                if (result.isConfirmed) {
                    axiosSecure.delete(`/api/blog?id=${id}`)
                        .then(res => {
                            if (res.data?.message) {
                                Swal.fire({
                                    icon: "success",
                                    text: "Blog deleted successfully!",
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
        <h3 className="text-center font-semibold text-xl uppercase">Manage Blogs</h3>

        {
            isPending ? <div className="flex justify-center my-20">
                <span className="loading loading-spinner text-primary"></span>
            </div>
                :
                blogs?.length > 0 ? <div className="grid lg:grid-cols-2 gap-6 mt-8">
                    {
                        blogs.map(blog => {

                            const { image, publishDate, publisher, comments, title, _id } = blog;

                            return <div className="border pb-5 hover:shadow-lg rounded ">
                                <img className="w-full h-64 aspect-square rounded-tl rounded-tr" src={image} alt="image unavailable" />

                                <div className="px-2">

                                    {/* Action buttons */}
                                    <div className="flex justify-end w-full gap-2 mt-1">

                                        <button onClick={() => handleBlogDelete(_id)} className="text-red-600 text-lg" ><FaTrash /></button>
                                    </div>

                                    <Link className=" cursor-pointer" href={`/blog/${_id}`}>
                                        {/* Additional information */}
                                        <div className="flex items-center mt-5 mb-3 gap-1 md:gap-3 text-gray-500 ">
                                            <div className="flex items-center gap-1">
                                                <img className="!w-10 h-10 rounded-full" src="https://res.cloudinary.com/dvwwkobql/image/upload/v1709224308/d4ry1uogwqltbbobia8i.jpg" alt={publisher} />
                                                {/* For mobile */}
                                                <p className="font-semibold  uppercase md:hidden text-sm">
                                                    {
                                                        publisher?.length > 6 ? publisher.slice(0, 6) + "..." : publisher
                                                    }
                                                </p>

                                                {/* For desktop */}
                                                <p className="font-semibold hidden md:block uppercase text-sm">
                                                    {publisher}
                                                </p>
                                            </div>

                                            <GoDotFill />

                                            <div>
                                                <p className="font-medium text-sm">{publishDate}</p>
                                            </div>

                                            <GoDotFill />

                                            <div className="flex items-center gap-1">
                                                <FaComments className="text-xl" />
                                                <span className="text-xs">{comments?.length}</span>
                                            </div>

                                        </div>

                                        {/* title */}
                                        <h3 className="text-lg md:text-2xl  font-semibold text-gray-600">
                                            {
                                                title?.length > 50 ? title.slice(0, 50) + "..." : title
                                            }
                                        </h3>
                                    </Link>



                                </div>
                            </div>


                        })
                    }



                </div> :

                    <div className="my-20">
                        <p className="text-2xl  font-bold text-gray-500 text-center">No blog posts found!</p>
                    </div>
        }


    </div>
}

export default ManageBlogsPage