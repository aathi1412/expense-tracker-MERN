import {useState} from "react";
import {FiEye, FiEyeOff} from "react-icons/fi";

function Input({type, label, placeholder, register, registerName, errors}){
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword)
    };

    return (
        <div>
            <label className="text-[13px] text-slate-800">{label}</label>
            <div className="input-box">
                <input
                    type={type === 'password' ? showPassword ? 'text' : 'password' : type}
                    placeholder={placeholder}
                    {...register(registerName)}
                    className="w-full bg-transparent outline-none"
                />
                {type === 'password' && (
                    <button
                        type="button"
                        onClick={() => toggleShowPassword()}
                        className="cursor-pointer text-slate-800"
                    >
                        {showPassword ? <FiEye size={20}/> : <FiEyeOff size={20}/>}
                    </button>
                )}
            </div>

            {errors[registerName] && (
                <p className="text-red-500">
                    {errors[registerName].message}
                </p>
            )}
        </div>
    )
}
export default Input
