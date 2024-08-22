import Cookies from "js-cookie"

export const getAccessToken = ()=> {
    try {
        const accessToken = Cookies.get("accessToken")
        return accessToken
    } catch (error) {
        console.error("Failed to get accessToken")
    }
}