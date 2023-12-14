import * as ENDPOINTS from "./endpoints";
import { useQuery, useMutation } from "@tanstack/react-query";

export const QUERY_KEYS = {
  createAdmin: "createAdmin",
};

export const useCreateAdminMutation = () => {
  return useMutation([QUERY_KEYS.createAdmin], ENDPOINTS.createAdmin);
};
