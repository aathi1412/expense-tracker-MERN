import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import Input from "../../components/formComponents/Input";
import AuthLayout from "../../components/layouts/AuthLayout";
import {RegisterSchema} from "../../utils/authSchema";


function Register(){

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        resolver: zodResolver(RegisterSchema)
    });

    const handleRegister = async (data) => {
        console.log(data);
        // try{
        //
        // }catch (e) {
        //
        // }
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
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                type="text"
                                placeholder="zoro"
                                label="FUll Name"
                                register={register}
                                registerName="fullname"
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
                    </form>
                </div>
            </AuthLayout>
        </>
    )
}
export default Register
