import { ColumnDef } from "@tanstack/react-table";

import { EXAM_TYPE_MAPPING } from "@/constants/ExamType";
import { SDFormat } from "@/helper/DateHelper";

import { ChevronsUpDown, GripHorizontal } from "lucide-react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

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

export interface IExam {
  id: number;
  name: string;
  duration: number;
  startTime: string;
  totalQuestions: number;
  examType: string;
  desription: string;
  passingMarks: number;
}

interface ITableConfig {
  setOpenAllQuestionsModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenUpdateModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const TableConfig = ({
  setOpenAllQuestionsModal,
  setOpenUpdateModal,
}: ITableConfig) => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const params = new URLSearchParams(search);
  const columnsConfig: ColumnDef<IExam>[] = [
    // {
    //   id: "select",
    //   header: ({ table }) => (
    //     <div className="flex justify-center">
    //       <Checkbox
    //         checked={
    //           table.getIsAllPageRowsSelected() ||
    //           (table.getIsSomePageRowsSelected() && "indeterminate")
    //         }
    //         onCheckedChange={(value) =>
    //           table.toggleAllPageRowsSelected(!!value)
    //         }
    //         aria-label="Select all"
    //       />
    //     </div>
    //   ),
    //   cell: ({ row }) => (
    //     <Checkbox
    //       checked={row.getIsSelected()}
    //       onCheckedChange={(value) => row.toggleSelected(!!value)}
    //       aria-label="Select row"
    //     />
    //   ),
    //   enableSorting: true,
    //   enableHiding: true,
    // },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "duration",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Duration
            <ChevronsUpDown className="w-4 h-4 ml-2" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("duration")}</div>
      ),
    },
    {
      accessorKey: "startTime",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Start Time
            <ChevronsUpDown className="w-4 h-4 ml-2" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">{SDFormat(row.getValue("startTime"))}</div>
      ),
    },
    {
      accessorKey: "totalQuestions",
      header: () => <div className="">Total Questions</div>,
      cell: ({ row }) => {
        return (
          <div className="font-medium">{row.getValue("totalQuestions")}</div>
        );
      },
    },
    {
      accessorKey: "examType",
      header: () => <div className="">Exam Type</div>,
      cell: ({ row }) => {
        return (
          <div className="font-medium ">
            {
              EXAM_TYPE_MAPPING[
                row.getValue("examType") as keyof typeof EXAM_TYPE_MAPPING
              ]
            }
          </div>
        );
      },
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
                  setSearchParams((prev) => {
                    prev.set("examId", String(row?.original?.id));
                    prev.set("qpage", "1");
                    return prev;
                  });
                  setOpenAllQuestionsModal(true);
                }}
              >
                Add Questions
              </DropdownMenuItem>
              <DropdownMenuItem>Add Students</DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setSearchParams((prev) => {
                    prev.set("examId", String(row?.original?.id));
                    return prev;
                  });
                  setOpenUpdateModal(true);
                }}
              >
                Update Exam
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
