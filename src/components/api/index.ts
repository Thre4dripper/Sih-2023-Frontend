import { useMutation } from "@tanstack/react-query";
import * as ENDPOINTS from "./endpoints";

export const QUERY_KEYS = {
  createAdmin: "createAdmin",
  loginUser: "loginUser",
  createProctor: "createProctor",
  createExam: "createExam",
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

export const useCreateExamMutation = () => {
  return useMutation([QUERY_KEYS.createExam], ENDPOINTS.createExam);
}