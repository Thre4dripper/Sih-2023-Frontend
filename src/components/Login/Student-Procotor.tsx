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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "react-router-dom";
import { useLoginProctorMutation, useLoginStudentMutation } from "../api";
import { useForm } from "react-hook-form";
import { StudentProctorValidation } from "@/lib/validations/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface Props {
  setOpen: (x: boolean) => any;
}

const StudentProctorLogin = ({ setOpen }: Props) => {
  let [searchParams, setSearchParams] = useSearchParams();
  const { mutate: loginStudentFn } = useLoginStudentMutation();

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

  const loginStudent = (body: BSProps) => {
    loginStudentFn(
      { body },
      {
        onSuccess: (data: any) => {
          console.log(data);
          localStorage.setItem(
            "StudentToken",
            data?.data?.accessTokens?.accessToken
          );
          setSearchParams({});
          setOpen(false);
        },
        onError: (err: any) => {
          console.log(err);
        },
      }
    );
  };

  const loginProctor = (body: BSProps) => {
    loginProctorFn(
      { body },
      {
        onSuccess: (data: any) => {
          console.log(data);
          localStorage.setItem(
            "ProctorToken",
            data?.data?.accessTokens?.accessToken
          );
          setSearchParams({});
          setOpen(false);
        },
        onError: (err: any) => {
          console.log(err);
        },
      }
    );
  };

  const onSubmit = async (values: z.infer<typeof StudentProctorValidation>) => {
    console.log(values);

    // api call to save user to database

    if (values?.userType === "student") {
      loginStudent({
        email: values?.email,
        password: values?.password,
        organizationId: Number(values?.organizationId),
      });
    } else if(values?.userType === "proctor") {
      loginProctor({
        email: values?.email,
        password: values?.password,
        organizationId: Number(values?.organizationId),
      });
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col justify-start gap-5"
      >
        <FormField
          control={form.control}
          name="userType"
          render={({ field }) => (
            <FormItem className="grid grid-cols-4 items-center w-full">
              <FormLabel className="text-base-semibold text-light-2">
                Type
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className="col-span-3">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="proctor">Proctor</SelectItem>
                </SelectContent>
              </Select>
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
                  type="password"
                  className=""
                  {...field}
                />
              </FormControl>
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
              <FormControl className="col-span-3">
                <Input
                  placeholder="Enter the organization Id"
                  type="string"
                  className=""
                  {...field}
                />
              </FormControl>
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
