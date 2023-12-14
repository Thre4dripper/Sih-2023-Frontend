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
import { ExamValidation } from "@/lib/validations/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectGroup } from "@radix-ui/react-select";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateExamMutation } from "../api";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

function isNumber(value: any): boolean {
  return typeof value === "number" && !isNaN(value);
}

const CreateExam = () => {
  const { mutate: registerExamFn } = useCreateExamMutation();
  const [serverErrors, setServerErrors] = useState({
    // email: false,
  });

  const form = useForm({
    resolver: zodResolver(ExamValidation),
    defaultValues: {
      name: "",
      description: "",
      duration: "",
      startTime: "",
      passingMarks: "",
      totalQuestions: "",
      examType: "",
    },
  });

  interface BProps {
    name: string;
    description: string;
    duration: number;
    startTime: string;
    passingMarks: number;
    totalQuestions: number;
    examType: string;
  }

  const createExam = (body: BProps) => {
    registerExamFn(
      { body },
      {
        onSuccess: (data: any) => {
          console.log(data);
          form?.reset();
        },
        onError: (err: any) => {
          console.log(err);
          setServerErrors((prev) => {
            return {
              // email: true,
            };
          });
        },
      }
    );
  };

  const onSubmit = async (values: z.infer<typeof ExamValidation>) => {
    if (!isNumber(+values?.duration)) {
      form.setError("duration", {
        message: "Duration must be a number",
      });
      return;
    }
    if (!isNumber(+values?.passingMarks)) {
      form.setError("passingMarks", {
        message: "Passing marks must be a number",
      });
      return;
    }
    if (!isNumber(+values?.totalQuestions)) {
      form.setError("totalQuestions", {
        message: "Total questions must be a number",
      });
      return;
    }
    createExam({
      name: values?.name,
      description: values?.description,
      duration: +values?.duration,
      startTime: values?.startTime,
      passingMarks: +values?.passingMarks,
      totalQuestions: +values?.totalQuestions,
      examType: values?.examType,
    });
  };

  return (
    <div className="sm:p-8 p-6 py-16 min-h-[90vh] shadow-md flex justify-center items-center">
      <div className="flex flex-col p-6 py-16 bg-gray-100 rounded-sm w-[100%] sm:w-[80%] md:w-[60%] lg:w-[50%] xl:w-[40%] h-[60%]">
        <h1 className="text-2xl font-bold text-gray-600 text-center mb-[0.5rem]">
          Create Exam
        </h1>
        <h1 className="text-xl font-semibold text-gray-600 text-center mb-[2rem]">
          Enter the details of the Exam
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col justify-start gap-5 w-[100%]"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grid items-center w-full grid-cols-4">
                  <FormLabel className="text-base text-gray-500">
                    Name
                  </FormLabel>
                  <div className="col-span-3">
                    <FormControl className="">
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
              name="description"
              render={({ field }) => (
                <FormItem className="grid items-center w-full grid-cols-4">
                  <FormLabel className="text-base text-gray-500">
                    Description
                  </FormLabel>
                  <div className="col-span-3">
                    <FormControl
                      onChange={() =>
                        setServerErrors((prev) => ({ ...prev, email: false }))
                      }
                      className=""
                    >
                      <Textarea
                        placeholder="Description"
                        className="focus-visible:ring-0 ring-0"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    {form?.formState?.errors?.description && (
                      <FormMessage>
                        {form?.formState?.errors?.description?.message}
                      </FormMessage>
                    )}
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem className="grid items-center w-full grid-cols-4">
                  <FormLabel className="text-base text-gray-500">
                    Duration
                  </FormLabel>
                  <div className="col-span-3">
                    <FormControl className="">
                      <Input
                        type="number"
                        placeholder="Duration"
                        inputMode="numeric"
                        className=""
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    {/* {form?.formState?.errors?.duration && (
                      <FormMessage>
                        {form?.formState?.errors?.duration?.message}
                      </FormMessage>
                    )} */}
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startTime"
              render={({ field }) => (
                <FormItem className="grid items-center w-full grid-cols-4">
                  <FormLabel className="text-base text-gray-500">
                    Start Time
                  </FormLabel>
                  <div className="col-span-3">
                    <FormControl className="">
                      <input
                        type="datetime-local"
                        className=""
                        {...field}
                      ></input>
                    </FormControl>
                    {form?.formState?.errors?.startTime && (
                      <FormMessage>
                        {form?.formState?.errors?.startTime?.message}
                      </FormMessage>
                    )}
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="passingMarks"
              render={({ field }) => (
                <FormItem className="grid items-center w-full grid-cols-4">
                  <FormLabel className="text-base text-gray-500">
                    Passing Marks
                  </FormLabel>
                  <div className="col-span-3">
                    <FormControl className="">
                      <Input
                        placeholder="Passing Marks"
                        type="number"
                        className=""
                        {...field}
                      />
                    </FormControl>
                    {form?.formState?.errors?.passingMarks && (
                      <FormMessage>
                        {form?.formState?.errors?.passingMarks?.message}
                      </FormMessage>
                    )}
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="totalQuestions"
              render={({ field }) => (
                <FormItem className="grid items-center w-full grid-cols-4">
                  <FormLabel className="text-base text-gray-500">
                    Total Questions
                  </FormLabel>
                  <div className="col-span-3">
                    <FormControl className="">
                      <Input
                        placeholder="Total Questions"
                        type="number"
                        className=""
                        {...field}
                      />
                    </FormControl>
                    {form?.formState?.errors?.totalQuestions && (
                      <FormMessage>
                        {form?.formState?.errors?.totalQuestions?.message}
                      </FormMessage>
                    )}
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="examType"
              render={({ field }) => {
                return (
                  <FormItem className="grid items-center w-full grid-cols-4">
                    <FormLabel className="text-base text-gray-500">
                      Exam Type
                    </FormLabel>
                    <div className="col-span-3">
                      <FormControl className="">
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          {...field}
                        >
                          <SelectTrigger className="">
                            <SelectValue placeholder="Select exam type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="mcq">Mcq</SelectItem>
                              <SelectItem value="coding">Coding</SelectItem>
                              <SelectItem value="both">Both</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      {form?.formState?.errors?.examType && (
                        <FormMessage>
                          {form?.formState?.errors?.examType?.message}
                        </FormMessage>
                      )}
                    </div>
                  </FormItem>
                );
              }}
            />
            <Button variant={"default"} className="mt-[1rem]" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateExam;
