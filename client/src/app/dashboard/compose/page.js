"use client";

import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '@/context/AuthContext';
import moment from 'moment';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import { IoImagesOutline } from 'react-icons/io5';
import useAxiosPublic from '@/hooks/useAxiosPublic';

const ComposePage = () => {

    const { user } = useContext(UserContext);

    const axiosSecure = useAxiosSecure();
    const router = useRouter();
    const axiosPublic = useAxiosPublic();

    //States
    const [content, setContent] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedThumbnail, setSelectedThumbnail] = useState('');

    const [isUploading, setIsUploading] = useState(false);


    const imageHostingAPIKey = "1117f17309eeaf8ef62fb46d40b611b0";

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
        if (quill) {
            quill.on('text-change', () => {
                setContent(quillRef.current.firstChild.innerHTML);
            });
        }
    }, [quill]);



    //Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        setIsUploading(true);

        const date = moment().format('YYYY-MM-DD');

        //Check for editor body
        if (content?.length < 1) {
            setIsUploading(false)
            return Swal.fire({
                icon: "error",
                text: "Invalid blog body!"
            });
        }


        axiosPublic.post(`https://api.imgbb.com/1/upload?key=${imageHostingAPIKey}`, { image: selectedThumbnail }, {
            headers: {
                "content-Type": "multipart/form-data"
            }
        })
            .then(res => {
                if (res.data?.success) {
                    const imageURL = res.data?.data.display_url;
                    const blogData = {
                        title: e.target.title.value,
                        category: selectedCategory,
                        publisher: user.name,
                        publisherEmail: user.email,
                        publishDate: date,
                        comments: [],
                        content,
                        thumbnail: imageURL
                    }

                    axiosSecure.post("/api/blog", blogData)
                        .then(res => {
                            if (res.data === "success") {
                                setIsUploading(false);
                                Swal.fire({
                                    icon: "success",
                                    text: "Blog posted successfully!",
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                                router.push("/dashboard/myBlogs")
                            }
                        })
                        .catch(error => {
                            setIsUploading(false);
                            Swal.fire({
                                icon: "error",
                                title: "Error!",
                                text: error.message
                            });
                        });

                }
            })







    }


    return <div className="  px-5 py-10 bg-white shadow rounded-lg min-h-screen">

        <h3 className="text-center font-semibold text-xl uppercase">Compose a new Blog</h3>

        {/* Blog body form */}
        <form className="mt-10 max-w-[870px] mx-auto" onSubmit={handleSubmit}>

            <div className="flex items-center flex-col lg:flex-row justify-between gap-6">
                {/* Title */}
                <div className="w-full" >
                    <div>
                        <label htmlFor="title" className=" font-semibold ">Title</label>
                        <input className="w-full border py-3 px-5 rounded-lg mt-1 outline-none font-bold placeholder:font-normal" type="text" name="title" id="title" placeholder="Enter title" required minLength={2} />
                    </div>
                </div>


                {/* Category */}
                <div className="w-full">
                    <div>
                        <label htmlFor="title" className=" font-semibold ">Category</label>
                        <select onChange={(e) => setSelectedCategory(e.target.value)} className="w-full border py-3 cursor-pointer px-5 rounded-lg mt-1 outline-none font-bold" name="category" id="category" defaultValue="" required>
                            <option value="" disabled>Select a Category</option>
                            <option value="Technology">Technology</option>
                            <option value="Health">Health</option>
                            <option value="Travel">Travel</option>
                            <option value="Arts">Arts</option>
                            <option value="Environment">Environment</option>
                            <option value="Wellness">Wellness</option>
                            <option value="Business">Business</option>
                            <option value="Food">Food</option>
                        </select>
                    </div>
                </div>
            </div>


            {/* Text editor */}
            <div className="w-full my-5 h-[300px] inline-block">
                <div ref={quillRef} />
            </div>

            {/* Thumbnail */}
            {
                selectedThumbnail ? <div className='w-full h-20 bg-gray-100 hover:bg-gray-200 relative cursor-pointer rounded-lg'>
                    <div className='flex overflow-hidden w-full h-full justify-center items-center px-3'>
                        <h3 className='font-semibold text-sm'>Selected File: <span className='font-normal'>{selectedThumbnail.name}</span></h3>
                    </div>
                </div>
                    :
                    <div className='w-full h-20 bg-gray-100 hover:bg-gray-200 relative cursor-pointer rounded-lg'>
                        <input onChange={(e) => setSelectedThumbnail(e.target.files[0])} name='image' className='w-full h-full absolute top-0 left-0 opacity-0 cursor-pointer' type="file" accept='image/*' required />
                        <div className='flex justify-center items-center gap-1 h-full'>
                            <IoImagesOutline className='text-6xl' />
                            <p className='font-semibold'>Upload Thumbnail</p>
                        </div>
                    </div>
            }


            <button disabled={isUploading} type='submit' className='w-full font-semibold mt-10 bg-blue-600 text-white py-3 disabled:bg-gray-200 disabled:text-black rounded-lg'>
                {
                    isUploading ? <span className='text-gray-500 flex items-center gap-1 justify-center'>Your blog post is composing... Please do not close the window. <span className="loading loading-spinner text-gray-500"></span></span> : "Compose"
                }
            </button>

        </form>

    </div>

}

export default ComposePage