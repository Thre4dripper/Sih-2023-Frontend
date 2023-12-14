import { apiClient } from "@/lib/providers/api-provider";
import {
  CreateAdminProps,
  CreateProctorProps,
  GetAllProctorsProps,
  LoginUserProps,
} from "./APIProps";

export const createAdmin = ({ body }: CreateAdminProps): Promise<any> =>
  apiClient("/api/v1/register-organization/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

export const UserLogin = ({ body }: LoginUserProps): Promise<any> =>
  apiClient("/api/v1/login-organization/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

export const createProctor = ({ body }: CreateProctorProps): Promise<any> =>
  apiClient("/api/v1/create-proctor/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("OrgToken"),
    },
    body: JSON.stringify(body),
  });

export const getAllProctors = ({ body }: GetAllProctorsProps): Promise<any> => {
  return apiClient(
    `/api/v1/get-all-proctors?limit=${body?.limit}&offset=${body?.offset}`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("OrgToken"),
      },
    }
  );
};
