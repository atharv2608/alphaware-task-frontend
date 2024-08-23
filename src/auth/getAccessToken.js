import Cookies from "js-cookie"
// method to get  access token that needs to be send as request header
export const getAccessToken = ()=> {
    try {
        const accessToken = Cookies.get("accessToken")
        return accessToken
    } catch (error) {
        console.error("Failed to get accessToken")
    }
}