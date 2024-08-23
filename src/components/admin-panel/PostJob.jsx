import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { postJobSchema } from "@/schemas/postJobSchema";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { postJobService } from "@/services/jobService";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useScrollToTop } from "@/utils/scrollToTop";
function PostJob({role}) {
  useScrollToTop()
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (role !== "admin") {
      navigate("/", { replace: true });
    }
  }, [role]);
  const form = useForm({
    resolver: zodResolver(postJobSchema),
    defaultValues: {
      companyName: "",
      position: "",
      contract: "",
      location: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    const success = await postJobService(data);
    if (success) {
      form.reset();
      window.location.reload();
    }
    setLoading(false);
  };

  return (
    <div className="bg-gray-800 min-h-screen flex items-center justify-center py-6 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-indigo-500 text-2xl font-bold mb-6 text-center">
          Post a Job
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col md:flex-row md:space-x-5">
              <FormField
                name="companyName"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-gray-700">
                      Enter Company Name
                    </FormLabel>
                    <Input
                      {...field}
                      name="companyName"
                      className="mt-1 block w-full"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="position"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex-1 mt-4 md:mt-0">
                    <FormLabel className="text-gray-700">Position</FormLabel>
                    <Input
                      {...field}
                      name="position"
                      className="mt-1 block w-full"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              name="contract"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Contract</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Contract type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Full Time">Full Time</SelectItem>
                      <SelectItem value="Part Time">Part Time</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="location"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Location</FormLabel>
                  <Input
                    {...field}
                    name="location"
                    className="mt-1 block w-full"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Post Job"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default PostJob;
