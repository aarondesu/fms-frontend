import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { adminAuthApi, useLazyLoginQuery } from "~/redux/api/adminAuthApi";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import type { Route } from "./+types/login";
import { useEffect } from "react";

const formSchema = z.object({
  username: z.string(),
  password: z.string(),
});

const session_token_key = import.meta.env.VITE_SESSION_TOKEN_KEY;

export default function Login({}: Route.ComponentProps) {
  const [login, { isLoading, isFetching }] = useLazyLoginQuery();
  const isDataLoading = isLoading || isFetching;
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    toast.promise(login(data).unwrap(), {
      loading: "Loading...",
      success: (result) => {
        // Set token
        sessionStorage.setItem(session_token_key, result);

        navigate("/admin");
        return "Successfully logged in";
      },
      error: (error) => {
        console.log(error);
        if (error) {
          return error.data.errors[0];
        }
        return "Error";
      },
    });
  });

  useEffect(() => {
    if (
      sessionStorage.getItem(session_token_key) &&
      sessionStorage.getItem(session_token_key) !== ""
    ) {
      toast.info("User already logged in!");
      navigate("/admin");
    }
  }, []);

  return (
    <div className="flex min-h-screen w-full">
      <div className="m-auto flex flex-col min-w-[300px] gap-6 select-none">
        <div className="text-center">
          <h3 className="font-black text-xl">Financial Management System</h3>
        </div>
        <div className="">
          <Form {...form}>
            <form
              onSubmit={onSubmit}
              method="POST"
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Username"
                        disabled={isDataLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        type="password"
                        disabled={isDataLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-full">
                <Button className="w-full" disabled={isDataLoading}>
                  {isDataLoading ? (
                    <Loader2 className="w-15 h-15 animate-spin" />
                  ) : (
                    <>Login</>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
