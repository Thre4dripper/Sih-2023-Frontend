import { ColumnDef } from "@tanstack/react-table";

import { Check, GripHorizontal, StopCircle, X } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Checkbox } from "../ui/checkbox";

export enum StatusFilter {
  Pending = "pending",
  Approved = "approved",
  Rejected = "rejected",
  ModificationRequired = "modification_requested",
}

export enum StateFilter {
  Active = "active",
  Inactive = "inactive",
}

export interface IStudent {
  id: number;
  name: string;
  email: string;
  organizationId: string;
}

interface ITableConfig {
  verifyStudent?: (studentId: number) => void;
}

const TableConfig = ({ verifyStudent }: ITableConfig) => {
  const columnsConfig: ColumnDef<IStudent>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <div className="flex justify-center">
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
          />
        </div>
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      // enableSorting: true,
      // enableHiding: true,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <div className="">{row.getValue("email")}</div>,
    },
    {
      accessorKey: "organizationId",
      header: "Organization Id",
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("organizationId")}</div>
      ),
    },
    {
      accessorKey: "aadharPic",
      header: "Aadhar Pic",
      cell: ({ row }) => (
        <div>
          <img
            className="w-20 h-20
            cursor-pointer
          hover:scale-110 transition-all duration-300
          "
            src={row.getValue("aadharPic")}
            alt=""
          />
        </div>
      ),
    },
    {
      accessorKey: "panPic",
      header: "Pan Pic",
      cell: ({ row }) => (
        <div>
          <img
            className="
          hover:scale-110 transition-all duration-300
          cursor-pointer
          w-20 h-20"
            src={row.getValue("panPic")}
            alt=""
          />
        </div>
      ),
    },
    {
      accessorKey: "isVerified",
      header: "Status",
      cell: ({ row }) => (
        <>
          {row.getValue("isVerified") ? (
            <p className="text-green-500 flex gap-1 items-start">
              <Check className="w-4 h-4" />
              &nbsp; Approved
            </p>
          ) : (
            <p className="text-yellow-500 flex gap-1 items-start">
              <StopCircle className="w-4 h-4" />
              &nbsp; Pending
            </p>
          )}
        </>
      ),
    },
    {
      id: "actions",
      accessorKey: "Actions",
      enableHiding: false,
      cell: ({ row }) => {
        //   console.log(row?.original?.id);
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-8 h-8 p-0 ">
                <span className="sr-only">Open menu</span>
                <GripHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  verifyStudent && verifyStudent(row?.original?.id);
                }}
              >
                <Check className="w-4 h-4 ml-2 text-green-600" />
                &nbsp; Approve
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  console.log(row?.original);
                }}
              >
                <X className="w-4 h-4 ml-2 text-destructive" />
                &nbsp; Reject
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return columnsConfig;
};

export default TableConfig;

/*
{
    "id": 4,
    "organizationId": 2,
    "name": "Vicky Gupta",
    "email": "vickyguptaa7@gmail.com",
    "password": "$2b$10$Hxdmk6JMfIc4DC/QVXw8H./n220tkd3ROgamRJcJKd47OTgSGKbcK",
    "phone": null,
    "role": "student",
    "profilePic": "https://res.cloudinary.com/dntn0wocu/image/upload/v1703024055/Blog-app/odwwmjjz4htnrcicv1yu.png",
    "aadharNumber": "909094608474",
    "aadharPic": "https://res.cloudinary.com/dntn0wocu/image/upload/v1703024056/Blog-app/i0i6ekhldoq39tsfpyp3.png",
    "panNumber": "DOZPG8441D",
    "panPic": "https://res.cloudinary.com/dntn0wocu/image/upload/v1703024057/Blog-app/g5hra09xwmvmzdrgpgp5.png",
    "address": null,
    "isVerified": 1,
    "city": null,
    "state": null,
    "country": null,
    "zipCode": null,
    "createdAt": "2023-12-19T22:14:21.915Z",
    "updatedAt": "2023-12-19T22:44:29.688Z"
}
*/
