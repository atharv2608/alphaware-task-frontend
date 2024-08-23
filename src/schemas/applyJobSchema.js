import {z} from "zod"

export const applyJobSchema = z.object({
    resumeURL: z.string().min(1, {message: "Resume URL is required"}).url({message: "Invalid url"})
})