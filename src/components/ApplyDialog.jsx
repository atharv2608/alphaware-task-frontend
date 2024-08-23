import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { applyJobSchema } from "@/schemas/applyJobSchema";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { applyJobService } from "@/services/jobService";
import { Loader2 } from "lucide-react";
export function ApplyDialog({
  jobID,
  comapanyName = "Company Name",
  position = "Position",
  dispatch,
  fetchJobs,
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(applyJobSchema),
    defaultValues: {
      resumeURL: "",
    },
  });
  const onSubmit = async (data) => {
    setLoading(true);
    data.jobId = jobID;
    console.log("Data: ", data);

    const success = await applyJobService(data);
    if (success) {
      dispatch(fetchJobs());
    }
    setLoading(false);
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="bg-black text-white">
          Apply Now!
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{`Apply for ${position} in ${comapanyName}`}</AlertDialogTitle>
          <AlertDialogDescription>
            Paste your resume link (pdf) here
            <div className="mt-5">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    name="resumeURL"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className="text-gray-700">
                          Paste your Resume URL
                        </FormLabel>
                        <Input
                          {...field}
                          name="resumeURL"
                          className="mt-1 block w-full border-indigo-500"
                          placeholder="Resume URL"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="mt-5 space-x-5">
                    <Button className="bg-indigo-500 text-white">
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Please wait
                        </>
                      ) : (
                        "Apply"
                      )}
                    </Button>
                    <AlertDialogCancel className="bg-red-500 hover:bg-red-700 hover:text-white text-white">
                      Cancel
                    </AlertDialogCancel>
                  </div>
                </form>
              </Form>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter></AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
