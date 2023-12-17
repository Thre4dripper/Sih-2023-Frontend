import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateStudentMutation } from "../api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StudentRegisterValidation } from "@/lib/validations/user";
import { useSearchParams } from "react-router-dom";
import { z } from "zod";

interface Props {
  setOpen: (x: boolean) => any;
}

const StudentSignup = ({ setOpen }: Props) => {
  const { mutate: registerStudentFn } = useCreateStudentMutation();
  let [searchParams, setSearchParams] = useSearchParams();
  const [serverErrors, setServerErrors] = useState({
    email: false,
    organizationId: false,
  });

  const form = useForm({
    resolver: zodResolver(StudentRegisterValidation),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      organizationId: "",
    },
  });
  interface BProps {
    profilePic: string;
    name: string;
    email: string;
    password: string;
    organizationId: number;
  }

  const createUser = (body: BProps) => {
    registerStudentFn(
      { body },
      {
        onSuccess: (data: any) => {
          console.log(data);

          setSearchParams({});
          setOpen(false);
        },
        onError: (err: any) => {
          console.log(err);
          if (err?.error === "Organization not found") {
            setServerErrors((prev) => {
              return {
                ...prev,
                organizationId: true,
              };
            });
          } else if (err?.error === "Student already exists") {
            setServerErrors((prev) => {
              return {
                ...prev,
                email: true,
              };
            });
          }
        },
      }
    );
  };
  const onSubmit = async (
    values: z.infer<typeof StudentRegisterValidation>
  ) => {
    console.log(values);

    createUser({
      name: values?.name,
      email: values?.email,
      password: values?.password,
      profilePic: "kjghdj",
      organizationId: Number(values?.organizationId),
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-5"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center w-full">
              <FormLabel className="text-base-semibold text-gray-500 text-light-2">
                Name
              </FormLabel>
              <div className="col-span-3">
                <FormControl className="col-span-3">
                  <Input
                    placeholder="Enter your name"
                    type="text"
                    className=""
                    {...field}
                  />
                </FormControl>
                {form?.formState?.errors?.name && (
                  <FormMessage>
                    {form?.formState?.errors?.name?.message}
                  </FormMessage>
                )}
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center w-full">
              <FormLabel className="text-base-semibold text-light-2">
                Email
              </FormLabel>
              <div className="col-span-3">
                <FormControl className="col-span-3">
                  <Input
                    placeholder="Email"
                    type="email"
                    className=""
                    {...field}
                  />
                </FormControl>
                {form?.formState?.errors?.email && (
                  <FormMessage>
                    {form?.formState?.errors?.email?.message}
                  </FormMessage>
                )}
                {serverErrors.email && (
                  <FormMessage>Email Already Exists!</FormMessage>
                )}
              </div>
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
              <div className="col-span-3">
                <FormControl className="col-span-3">
                  <Input
                    placeholder="Enter a password"
                    type="password"
                    className=""
                    {...field}
                  />
                </FormControl>
                {form?.formState?.errors?.password && (
                  <FormMessage>
                    {form?.formState?.errors?.password?.message}
                  </FormMessage>
                )}
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="organizationId"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center w-full">
              <FormLabel className="text-base-semibold text-light-2">
                Organization Id
              </FormLabel>
              <div className="col-span-3">
                <FormControl
                  onChange={() =>
                    setServerErrors((prev) => ({
                      ...prev,
                      organizationId: false,
                    }))
                  }
                  className=""
                >
                  <Input
                    placeholder="Enter the organization Id"
                    type="number"
                    className=""
                    {...field}
                  />
                </FormControl>
                {form?.formState?.errors?.organizationId && (
                  <FormMessage>
                    {form?.formState?.errors?.organizationId?.message}
                  </FormMessage>
                )}
                {serverErrors.organizationId && (
                  <FormMessage>Organization Not Found!</FormMessage>
                )}
              </div>
            </FormItem>
          )}
        />
        <Button className="" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default StudentSignup;
