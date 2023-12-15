import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronsUpDown, GripHorizontal } from "lucide-react";
import React, { useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EXAM_TYPE_MAPPING } from "@/constants/ExamType";
import { SDFormat } from "@/helper/DateHelper";
import { useSearchParams } from "react-router-dom";
import { useGetAllExamsMutation } from "../api";
import CreateExamModal from "./create-update-exam-modal";

export type Payment = {
  id: number;
  organizationId: number;
  name: string;
  email: string;
};

export function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  let [searchParams, setSearchParams] = useSearchParams();
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [data, setData] = React.useState<Payment[]>([]);
  const [count, setCount] = React.useState<number>(0);
  const [openCreateModal, setOpenCreateModal] = React.useState<boolean>(false);
  const [openUpdateModal, setOpenUpdateModal] = React.useState<boolean>(false);

  const columns: ColumnDef<Payment>[] = [
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
              <DropdownMenuItem>Add Questions</DropdownMenuItem>
              <DropdownMenuItem>Add Students</DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setSearchParams((prev) => {
                    prev.append("examId", String(row?.original?.id));
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

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const { mutate: getFilteredExamFn } = useGetAllExamsMutation();

  interface IProps {
    limit: number;
    offset: number;
  }

  const getFilteredProducts = (body: IProps) => {
    getFilteredExamFn(
      { body },
      {
        onSuccess: (data: any) => {
          console.log(data);
          setData((prev) => {
            return data?.data?.rows;
          });
          setCount((prev) => {
            return data?.data?.count;
          });
        },
        onError: (err: any) => {
          console.log(err);
        },
      }
    );
  };

  const refetchData = () => {
    getFilteredProducts({
      limit: 10,
      offset:
        Number(searchParams.get("page")) >= 1
          ? (Number(searchParams.get("page")) - 1) * 10
          : 0,
    });
  };

  useEffect(() => {
    getFilteredProducts({
      limit: 10,
      offset:
        Number(searchParams.get("page")) >= 1
          ? (Number(searchParams.get("page")) - 1) * 10
          : 0,
    });
  }, [searchParams]);

  return (
    <div className="w-full">
      <CreateExamModal
        open={openCreateModal ? openCreateModal : openUpdateModal}
        isCreateModal={openCreateModal}
        setOpen={openCreateModal ? setOpenCreateModal : setOpenUpdateModal}
        refetchData={refetchData}
      />
      <div className="flex items-center justify-between py-4">
        <h1 className="text-xl font-semibold">All Exams</h1>
        <Button
          variant="default"
          size="sm"
          onClick={() => {
            setOpenCreateModal(true);
          }}
        >
          Add Exam
        </Button>
      </div>
      <div className="overflow-auto border rounded-md ">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id} // ???
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end py-4 space-x-2">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              let page = Number(searchParams.get("page"));
              page -= 1;
              setSearchParams({ page: String(page) });
            }}
            disabled={Number(searchParams.get("page")) === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              let page = Number(searchParams.get("page"));
              page += 1;
              setSearchParams({ page: String(page) });
            }}
            disabled={Number(searchParams.get("page")) * 10 > count}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
