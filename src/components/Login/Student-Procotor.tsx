import React from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  //   FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  //   FormMessage,
} from "@/components/ui/form";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "react-router-dom";
import { useLoginProctorMutation } from "../api";
import { useForm } from "react-hook-form";
import { StudentProctorValidation } from "@/lib/validations/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface Props {
  setOpen: (x: boolean) => any;
}

const StudentProctorLogin = ({ setOpen }: Props) => {
  let [searchParams, setSearchParams] = useSearchParams();
  // const { mutate: loginStudentFn } = useLoginStudentMutation();
  const [serverErrors, setServerErrors] = React.useState({
    email: false,
    organizationId: false,
  });

  const { mutate: loginProctorFn } = useLoginProctorMutation();

  const form = useForm({
    resolver: zodResolver(StudentProctorValidation),
    defaultValues: {
      email: "",
      password: "",
      organizationId: "",
      userType: "",
    },
  });
  interface BSProps {
    email: string;
    password: string;
    organizationId: number;
  }

  // const loginStudent = (body: BSProps) => {
  //   loginStudentFn(
  //     { body },
  //     {
  //       onSuccess: (data: any) => {
  //         console.log(data);
  //         localStorage.setItem(
  //           "accessToken",
  //           data?.data?.accessTokens?.accessToken
  //         );
  //         setSearchParams({});
  //         setOpen(false);
  //       },
  //       onError: (err: any) => {
  //         console.log(err);
  //         toast({
  //           title:
  //             "User Not Found!! Please check your email/password and try again.",
  //         });
  //       },
  //     }
  //   );
  // };

  const loginProctor = (body: BSProps) => {
    loginProctorFn(
      { body },
      {
        onSuccess: (data: any) => {
          console.log(data);
          localStorage.setItem(
            "accessToken",
            data?.data?.accessTokens?.accessToken
          );
          setSearchParams({});
          setOpen(false);
        },
        onError: (err: any) => {
          console.log(err);
          if (err?.error === "Organization not found") {
            setServerErrors((prev) => {
              return {
                email: false,
                organizationId: true,
              };
            });
          } else {
            setServerErrors((prev) => {
              return {
                email: true,
                organizationId: false,
              };
            });
          }
        },
      }
    );
  };

  const onSubmit = async (values: z.infer<typeof StudentProctorValidation>) => {
    console.log(values);

    // api call to save user to database

    // if (values?.userType === "student") {
    //   loginStudent({
    //     email: values?.email,
    //     password: values?.password,
    //     organizationId: Number(values?.organizationId),
    //   });
    // } else if (values?.userType === "proctor") {
    loginProctor({
      email: values?.email,
      password: values?.password,
      organizationId: Number(values?.organizationId),
    });
    // }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-5"
      >
        {/* <FormField
          control={form.control}
          name="userType"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center w-full">
              <FormLabel className="text-base-semibold text-light-2">
                Type
              </FormLabel>
              <div className="col-span-3">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="proctor">Proctor</SelectItem>
                  </SelectContent>
                </Select>
                {form?.formState?.errors?.userType && (
                  <FormMessage>
                    {form?.formState?.errors?.userType?.message}
                  </FormMessage>
                )}
              </div>
            </FormItem>
          )}
        /> */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center w-full">
              <FormLabel className="text-base-semibold text-light-2">
                Email
              </FormLabel>
              <div className="col-span-3">
                <FormControl
                  onChange={() =>
                    setServerErrors((prev) => ({ ...prev, email: false }))
                  }
                  className=""
                >
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
                  <FormMessage>Email Not Found!</FormMessage>
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
                <FormControl className="">
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

        <Button className="mt-6" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default StudentProctorLogin;
