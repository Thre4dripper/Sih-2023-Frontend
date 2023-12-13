import { ChangeEvent, useState, useEffect } from "react";
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
import { UserValidation } from "@/lib/validations/user";
import { z } from "zod";
import { isBase64Image } from "@/lib/utils";

const CreateAccount = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [open, setOpen] = useState(false);
  let [searchParams, setSearchParams] = useSearchParams();

  const form = useForm({
    resolver: zodResolver(UserValidation),
    defaultValues: {
      profile_photo: "",
      name: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (searchParams.get("modal") === "signup") {
      setOpen((prev) => {
        return true;
      });
    }
  }, [searchParams.get("modal")]);

  const onSubmit = async (values: z.infer<typeof UserValidation>) => {
    console.log(values);

    const blob = values?.profile_photo;

    const hasImageChanged = isBase64Image(blob);

    if (hasImageChanged) {
      // create a startUpload function to upload to cloudinary
      //   const imgRes = await startUpload(files);
      //   if (imgRes && imgRes[0]?.url) {
      //     values.profile_photo = imgRes[0].url;
      //   }
    }

    // api call to save user to database (also check for existing user)

    setSearchParams({});
    setOpen(false);
  };

  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();
    const fileReader = new FileReader();
    if (e?.target?.files && e?.target?.files?.length > 0) {
      const file = e?.target?.files[0];

      setFiles(Array.from(e?.target?.files));

      if (!file?.type?.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event?.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);
    }
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
          <DialogTitle>Register</DialogTitle>
          <DialogDescription>Create Your Account.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col justify-start gap-5"
          >
            <FormField
              control={form.control}
              name="profile_photo"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center gap-4">
                  <FormLabel className="">
                    {field?.value ? (
                      <img
                        src={field?.value}
                        alt="profile_image"
                        width={96}
                        height={96}
                        style={{ width: 64, height: 64, borderRadius: "100%" }}
                        className="rounded-full object-contain"
                      />
                    ) : (
                      <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbHvZ2JK-oa1Hcq0hCVxF-PDwfMQY09ocJ3A&usqp=CAU"
                        alt="profile_image"
                        width={96}
                        height={96}
                        style={{ width: 64, height: 64, borderRadius: "100%" }}
                        className="object-contain"
                      />
                    )}
                  </FormLabel>
                  <FormControl className="flex-1  col-span-3 text-base-semibold text-gray-400">
                    <Input
                      type="file"
                      accept="image/*"
                      placeholder="Upload a photo"
                      className=""
                      onChange={(e) => handleImage(e, field?.onChange)}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 items-center w-full">
                  <FormLabel className="text-base-semibold text-gray-500 text-light-2">
                    Name
                  </FormLabel>
                  <FormControl className="col-span-3">
                    <Input
                      placeholder="Enter your name"
                      type="text"
                      className=""
                      {...field}
                    />
                  </FormControl>
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

export default CreateAccount;
