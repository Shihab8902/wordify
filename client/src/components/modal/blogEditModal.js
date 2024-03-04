import { IoMdClose } from "react-icons/io";
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import { useEffect, useState } from "react";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Swal from "sweetalert2";



const BlogEditModal = ({ isModalOpen, setIsModalOpen, data, refetch }) => {

    //States
    const [newContent, setNewContent] = useState('');

    const axiosSecure = useAxiosSecure();


    //Editor toolbars
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['blockquote', 'code-block'],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image', 'video'],
            ['clean'],
        ],
    };


    //Initialize editor 
    const { quill, quillRef } = useQuill({ modules, placeholder: "Start Writing..." });

    //Set editor value;
    useEffect(() => {
        quill?.clipboard.dangerouslyPasteHTML(data?.content);
        if (quill) {
            quill.on('text-change', () => {
                setNewContent(quillRef.current.firstChild.innerHTML);
            });
        }
    }, [quill]);


    //Handle blog edit
    const handleBlogEdit = () => {
        axiosSecure.put(`/api/blog?id=${data._id}`, { content: newContent })
            .then(res => {
                if (res.data === "success") {
                    Swal.fire({
                        icon: "success",
                        text: "Blog updated successfully!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                    setIsModalOpen(!isModalOpen);
                }
            })
    }





    return (
        <>
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center  ">
                    <div className="fixed inset-0 bg-black opacity-50 "></div>

                    <div className="z-50   relative rounded-lg shadow-lg  bg-white w-full md:w-1/2">
                        {/* Modal close button */}
                        <span className="absolute top-4 right-4 cursor-pointer text-2xl text-gray-500" onClick={() => setIsModalOpen(!isModalOpen)}>
                            <IoMdClose />
                        </span>

                        {/* Modal body */}
                        <div className="p-5   my-6">

                            <h3 className="text-center font-semibold text-lg text-gray-600 pb-2">Edit Blog Post</h3>
                            <hr />


                            {/* Text editor */}
                            <div className="w-full my-5 h-[300px] inline-block">
                                <div ref={quillRef} />
                            </div>

                            <button onClick={handleBlogEdit} className='w-full font-semibold mt-5 bg-blue-600 text-white py-3 disabled:bg-gray-200 disabled:text-black rounded-lg'>Update</button>

                        </div>

                    </div>
                </div>
            )}


        </>
    );
};

export default BlogEditModal;



