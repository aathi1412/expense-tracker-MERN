import {Link} from "react-router-dom";


function AuthSwitch({ path, doAction, children}){
    return (
        <p className="text-[13px] text-slate-800 mt-3">
            {children}
            <Link
                to={path}
                className="font-medium text-primary underline"
            >
                {doAction}
            </Link>
        </p>
    )
}
export default AuthSwitch
