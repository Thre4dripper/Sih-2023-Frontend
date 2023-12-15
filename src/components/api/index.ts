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
};

export const useCreateAdminMutation = () => {
  return useMutation([QUERY_KEYS.createAdmin], ENDPOINTS.createAdmin);
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

export const useUpdateExamMutation=()=>{
  return useMutation([QUERY_KEYS.updateExam], ENDPOINTS.updateExam);
}

export const useGetExamByIdMutation=()=>{
  return useMutation([QUERY_KEYS.getExamById], ENDPOINTS.getExamById);
}