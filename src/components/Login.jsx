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
import { loginSchema } from "@/schemas/loginSchema";
import { Button } from "./ui/button";
import { loginUserService } from "@/services/loginService";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useScrollToTop } from "@/utils/scrollToTop";
function Login({loginStatus}) {
  useScrollToTop()
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (loginStatus) navigate("/", { replace: true });
  }, [loginStatus]);
  const dispatch = useDispatch();
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    const success = await loginUserService(data, dispatch);
    if (success) {
      form.reset();
    }
    setLoading(false);
  };

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center py-6 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-indigo-500 text-2xl font-bold mb-6 text-center">
          Login
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                "Login"
              )}
            </Button>
            <Link className="flex justify-center mt-5" to={"/register"}>
              <span className="text-center text-blue-600 underline font-bold">
                Don't have an account? Register
              </span>
            </Link>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default Login;
