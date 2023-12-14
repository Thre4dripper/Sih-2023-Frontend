import * as ENDPOINTS from "./endpoints";
import { useQuery, useMutation } from "@tanstack/react-query";

export const QUERY_KEYS = {
  createAdmin: "createAdmin",
  loginUser: "loginUser",
};

export const useCreateAdminMutation = () => {
  return useMutation([QUERY_KEYS.createAdmin], ENDPOINTS.createAdmin);
};

export const useLoginUserMutation = () => {
  return useMutation([QUERY_KEYS.loginUser], ENDPOINTS.UserLogin);
};
