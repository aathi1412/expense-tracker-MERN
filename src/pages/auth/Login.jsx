import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import AuthSwitch from "../../components/formComponents/AuthSwitch";
import Input from "../../components/formComponents/Input";
import AuthLayout from "../../components/layouts/AuthLayout";
import {LoginSchema} from "../../utils/authSchema";


function Login(){
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm({
        resolver: zodResolver(LoginSchema)
    });

    const handleLogin = async (data) => {
        console.log(data);
        // try{
        //
        // }catch (e) {
        //
        // }
    }
    return (
        <AuthLayout>
            <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-black">Welcome back!</h3>
                <p className="text-xs text-slate-700 mt-1.25 mb-6">
                    Please Enter your details to log in
                </p>

                <form noValidate onSubmit={handleSubmit(handleLogin)}>
                    <Input
                        type="email"
                        placeholder="zoro@example.com"
                        label="Email"
                        register={register}
                        registerName="email"
                        errors={errors}
                    />

                    <Input
                        type="password"
                        placeholder="Min 8 characters"
                        label="Password"
                        register={register}
                        registerName="password"
                        errors={errors}
                    />

                    <button
                        type="submit"
                        className="btn-primary"
                    >
                        LOGIN
                    </button>

                    <AuthSwitch
                        path="/register"
                        doAction="Register"
                    >
                        Don't have an account?{" "}
                    </AuthSwitch>
                </form>
            </div>
        </AuthLayout>
    )
}
export default Login
