"use client";

import { UserContext } from "@/context/AuthContext";
import useGetPublic from "@/hooks/useGetPublic";
import { useContext, useEffect, useState } from "react";
import { FaComments, FaTrash } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";
import io from 'socket.io-client';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import CommentEditModal from "@/components/modal/CommentEditModal";

//Connect to the socket server
const socket = io.connect('ws://localhost:5000');



const BlogPage = ({ params }) => {

    const { user } = useContext(UserContext);
    const axiosSecure = useAxiosSecure();

    //Get blog data
    const { data: blog = {}, refetch, isPending } = useGetPublic([params, "blog"], `/api/blog?id=${params.blogId}`);

    const { image, publishDate, publisher, comments, title, category, content, videoLink, _id } = blog;

    //State
    const [userComments, setUserComments] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentlySelectedComment, setCurrentlySelectedComment] = useState({});

    //update the state of comments
    useEffect(() => {
        setUserComments(comments);
    }, [comments]);


    const handleCommentSubmit = e => {
        e.preventDefault();

        const comment = e.target.comment.value;


        const date = moment().format('YYYY-MM-DD');

        const commentData = {
            name: user.name,
            email: user.email,
            date,
            comment,
            id: uuidv4()
        }

        socket.emit('addComment', { postId: _id, newComment: { _id, comment: commentData } });
        e.target.reset();

    }


    //Handle socket io connection
    useEffect(() => {
        socket.on('commentAdded', (data) => {
            const { postId: updatedPostId, newComment } = data;
            if (updatedPostId === _id) {
                const newComments = [...userComments, newComment.comment];
                setUserComments(newComments);
                axiosSecure.put(`/api/blog?id=${_id}`, newComments);    //Store updated comments
            }
        });

        return () => {

            socket.off('commentAdded');
        };
    }, [handleCommentSubmit]);



    //Handle comment delete
    const handleCommentDelete = id => {
        Swal.fire({
            title: "Delete?",
            text: "Are you sure want to delete the comment?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                const remainingComments = userComments?.filter(com => com.id !== id);
                setUserComments(remainingComments);
                axiosSecure.put(`/api/blog?id=${_id}`, remainingComments)
                    .then(() => {
                        Swal.fire({
                            icon: "success",
                            text: "Comment deleted successfully!",
                            showConfirmButton: false,
                            timer: 1500
                        })
                    })
            }
        });
    }


    //Handle comment edit
    const handleCommentEdit = id => {
        const selectedComment = userComments?.find(c => c.id === id);
        setCurrentlySelectedComment(selectedComment);
        setIsModalOpen(!isModalOpen);
    }






    return <div className="container mx-auto px-5 my-10">
        {
            isPending ? <div className="skeleton w-full h-screen"></div>
                :

                // Blog Body
                <div>
                    <img className="h-[200px] md:h-[400px] w-full object-cover rounded-md" src={image} alt="image unavailable" />

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
                            <span className="text-xs">{userComments?.length}</span>
                        </div>

                    </div>

                    {/* Title */}
                    <h3 className="text-3xl font-medium ">{title}</h3>

                    {/* Category */}
                    <span className=" bg-blue-600 w-fit px-5 py-2 rounded font-medium shadow-lg  text-sm uppercase text-white my-5 block">{category}</span>

                    {/* Blog content */}
                    <div className="blog-content" dangerouslySetInnerHTML={{ __html: content }}></div>

                    {/* Video */}
                    <video className="h-[200px] md:h-[400px] mx-auto w-fit rounded-lg my-10 " muted src={videoLink} controls></video>

                    {/* Comments */}
                    <div>
                        <h3 className="text-2xl font-semibold mb-5">{userComments?.length} Comments</h3>
                        <form className="mb-10" onSubmit={handleCommentSubmit}>
                            <textarea name="comment" id="comment" className="border-2 rounded block w-full lg:w-1/2 h-32 outline-none resize-none p-3" placeholder="Leave a comment " required></textarea>
                            <button disabled={!user} type="submit" className="px-8 bg-blue-600 rounded text-white py-2 mt-3 font-semibold disabled:bg-gray-500 " >Submit </button>
                        </form>

                        <div>
                            {
                                userComments?.length > 0 ? userComments.map(comment => {
                                    const { name, date, comment: content, id, email } = comment;

                                    return <div key={id} className="lg:w-1/2 mt-5 border p-3 rounded">

                                        <div className="flex justify-between ">
                                            <div className="flex items-center gap-2">
                                                <img className="w-10 h-10 rounded-full" src="https://res.cloudinary.com/dvwwkobql/image/upload/v1709224308/d4ry1uogwqltbbobia8i.jpg" alt={name} />
                                                <h3 className="font-semibold">{name}</h3>
                                            </div>
                                            <p className="font-medium text-gray-500">{date}</p>

                                            {/* Action buttons */}
                                            <div className={`${user?.role === "admin" || email === user?.email ? "block" : "hidden"} flex items-center gap-3`}>
                                                <button className="text-green-600" onClick={() => handleCommentEdit(id)}><FaEdit /></button>
                                                <button className="text-red-600" onClick={() => handleCommentDelete(id)}><FaTrash /></button>
                                            </div>


                                        </div>
                                        <p className="px-4 mt-2">{content}</p>

                                    </div>


                                })

                                    :
                                    <p className="mt-10 text-lg font-semibold text-gray-500">No comments yet. Be the first to share your thoughts!</p>
                            }
                        </div>



                    </div>


                </div>
        }

        <CommentEditModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} postId={_id} setComments={setUserComments} comments={userComments} comment={currentlySelectedComment} />


    </div>




}

export default BlogPage