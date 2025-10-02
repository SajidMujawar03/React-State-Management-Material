import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";


const useAuth=()=>{
    const context=useContext(AuthContext)

    if(!context)
        throw new Error("please access authcontext in auth provider")

    return context
}


export default useAuth