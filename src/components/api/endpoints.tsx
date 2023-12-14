import { apiClient } from "@/lib/providers/api-provider";
import { CreateAdminProps } from "./APIProps";

export const createAdmin = ({ body }: CreateAdminProps): Promise<any> =>
  apiClient("/api/v1/register-organization/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
