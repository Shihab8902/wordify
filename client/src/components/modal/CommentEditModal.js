"use client";

import useAxiosSecure from "@/hooks/useAxiosSecure";
import { IoMdClose } from "react-icons/io";
import Swal from "sweetalert2";




const CommentEditModal = ({ isModalOpen, setIsModalOpen, comments, setComments, comment, postId }) => {

    const axiosSecure = useAxiosSecure();

    //handle comment update
    const handleCommentUpdate = async (e) => {
        e.preventDefault();
        const commentValue = e.target.comment.value;
        comment.comment = commentValue; //Set new value to the existing comment

        await setComments(comments);

        axiosSecure.put(`/api/blog?id=${postId}`, comments)
            .then(() => {
                Swal.fire({
                    icon: "success",
                    text: "Comment updated successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
                setIsModalOpen(!isModalOpen);

            })
    }



    return (
        <>
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center  ">
                    <div className="fixed inset-0 bg-black opacity-50 "></div>

                    <div className="z-50   relative rounded-lg shadow-lg  bg-[#ecf0f3] w-full md:w-1/2">
                        {/* Modal close button */}
                        <span className="absolute  top-4 right-4 cursor-pointer text-2xl text-gray-500" onClick={() => setIsModalOpen(!isModalOpen)}>
                            <IoMdClose />
                        </span>

                        {/* Modal body */}

                        <div className="mt-10 w-full p-5">
                            <h3 className="text-xl font-medium mb-3">Update Comment</h3>

                            <form className="mb-10 " onSubmit={handleCommentUpdate}>
                                <textarea defaultValue={comment.comment} name="comment" id="comment" className="border-2 w-full rounded block h-32 outline-none resize-none p-3" placeholder="Leave a comment " required></textarea>
                                <button type="submit" className="px-8 bg-blue-600 rounded text-white py-2 mt-3 font-semibold disabled:bg-gray-500 " >Update</button>
                            </form>
                        </div>

                    </div>
                </div>
            )}


        </>
    );
};

export default CommentEditModal;



