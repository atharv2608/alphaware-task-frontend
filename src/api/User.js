import axios from "axios";
export class User{
    async registerUser(data){
        let configuration = {
            method: "post",
            maxBodyLength: Infinity,
            url: `${import.meta.env.VITE_API_URL}/user/register`,
            data: data,
          };
        return axios.request(configuration);
    }

    async loginUser(data){
        let configuration = {
            method: "post",
            maxBodyLength: Infinity,
            url: `${import.meta.env.VITE_API_URL}/user/login`,
            data: data,
          };
        return axios.request(configuration);
    }
    
}

const user = new User()

export default user;