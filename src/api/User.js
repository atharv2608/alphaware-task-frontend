import axios from "axios";
// Define the User class, which contains methods for interacting with user-related API endpoints
export class User{
  
    // Method to register a new user
    async registerUser(data){
        let configuration = {
            method: "post",  // HTTP POST method
            maxBodyLength: Infinity, // Set the maximum request body length to infinity to handle large data (not recommended)
            url: `${import.meta.env.VITE_API_URL}/user/register`,
            data: data, // data to be sent
          };
        return axios.request(configuration); // Make the API request with the specified configuration
    }

    async loginUser(data){
        let configuration = {
            method: "post", // HTTP POST method
            maxBodyLength: Infinity,
            url: `${import.meta.env.VITE_API_URL}/user/login`,
            data: data, // data to be sent
          };
        return axios.request(configuration); // Make the API request with the specified configuration
    }
    
}

const user = new User()

export default user;