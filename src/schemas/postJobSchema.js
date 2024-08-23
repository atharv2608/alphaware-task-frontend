import {z} from "zod"
// validation for posting job using zod
export const postJobSchema = z.object({
    companyName: z.string().min(1, {message: "Company name is required"}),
    position: z.string().min(1, {message: "Position is required"}),
    contract: z.enum(["Full Time", "Part Time"], {message: "Contract is required"}),
    location: z.string().min(1, {message: "Locaton is required"}),
})