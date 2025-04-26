import type React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import ConfirmationDialog from "./ConfirmationDialog";
import { toast } from "sonner";
import { useCreateAdminMutation } from "~/redux/api/adminApi";
import { useState } from "react";

type CreateAdminDialogProps = {
  trigger: React.JSX.Element;
};

const formSchema = z
  .object({
    username: z.string(),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match!",
    path: ["confirmPassword"],
  });

export default function CreateAdminDialog({ trigger }: CreateAdminDialogProps) {
  const [createAdmin, results] = useCreateAdminMutation();
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  //   const onSubmit = form.handleSubmit((data) => {
  //     toast.promise(
  //       createAdmin({
  //         username: data.username,
  //         password: data.password,
  //       }).unwrap(),
  //       {
  //         loading: "Creating admin...",
  //         success: () => {
  //           setOpen(false);
  //           return "Successfully created admin!";
  //         },
  //         error: () => {
  //           return "Failed to create admin";
  //         },
  //       }
  //     );
  //   });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    toast.promise(
      createAdmin({
        username: data.username,
        password: data.password,
      }).unwrap(),
      {
        loading: "Creating admin...",
        success: () => {
          setOpen(false);
          return "Successfully created admin!";
        },
        error: () => {
          setOpen(false);
          return "Failed to create admin";
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={(value) => setOpen(value)}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Create Admin</DialogTitle>
          <DialogDescription>Create admin account</DialogDescription>
        </DialogHeader>
        <div className="">
          <Form {...form}>
            <form onSubmit={() => {}} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Username"
                        disabled={results.isLoading}
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
                        {...field}
                        type="password"
                        placeholder="Password"
                        disabled={results.isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Confirm Password"
                        disabled={results.isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col gap-2">
                <ConfirmationDialog
                  title="Create Admin"
                  description="Are you sure you want to continue?"
                  trigger={<Button disabled={results.isLoading}>Create</Button>}
                  action={() => {
                    form.reset();
                    form.handleSubmit(onSubmit)();
                  }}
                />
                <DialogClose asChild>
                  <Button variant="secondary" disabled={results.isLoading}>
                    Cancel
                  </Button>
                </DialogClose>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
