import { useMutation } from "@tanstack/react-query";
import * as ENDPOINTS from "./endpoints";

export const QUERY_KEYS = {
  createAdmin: "createAdmin",
  loginUser: "loginUser",
  createProctor: "createProctor",
  getAllProctors: "getAllProctors",
  removeProctor: "removeProctor",
  createExam: "createExam",
  getAllExams: "getAllExams",
  updateExam: "updateExam",
  getExamById: "getExamById",
  getAllExamQuestions: "getAllExamsQuestions",
  createExamQuestion: "createExamQuestion",
  deleteExamQuestion: "deleteExamQuestion",
  loginStudent: "loginStudent",
  loginProctor: "loginProctor",
  createStudent: "createStudent",
  getStudents: "getStudents",
  addStudents: "addStudents",
  sendEmail: "sendEmail",
};

export const useCreateAdminMutation = () => {
  return useMutation([QUERY_KEYS.createAdmin], ENDPOINTS.createAdmin);
};

export const useCreateStudentMutation = () => {
  return useMutation([QUERY_KEYS.createStudent], ENDPOINTS.createStudent);
};

export const useLoginUserMutation = () => {
  return useMutation([QUERY_KEYS.loginUser], ENDPOINTS.UserLogin);
};

export const useCreateProctorMutation = () => {
  return useMutation([QUERY_KEYS.createProctor], ENDPOINTS.createProctor);
};

export const useGetAllProctorsMutation = () => {
  return useMutation([QUERY_KEYS.getAllProctors], ENDPOINTS.getAllProctors);
};

export const useRemoveProctorMutation = () => {
  return useMutation([QUERY_KEYS.removeProctor], ENDPOINTS.removeProctor);
};

export const useCreateExamMutation = () => {
  return useMutation([QUERY_KEYS.createExam], ENDPOINTS.createExam);
};

export const useGetAllExamsMutation = () => {
  return useMutation([QUERY_KEYS.getAllExams], ENDPOINTS.getAllExams);
};

export const useUpdateExamMutation = () => {
  return useMutation([QUERY_KEYS.updateExam], ENDPOINTS.updateExam);
};

export const useGetExamByIdMutation = () => {
  return useMutation([QUERY_KEYS.getExamById], ENDPOINTS.getExamById);
};

export const useGetAllExamQuestionsMutation = () => {
  return useMutation(
    [QUERY_KEYS.getAllExamQuestions],
    ENDPOINTS.getAllExamQuestions
  );
};

export const useCreateExamQuestionMutation = () => {
  return useMutation(
    [QUERY_KEYS.createExamQuestion],
    ENDPOINTS.createExamQuestion
  );
};

export const useDeleteQuestionMutation = () => {
  return useMutation(
    [QUERY_KEYS.deleteExamQuestion],
    ENDPOINTS.deleteExamQuestion
  );
};

export const useLoginStudentMutation = () => {
  return useMutation([QUERY_KEYS.loginStudent], ENDPOINTS.StudentLogin);
};

export const useLoginProctorMutation = () => {
  return useMutation([QUERY_KEYS.loginProctor], ENDPOINTS.ProctorLogin);
};

export const useGetStudentsMutation = () => {
  return useMutation([QUERY_KEYS.getStudents], ENDPOINTS.getStudents);
};

export const useSendEmailMutation = () => {
  return useMutation([QUERY_KEYS.sendEmail], ENDPOINTS.sendEmail);
};

// export const useAddStudentsMutation = () => {
//   return useMutation([QUERY_KEYS.addStudents], ENDPOINTS.addStudents);
// };
