import AuthLayout from "../../components/layouts/AuthLayout";


function Login(){
    return (
        <AuthLayout>
            <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-black">Welcome back!</h3>
                <p className="text-xs text-slate-700 mt-1.25 mb-6">
                    Please Enter your details to log in
                </p>
            </div>
        </AuthLayout>
    )
}
export default Login
