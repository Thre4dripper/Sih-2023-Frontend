import { Edit2Icon } from "lucide-react";
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
import { EditProfileValidation } from "@/lib/validations/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../../ui/input";

const StudentProfile = () => {
  const [isEdit, setIsEdit] = React.useState<boolean>(false);
  const form = useForm({
    resolver: zodResolver(EditProfileValidation),
    defaultValues: {
      name: "",
      email: "",
      city: "",
      state: "",
      country: "",
      zipcode: "",
      address: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof EditProfileValidation>) => {
    console.log(values);

    // api call to save user to database

    // loginUser({
    //   email: values?.email,
    //   password: values?.password,
    // });
  };
  return (
    <div className="">
      <div className="flex justify-between w-full mb-8">
        <h1 className="text-3xl text-slate-500 font-semibold">My Profile</h1>
        <Edit2Icon
          onClick={() => setIsEdit((prev) => !prev)}
          className="mt-1 text-slate-500 cursor-pointer hover:text-primary"
        />
      </div>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col justify-start gap-5"
          >
            <div className="flex gap-x-12 my-2">
              {!isEdit && (
                <div className="grid grid-cols-5 w-full items-center">
                  <h3 className="font-semibold">Name</h3>
                  {/* data from backend */}
                  <h3 className="col-span-4">Bilal Sajid</h3>
                </div>
              )}
              {isEdit && (
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-5 items-center w-full">
                      <FormLabel className="text-base-semibold text-gray-500 text-light-2">
                        Name
                      </FormLabel>
                      <div className="col-span-4">
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
              )}
              {!isEdit && (
                <div className="grid grid-cols-5 w-full items-center">
                  <h3 className="font-semibold">Email</h3>
                  {/* data from backend */}
                  <h3 className="col-span-4">hello123@gmail.com</h3>
                </div>
              )}
              {isEdit && (
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-5 items-center w-full">
                      <FormLabel className="text-base-semibold text-light-2">
                        Email
                      </FormLabel>
                      <div className="col-span-4">
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
                      </div>
                    </FormItem>
                  )}
                />
              )}
            </div>
            <div className="flex gap-x-12 my-2">
              {!isEdit && (
                <div className="grid grid-cols-5 w-full items-center">
                  <h3 className="font-semibold">Address</h3>
                  {/* data from backend */}
                  <h3 className="col-span-4">Ghafoor Nagar, New Delhi</h3>
                </div>
              )}
              {isEdit && (
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-5 items-center w-full">
                      <FormLabel className="text-base-semibold text-gray-500 text-light-2">
                        Address
                      </FormLabel>
                      <div className="col-span-4">
                        <FormControl className="col-span-3">
                          <Input
                            placeholder="Enter your address"
                            type="text"
                            className=""
                            {...field}
                          />
                        </FormControl>
                        {form?.formState?.errors?.address && (
                          <FormMessage>
                            {form?.formState?.errors?.address?.message}
                          </FormMessage>
                        )}
                      </div>
                    </FormItem>
                  )}
                />
              )}
              {!isEdit && (
                <div className="grid grid-cols-5 w-full items-center">
                  <h3 className="font-semibold">Zip Code</h3>
                  {/* data from backend */}
                  <h3 className="col-span-4">110025</h3>
                </div>
              )}
              {isEdit && (
                <FormField
                  control={form.control}
                  name="zipcode"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-5 items-center w-full">
                      <FormLabel className="text-base-semibold text-light-2">
                        Zip Code
                      </FormLabel>
                      <div className="col-span-4">
                        <FormControl className="col-span-3">
                          <Input
                            placeholder="Zip Code"
                            type="text"
                            className=""
                            {...field}
                          />
                        </FormControl>
                        {form?.formState?.errors?.zipcode && (
                          <FormMessage>
                            {form?.formState?.errors?.zipcode?.message}
                          </FormMessage>
                        )}
                      </div>
                    </FormItem>
                  )}
                />
              )}
            </div>
            <div className="flex gap-x-12 my-2">
              {!isEdit && (
                <div className="grid grid-cols-5 w-full items-center">
                  <h3 className="font-semibold">City</h3>
                  {/* data from backend */}
                  <h3 className="col-span-4">New Delhi</h3>
                </div>
              )}
              {isEdit && (
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-5 items-center w-full">
                      <FormLabel className="text-base-semibold text-gray-500 text-light-2">
                        City
                      </FormLabel>
                      <div className="col-span-4">
                        <FormControl className="col-span-3">
                          <Input
                            placeholder="City"
                            type="text"
                            className=""
                            {...field}
                          />
                        </FormControl>
                        {form?.formState?.errors?.city && (
                          <FormMessage>
                            {form?.formState?.errors?.city?.message}
                          </FormMessage>
                        )}
                      </div>
                    </FormItem>
                  )}
                />
              )}
              {!isEdit && (
                <div className="grid grid-cols-5 w-full items-center">
                  <h3 className="font-semibold">State</h3>
                  {/* data from backend */}
                  <h3 className="col-span-4">Delhi</h3>
                </div>
              )}
              {isEdit && (
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-5 items-center w-full">
                      <FormLabel className="text-base-semibold text-light-2">
                        State
                      </FormLabel>
                      <div className="col-span-4">
                        <FormControl className="col-span-3">
                          <Input
                            placeholder="State"
                            type="text"
                            className=""
                            {...field}
                          />
                        </FormControl>
                        {form?.formState?.errors?.state && (
                          <FormMessage>
                            {form?.formState?.errors?.state?.message}
                          </FormMessage>
                        )}
                      </div>
                    </FormItem>
                  )}
                />
              )}
            </div>
            <div className="flex gap-x-12 my-2">
              {!isEdit && (
                <div className="grid grid-cols-5 w-full items-center">
                  <h3 className="font-semibold">Country</h3>
                  {/* data from backend */}
                  <h3 className="col-span-4">India</h3>
                </div>
              )}
              {isEdit && (
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-5 items-center w-full">
                      <FormLabel className="text-base-semibold text-gray-500 text-light-2">
                        Country
                      </FormLabel>
                      <div className="col-span-4">
                        <FormControl className="col-span-3">
                          <Input
                            placeholder="Country"
                            type="text"
                            className=""
                            {...field}
                          />
                        </FormControl>
                        {form?.formState?.errors?.country && (
                          <FormMessage>
                            {form?.formState?.errors?.country?.message}
                          </FormMessage>
                        )}
                      </div>
                    </FormItem>
                  )}
                />
              )}
              {
                <div className="grid grid-cols-5 w-full items-center">
                  <h3 className="font-semibold">Org ID</h3>
                  {/* data from backend */}
                  <h3 className="col-span-4">23</h3>
                </div>
              }
            </div>
            {isEdit && (
              <div className="ml-auto">
                <Button className="mt-6 w-24" type="submit">
                  Submit
                </Button>
              </div>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
};

export default StudentProfile;
