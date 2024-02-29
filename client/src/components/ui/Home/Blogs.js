"use client";

import useGetPublic from "@/hooks/useGetPublic";
import BlogCard from "./BlogCard";
import { useEffect, useState } from "react";



const Blogs = () => {



    //States
    const [searchString, setSearchString] = useState('');

    //Pagination
    const blogsPerPage = 6;
    const { data: blogCount } = useGetPublic(["blogCount"], `/api/blogs/total`);
    const totalPages = Math.ceil(blogCount?.total / blogsPerPage) || 0;
    const [currentPage, setCurrentPage] = useState(0);
    const pages = [...Array(totalPages).keys()];

    const { data: blogs, isPending, refetch } = useGetPublic(["blogs"], `/api/blogs?search=${searchString}&page=${currentPage}&limit=${blogsPerPage}`);


    //Refetch data after user action
    useEffect(() => {
        refetch();
    }, [searchString, currentPage]);



    return <div className="container mx-auto mt-5 lg:mt-20 px-5">
        <h3 className="text-center text-3xl font-medium  uppercase">Blog Posts</h3>

        {/* Search field */}
        <div className="flex justify-center my-10">
            <input onChange={(e) => setSearchString(e.target.value)} className="border-2 font-semibold placeholder:font-normal border-slate-400 w-3/4 lg:w-1/2 px-5 py-3 rounded-lg outline-none" type="search" placeholder="Search by title..." />
        </div>

        {/* Blog post render */}
        {
            isPending ? <div className="flex justify-center my-20">
                <span className="loading loading-spinner text-primary"></span>
            </div>
                :
                <div className="mt-10">
                    {
                        blogs?.length > 0 ? <div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {
                                    blogs?.map(blog => <BlogCard blog={blog} key={blog._id} />)
                                }
                            </div>

                            {/* Pagination */}

                            <div className={`text-center ${searchString && "hidden"}`}>

                                <div className=" mt-14  join">
                                    <button onClick={() => {
                                        if (currentPage > 0) {
                                            setCurrentPage(currentPage - 1);
                                        }
                                    }} className="join-item btn">«</button>

                                    {
                                        pages?.map(page => {

                                            return <button key={page}
                                                className={`join-item btn ${currentPage === page && "bg-blue-600 hover:text-black text-white"}`}
                                                onClick={() => setCurrentPage(page)}
                                            >{page}</button>
                                        })
                                    }
                                    <button onClick={() => {
                                        if (currentPage < pages.length - 1) {
                                            setCurrentPage(currentPage + 1);
                                        }
                                    }} className="join-item btn">»</button>
                                </div>

                            </div>





                        </div>
                            :
                            <div className="text-center my-20">
                                <h3 className="font-semibold text-gray-500 text-xl">No blog post found!</h3>
                            </div>
                    }

                </div>
        }





    </div>
}

export default Blogs