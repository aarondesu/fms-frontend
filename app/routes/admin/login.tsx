import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { useLazyLoginQuery } from "~/redux/api/adminAuthApi";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useEffect } from "react";
import { redirect } from "react-router";

const formSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export default function Login() {
  const [login, results] = useLazyLoginQuery();
  const isDataLoading = results.isLoading || results.isFetching;

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
      success: "Successfully logged in",
      error: "Failed to login",
    });
  });

  useEffect(() => {
    if (results.isSuccess) {
      redirect("/admin/");
    }
  }, [results.isSuccess]);

  return (
    <div className="flex min-h-screen w-full">
      <div className="m-auto flex flex-col min-w-[300px] gap-6 select-none">
        <div className="text-center">
          <h3 className="font-black text-xl">Financial Management System</h3>
        </div>
        <div className="">
          <Form {...form}>
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
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
                    <>Loading</>
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
