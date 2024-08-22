
import user from "@/api/User"
import { toast } from "react-toastify"
const registerUserService = async(data)=>{
    
    try {
        const res = await user.registerUser(data);
        if (res.data?.statusCode === 200) {
            toast.success("User registered");
            return true;
          }
    } catch (error) {
        console.error(error)
        toast.error(error?.response?.data?.message || "Default Message");
        return false;
    }
}

export {registerUserService}