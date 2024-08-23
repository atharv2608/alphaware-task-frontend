import { getAccessToken } from "@/auth/getAccessToken";
import axios from "axios";

// Define the Job class, which contains methods for interacting with job-related API endpoints
export class Job{

      // Method to post a new job
    async postJob(data){
        const accessToken = getAccessToken(); // Get the access token for authorization
        let configuration = {
            method: "post", // HTTP POST method
            maxBodyLength: Infinity,  // Set the maximum request body length to infinity to handle large data (not recommended)
            url: `${import.meta.env.VITE_API_URL}/jobs/post`,
            headers: {
                "Content-Type": "application/json", // Set the content type to JSON
                Authorization: `Bearer ${accessToken}`, // Include the access token in the Authorization header
            },
            data: data, // Job data to be sent in the request body
          };
        return axios.request(configuration); // Make the API request with the specified configuration
    }


    //Similar to above method, below methods are implememted same
    async editJob(data){
        const accessToken = getAccessToken();
        let configuration = {
            method: "put",
            maxBodyLength: Infinity,
            url: `${import.meta.env.VITE_API_URL}/jobs/edit`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
            data: data,
          };
        return axios.request(configuration);
    }
    async deleteJob(id){
        const accessToken = getAccessToken();
        const data = JSON.stringify({
          _id: id
        })
        let configuration = {
            method: "delete",
            maxBodyLength: Infinity,
            url: `${import.meta.env.VITE_API_URL}/jobs/delete`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
            data: data,
          };
        return axios.request(configuration);
    }
    async applyJob({jobId, resumeURL}){
        const accessToken = getAccessToken();
        const data = JSON.stringify({
          jobId: jobId,
          resumeURL: resumeURL
        })
        let configuration = {
            method: "post",
            maxBodyLength: Infinity,
            url: `${import.meta.env.VITE_API_URL}/jobs/apply`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
            data: data,
          };
        return axios.request(configuration);
    }
}

const job = new Job();
export default job;