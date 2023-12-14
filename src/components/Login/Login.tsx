import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  //   FormDescription,
  FormField,
  FormItem,
  FormLabel,
  //   FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginValidation } from "@/lib/validations/user";
import { z } from "zod";
import { useLoginUserMutation } from "../api";

const UserLogin = () => {
  const [open, setOpen] = useState(false);
  let [searchParams, setSearchParams] = useSearchParams();
  const { mutate: loginUserFn } = useLoginUserMutation();

  const form = useForm({
    resolver: zodResolver(LoginValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (searchParams.get("modal") === "login") {
      setOpen((prev) => {
        return true;
      });
    }
  }, [searchParams.get("modal")]);

  interface BProps {
    email: string;
    password: string;
  }

  const loginUser = (body: BProps) => {
    loginUserFn(
      { body },
      {
        onSuccess: (data: any) => {
          console.log(data);
          localStorage.setItem("OrgToken", data?.data?.accessTokens?.accessToken);
          setSearchParams({});
          setOpen(false);
        },
        onError: (err: any) => {
          console.log(err);
        },
      }
    );
  };

  const onSubmit = async (values: z.infer<typeof LoginValidation>) => {
    console.log(values);

    // api call to save user to database

    loginUser({
      email: values?.email,
      password: values?.password,
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        if (open) {
          setSearchParams({});
          setOpen(false);
        }
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>Enter Account Credentials.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col justify-start gap-5"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center w-full">
                  <FormLabel className="text-base-semibold text-light-2">
                    Email
                  </FormLabel>
                  <FormControl className="col-span-3">
                    <Input
                      placeholder="Email"
                      type="email"
                      className=""
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center w-full">
                  <FormLabel className="text-base-semibold text-light-2">
                    Password
                  </FormLabel>
                  <FormControl className="col-span-3">
                    <Input
                      placeholder="Enter a password"
                      type="text"
                      className=""
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className="" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UserLogin;
