
import user from "@/api/User"
import { toast } from "react-toastify"
import { login as authLogin } from "@/auth/authSlice";
import Cookies from "js-cookie";
const loginUserService = async(data, dispatch)=>{
    
    try {
        const res = await user.loginUser(data);
        if (res.data?.statusCode === 200) {
            toast.success("User Login");
            const userData = res.data.data;
            if(userData){
                const expirationDate = new Date(new Date().getTime() + 12 * 60 * 60 * 1000);
                Cookies.set("accessToken", userData.accessToken, {
                    expires: expirationDate, 
                    path: '/', 
                    secure: true, 
                    sameSite: 'strict' 
                  });
                dispatch(authLogin(userData, userData?.role))
            }
            return true;
          }
    } catch (error) {
        console.error(error)
        toast.error(error?.response?.data?.message || "Default Message");
        return false;
    }
}

export {loginUserService}