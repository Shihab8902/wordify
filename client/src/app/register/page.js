"use client";

import Link from "next/link";
import { useContext, useState } from "react";
import { MdOutlineMail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { IoIosLock } from "react-icons/io";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form"
import { UserContext } from "@/context/AuthContext";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";



const RegisterPage = () => {

    //States
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);


    const { register, handleSubmit, formState: { errors }, } = useForm();
    const { createUser } = useContext(UserContext);
    const router = useRouter();

    //Handle user registration
    const onSubmit = async (data) => {
        const userData = { ...data, role: "user" };
        const result = await createUser(userData);

        //Handle error for duplicate user
        if (result?.message === "user already exist!") {
            Swal.fire({
                title: "Error!",
                text: "A user with these credentials already exists!",
                icon: "error"
            });
            return;
        }

        //Redirect registered user
        if (result?.user) {
            Swal.fire({
                text: "Your account has been successfully registered!",
                icon: "success",
                showConfirmButton: false,
                timer: 1500
            });
            router.push("/");
        }
    }


    return <div className='p-3 md:p-6 mt-5'>

        <div className='flex  justify-center items-center container mx-auto'>

            <div className='rounded-lg md:p-10 md:border-2 w-full md:w-3/4 lg:w-1/2'>
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div>
                        <h3 className="text-center text-3xl font-semibold">Register</h3>
                        <p className="text-center text-sm  text-gray-500 mt-2">Enter your information to register your account!</p>
                    </div>

                    <div className='my-8'>
                        <label className='font-bold block mb-2' htmlFor="name">Name</label>
                        <div className='flex items-center border-2 rounded-lg'>
                            <span className='ml-3 text-xl text-gray-400'><FaUser /></span>
                            <input {...register("name", { required: true })} className='w-full px-4 py-3 outline-none rounded-tr-lg rounded-br-lg font-bold text-black placeholder:font-normal' type="text" name="name" id="name" placeholder='Enter your name' />
                        </div>
                        {errors.name?.type === "required" && <span className="text-sm font-medium text-red-600">*This field is required</span>}
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
                            <input {...register("password", { required: true, minLength: 6 })} className='w-full px-4 py-3 outline-none rounded-tr-lg rounded-br-lg font-bold text-black placeholder:font-normal' type={isPasswordVisible ? "text" : "password"} name="password" id="password" placeholder='Enter your email' />
                            <span onClick={() => setIsPasswordVisible(!isPasswordVisible)} className='text-xl text-gray-400 cursor-pointer mr-3'>
                                {
                                    isPasswordVisible ? <FaRegEye /> : <FaRegEyeSlash />
                                }
                            </span>
                        </div>

                        {errors.password?.type === "required" && <span className="text-sm font-medium text-red-600">*This field is required</span>}
                        {errors.password?.type === "minLength" && <span className="text-sm font-medium text-red-600">Password must be at least 6 character!</span>}
                    </div>



                    <div>
                        <button type='submit' className='w-full bg-blue-600 py-3 text-white font-semibold rounded-lg '>Register</button>
                    </div>

                    <p className='text-center mt-5 font-medium'>Already have an account? <Link className='text-blue-500 hover:underline' href="/login">Login</Link></p>

                </form>








            </div>


        </div>




    </div>
}

export default RegisterPage