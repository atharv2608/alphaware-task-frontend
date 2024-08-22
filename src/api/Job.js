import { getAccessToken } from "@/auth/getAccessToken";
import axios from "axios";

export class Job{
    async postJob(data){
        const accessToken = getAccessToken();
        let configuration = {
            method: "post",
            maxBodyLength: Infinity,
            url: `${import.meta.env.VITE_API_URL}/jobs/post`,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
            data: data,
          };
        return axios.request(configuration);
    }
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
    async applyJob(jobId){
        const accessToken = getAccessToken();
        const data = JSON.stringify({
          jobId: jobId
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