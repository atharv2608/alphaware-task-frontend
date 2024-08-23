import job from "@/api/Job";
import { toast } from "react-toastify";

//based on the job class in api folder, I am calling its methods by passing relevant data
//These all are like factroy functions, also handling error

//service to post job
const postJobService = async(data)=>{
    try {
        const res = await job.postJob(data);
        if (res.data?.statusCode === 201) {
            toast.success("Job Posted");
            return true;
          }
    } catch (error) {
        console.error(error)
        toast.error(error?.response?.data?.message || "Something went wrong");
        return false;
    }
}

//service to edit job
const editJobService = async(data)=>{
    try {
        const res = await job.editJob(data);
        if (res.data?.statusCode === 200) {
            toast.success("Job Edited");
            return true;
          }
    } catch (error) {
        console.error(error)
        toast.error(error?.response?.data?.message || "Something went wrong");
        return false;
    }
}

//service to delete job
const deleteJobService = async(data)=>{
    try {
        const res = await job.deleteJob(data);
        if (res.data?.statusCode === 200) {
            toast.success("Job Deleted");
            return true;
          }
    } catch (error) {
        console.error(error)
        toast.error(error?.response?.data?.message || "Something went wrong");
        return false;
    }
}

//service to apply to job

const applyJobService = async(data)=>{
    try {
        const res = await job.applyJob(data);
        if (res.data?.statusCode === 200) {
            toast.success("Job Applied");
            return true;
          }
    } catch (error) {
        console.error(error)
        toast.error(error?.response?.data?.message || "Something went wrong");
        return false;
    }
}

export {postJobService, editJobService, deleteJobService, applyJobService}