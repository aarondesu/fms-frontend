import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  unit_type: z.string().min(1, { message: "Unit of Measurement is required" }),
  rate: z.number().min(1, { message: "Rate is required" }),
});

export interface CreateServiceDialogProps {
  trigger: React.JSX.Element;
}

export default function CreateServiceDialog({
  trigger,
}: CreateServiceDialogProps) {
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      unit_type: "",
      rate: 0,
    },
  });

  const hasFormErrors =
    form.formState.errors.name ||
    form.formState.errors.rate ||
    form.formState.errors.unit_type;
  const onSubmit = form.handleSubmit((data) => {
    console.log(data);
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (value) {
          form.reset();
        }

        setOpen(value);
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Service</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-4">
            {hasFormErrors && (
              <div className="p-2 bg-red-50 space-y-2 text-sm">
                {form.formState.errors.name && (
                  <p>{form.formState.errors.name?.message}</p>
                )}
                {form.formState.errors.name && (
                  <p>{form.formState.errors.unit_type?.message}</p>
                )}
                {form.formState.errors.name && (
                  <p>{form.formState.errors.rate?.message}</p>
                )}
              </div>
            )}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>The name of the service</FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="unit_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Unit of Measurement</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    The unit to measure the service
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Rate</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    The rate on how much the service will cost per unit
                  </FormDescription>
                </FormItem>
              )}
            />
            <div className="w-full">
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
