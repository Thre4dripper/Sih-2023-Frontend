import * as z from "zod";

export const UserValidation = z.object({
  profilePic: z.string().url().min(1),
  name: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(30, { message: "Name cannot be longer than 30 characters." }),
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  password: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(15, { message: "username cannot be longer than 15 characters." }),
});

export const StudentRegisterValidation = z.object({
  name: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(30, { message: "Name cannot be longer than 30 characters." }),
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  password: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(15, { message: "username cannot be longer than 15 characters." }),
  organizationId: z.string().min(1, { message: "This field cannot be empty." }),
});

export const LoginValidation = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  password: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(15, { message: "username cannot be longer than 15 characters." }),
});

export const StudentProctorValidation = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  password: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(15, { message: "username cannot be longer than 15 characters." }),
  organizationId: z.string().min(1, { message: "This field cannot be empty." }),
  // userType: z.string().min(1, { message: "Please Select a user type." }),
});

export const ProctorValidation = z.object({
  name: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(30, { message: "Name cannot be longer than 30 characters." }),
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  password: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(15, { message: "username cannot be longer than 15 characters." }),
});

export const ExamValidation = z.object({
  name: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(30, { message: "Name cannot be longer than 30 characters." }),
  description: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(200, { message: "Description cannot be longer than 200 characters." }),
  duration: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .max(120, { message: "Duration cannot be longer than 120 hours." }),
  startTime: z.string().min(1, { message: "This field has to be filled." }),
  passingMarks: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .max(10000, { message: "Passing marks cannot be more than 10000." }),
  totalQuestions: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .max(100, { message: "Total questions cannot be more than 100." }),
  examType: z.string().min(1, { message: "This field has to be filled." }),
});

export const QuestionValidation = z.object({
  examId: z.string().min(1, { message: "This field has to be filled." }),
  question: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(200, { message: "Question cannot be longer than 200 characters." }),
  description: z
    .string()
    .min(3, { message: "Minimum 3 characters." })
    .max(200, { message: "Description cannot be longer than 200 characters." }),
  questionType: z.string().min(1, { message: "This field has to be filled." }),
  marks: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .max(10000, { message: "Marks cannot be more than 10000." }),
  negativeMarks: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .max(10000, { message: "Negative marks cannot be more than 10000." }),
  options: z.array(
    z.object({
      option: z.string().min(1, { message: "This field has to be filled." }),
      isCorrect: z.boolean(),
    })
  ),
});
