import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import Input from "../../components/formComponents/Input";
import AuthLayout from "../../components/layouts/AuthLayout";
import {RegisterSchema} from "../../utils/authSchema";
import { useState } from "react";
import ProfilePhotoSelector from "../../components/formComponents/ProfilePhotoSelector";
import AuthSwitch from "../../components/formComponents/AuthSwitch";
import {API_PATHS} from "../../utils/apiPath";
import {toast} from "react-hot-toast";
import axiosInstance from "../../utils/axiosInstance";
import { useAuth } from "../../hooks/useAuth";
import UploadImage from "../../utils/UploadImage";

function Register(){
    const[profilePic, setProfilePic] = useState();
    const navigate = useNavigate();
    const { updateUser } = useAuth();

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        resolver: zodResolver(RegisterSchema)
    });

    const handleRegister = async (data) => {
        let profileImageUrl = "";
        const toastId = toast.loading("Registering...");
        try{

            if(profilePic){
                const imageUploadResponse = await UploadImage(profilePic);
                profileImageUrl = imageUploadResponse.imageUrl || "";
            }


            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {...data, profileImageUrl});
            if(response.data){
                toast.success("Registration successful", { id: toastId });
            }
            const { token, user } = response.data;
            if(token){
                localStorage.setItem("token", token);
                updateUser(user);
                navigate("/dashboard");
            }
        }catch (e) {
            if(e.response && e.response.data && e.response.data.message){
                toast.error(e.response.data.message, { id: toastId });
            }else{
                toast.error("Something went wrong", { id: toastId });
            }
        }
    }
    return (
        <>
            <AuthLayout>
                <div className="lg:w-full h-auto md:h-full mt-10 flex flex-col justify-center">
                    <h3 className="text-xl font-semibold text-black">
                        Create an Account
                    </h3>
                    <p className="text-xs text-slate-700 mt-1.25 mb-6">
                        Join us today by entering your details below
                    </p>

                    <form onSubmit={handleSubmit(handleRegister)}>
                        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                type="text"
                                placeholder="zoro"
                                label="FUll Name"
                                register={register}
                                registerName="fullName"
                                errors={errors}
                            />
                            <Input
                                type="email"
                                placeholder="zoro@example.com"
                                label="Email"
                                register={register}
                                registerName="email"
                                errors={errors}
                            />
                            <div className="col-span-2">
                                <Input
                                    type="password"
                                    placeholder="Min 8 characters"
                                    label="Password"
                                    register={register}
                                    registerName="password"
                                    errors={errors}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn-primary"
                        >
                            Register
                        </button>

                        <AuthSwitch
                            path="/login"
                            doAction="Login"
                        >
                            Already have an account{' '}
                        </AuthSwitch>
                    </form>
                </div>
            </AuthLayout>
        </>
    )
}
export default Register
