import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerSchema } from "@/schemas/registerSchema";
import { Button } from "./ui/button";
import { registerUserService } from "@/services/registerUser";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

function Register({loginStatus}) {
  
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loginStatus) navigate("/", { replace: true });
  }, [loginStatus]);
  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    const success = await registerUserService(data);
    if (success) {
      form.reset();
      navigate("/login", {replace: true})
    }
    setLoading(false);
  };

  return (
    <div className="bg-gray-800 min-h-screen flex items-center justify-center py-6 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex flex-col md:flex-row md:space-x-5">
              <FormField
                name="firstName"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel className="text-gray-700">First Name</FormLabel>
                    <Input
                      {...field}
                      name="firstName"
                      className="mt-1 block w-full"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="lastName"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex-1 mt-4 md:mt-0">
                    <FormLabel className="text-gray-700">Last Name</FormLabel>
                    <Input
                      {...field}
                      name="lastName"
                      className="mt-1 block w-full"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              name="phone"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Phone</FormLabel>
                  <Input
                    {...field}
                    name="phone"
                    className="mt-1 block w-full"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Email</FormLabel>
                  <Input
                    {...field}
                    name="email"
                    className="mt-1 block w-full"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col md:flex-row md:space-x-5">
              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Password</FormLabel>
                    <Input
                      type="password"
                      {...field}
                      name="password"
                      className="mt-1 block w-full"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="confirmPassword"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      Confirm Password
                    </FormLabel>
                    <Input
                      type="password"
                      {...field}
                      name="confirmPassword"
                      className="mt-1 block w-full"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
                "Register"
              )}
            </Button>
            <Link className="flex justify-center mt-5" to={"/login"}>
              <span className="text-center text-blue-600 underline font-bold">
                Already have an account? Login
              </span>
            </Link>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default Register;
