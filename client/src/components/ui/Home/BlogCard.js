import { FaComments } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
import Link from "next/link";


const BlogCard = ({ blog }) => {



    const { image, publishDate, publisher, comments, title, _id } = blog;

    // Initialize aos
    useEffect(() => {
        AOS.init({
            duration: 800
        })
    }, []);

    return <Link href={`/blog/${_id}`}>

        <div data-aos="fade-up" className="border pb-5 hover:shadow-lg rounded cursor-pointer">
            <img className="w-full h-64 aspect-square rounded-tl rounded-tr" src={image} alt="image unavailable" />

            <div className="px-2">

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

            </div>
        </div>

    </Link>
}

export default BlogCard