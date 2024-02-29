"use client"

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import useGetPublic from "@/hooks/useGetPublic";
import { GoDotFill } from "react-icons/go";
import { FaC, FaComments } from "react-icons/fa6";



const Banner = () => {

    //Get recent blogs
    const { data: blogs, isPending } = useGetPublic(["recent-blogs"], `/api/blog/recent`);




    return <div className="container mx-auto my-5 md:my-10 h-[220px] md:h-[500px]">
        {
            isPending ? <div className="skeleton w-full h-full"></div>
                :
                <div className="text-left w-full h-full">
                    <Carousel className="relative " showThumbs={false} autoPlay infiniteLoop>
                        {
                            blogs?.map(blog => {
                                const { image, category, publisher, publishDate, comments, title, content } = blog;

                                const slicedContent = content?.length > 160 ? content.slice(0, 160) + "..." : content;

                                return <div className="w-full h-[220px] md:h-[500px] lg:rounded-lg">
                                    <img src={image} className="w-full h-[500px] lg:rounded-lg" alt="image unavailable" />


                                    {/* Inner contents */}
                                    <div className="absolute top-0 left-0 w-full h-full bg-black lg:rounded-lg bg-opacity-50">

                                        <div className=" h-full px-5 text-white lg:px-20 flex flex-col justify-center">
                                            {/* Category */}
                                            <span className=" bg-blue-600 w-fit px-5 py-2 rounded font-medium shadow-lg  text-sm uppercase">{category}</span>
                                            {/* Additional info */}
                                            <div className="flex items-center my-5 gap-1 md:gap-3">
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
                                            <h3 className="text-lg md:text-2xl  font-semibold">
                                                {
                                                    title?.length > 50 ? title.slice(0, 50) + "..." : title
                                                }
                                            </h3>

                                            {/* Brief read */}
                                            <div className="mt-5 lg:w-1/2 text-sm leading-normal hidden md:block" dangerouslySetInnerHTML={{ __html: slicedContent }}>

                                            </div>

                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </Carousel>
                </div>

        }
    </div>
}

export default Banner