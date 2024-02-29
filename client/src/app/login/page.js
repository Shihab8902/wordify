"use client";

import Link from "next/link";
import { useContext, useState } from "react";
import { MdOutlineMail } from "react-icons/md";
import { IoIosLock } from "react-icons/io";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { UserContext } from "@/context/AuthContext";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";



const LoginPage = () => {


    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const { register, handleSubmit, formState: { errors }, } = useForm();
    const { loginUser } = useContext(UserContext);
    const router = useRouter();

    const onSubmit = async (data) => {
        const result = await loginUser(data);


        //Check for user existence
        if (result.message === "no user") {
            return Swal.fire({
                title: "Error!",
                text: "Invalid user credentials!",
                icon: "error"
            })
        }

        //Check for password error
        if (result.message === "Invalid!") {
            return Swal.fire({
                title: "Error!",
                text: "Wrong password! Please try again.",
                icon: "error"
            });
        }


        //Redirect user after successful login
        Swal.fire({
            text: "You are successfully logged in!",
            icon: "success",
            showConfirmButton: false,
            timer: 1500
        });

        router.push("/");



    }





    return <div className='p-3 md:p-6 mt-5'>

        <div className='flex  justify-center items-center container mx-auto'>

            <div className='rounded-lg md:p-10 md:border-2 w-full md:w-3/4 lg:w-1/2'>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div>
                        <h3 className="text-center text-3xl font-semibold">Login</h3>
                        <p className="text-center text-sm  text-gray-500 mt-2">Enter your email and password to login to your account!</p>
                    </div>

                    <div className='my-8'>
                        <label className='font-bold block mb-2' htmlFor="name">Email</label>
                        <div className='flex items-center border-2 rounded-lg'>
                            <span className='ml-3 text-xl text-gray-400'><MdOutlineMail /></span>
                            <input {...register("email", { required: true })} className='w-full px-4 py-3 outline-none rounded-tr-lg rounded-br-lg font-bold text-black placeholder:font-normal' type="email" name="email" id="email" placeholder='Enter your email' />
                        </div>
                        {errors.email?.type === "required" && <span className="text-sm font-medium text-red-600">*This field is required</span>}

                    </div>

                    <div className='my-5'>
                        <label className='font-bold block mb-2' htmlFor="name">Password</label>
                        <div className='flex items-center border-2 rounded-lg'>
                            <span className='ml-3 text-xl text-gray-400'><IoIosLock /></span>
                            <input {...register("password", { required: true })} className='w-full px-4 py-3 outline-none rounded-tr-lg rounded-br-lg font-bold text-black placeholder:font-normal' type={isPasswordVisible ? "text" : "password"} name="password" id="password" placeholder='Enter your email' />
                            <span onClick={() => setIsPasswordVisible(!isPasswordVisible)} className='text-xl text-gray-400 cursor-pointer mr-3'>
                                {
                                    isPasswordVisible ? <FaRegEye /> : <FaRegEyeSlash />
                                }
                            </span>
                        </div>
                        {errors.password?.type === "required" && <span className="text-sm font-medium text-red-600">*This field is required</span>}

                    </div>






                    <div>
                        <button type='submit' className='w-full bg-blue-600 py-3 text-white font-semibold rounded-lg '>Login</button>
                    </div>

                    <p className='text-center mt-5 font-medium'>Don't have an account? <Link className='text-blue-500 hover:underline' href="/register">Register</Link></p>

                </form>








            </div>


        </div>




    </div>
}

export default LoginPage