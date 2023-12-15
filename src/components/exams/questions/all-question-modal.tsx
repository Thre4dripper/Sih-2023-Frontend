import {
  useDeleteQuestionMutation,
  useGetAllExamQuestionsMutation,
  useGetExamByIdMutation,
} from "@/components/api";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { EXAM_TYPE } from "@/constants/ExamType";
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
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ExamTableType } from "../exam-data-table";
import CreateQuestionModal from "./create-question-modal";

interface IProps {
  open: boolean;
  setOpen: (x: boolean) => any;
  examType: keyof typeof EXAM_TYPE;
}

export type QuestionsTableType = {
  id: number;
  question: string;
  question_type: string;
  marks: number;
  options: [{ option: string; is_correct: boolean }];
  negativeMarks: number;
  description: string;
  examId: number;
};

const AllQuestionsModal = ({ open, setOpen, examType }: IProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState<QuestionsTableType[]>([]);
  const [count, setCount] = useState<number>(0);
  const [examData, setExamData] = useState<ExamTableType>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const columns: ColumnDef<QuestionsTableType>[] = [
    {
      accessorKey: "question",
      header: "Question",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("question")}</div>
      ),
    },
    {
      accessorKey: "questionType",
      header: "Question Type",
      cell: ({ row }) => <div className="">{row.getValue("questionType")}</div>,
    },
    {
      accessorKey: "marks",
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
        <div className="lowercase">{row.getValue("marks")}</div>
      ),
    },
    {
      accessorKey: "negativeMarks",
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
        <div className="capitalize">{row.getValue("negativeMarks")}</div>
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
                onClick={() =>
                  deleteQuestion({ questionId: row?.original?.id })
                }
              >
                Delete
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

  const { mutate: getExamByIdFn } = useGetExamByIdMutation();
  const { mutate: getFilteredExamFn } = useGetAllExamQuestionsMutation();
  const { mutate: deleteQuestionFn } = useDeleteQuestionMutation();

  interface IProps {
    limit: number;
    offset: number;
  }

  const deleteQuestion = (body: { questionId: number }) => {
    console.log(body);
    deleteQuestionFn(
      { body },
      {
        onSuccess: (data: any) => {
          console.log(data);
          refetchData();
        },
        onError: (err: any) => {
          console.log(err);
        },
      }
    );
  };

  const getFilteredProducts = (body: IProps) => {
    const data = {
      limit: body.limit,
      offset: body.offset,
      examId: +searchParams.get("examId")!,
    };
    getFilteredExamFn(
      { body: data },
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
        Number(searchParams.get("qpage")) >= 1
          ? (Number(searchParams.get("qpage")) - 1) * 10
          : 0,
    });
  };

  useEffect(() => {
    if (!open) return;
    getFilteredProducts({
      limit: 10,
      offset:
        Number(searchParams.get("qpage")) >= 1
          ? (Number(searchParams.get("qpage")) - 1) * 10
          : 0,
    });
  }, [searchParams]);

  return (
    <>
      <CreateQuestionModal
        open={openCreateModal}
        setOpen={setOpenCreateModal}
        refetchData={refetchData}
        examType={examType}
      />
      <Dialog
        open={open}
        onOpenChange={() => {
          setOpen(false);
          setSearchParams((prev) => {
            prev.delete("qpage");
            prev.delete("examId");
            return prev;
          });
        }}
      >
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader className="flex flex-row items-center justify-between mt-4">
            <DialogTitle>All Questions</DialogTitle>
            <Button
              variant="default"
              size="sm"
              onClick={() => setOpenCreateModal(true)}
            >
              Add Question
            </Button>
          </DialogHeader>
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
                  let page = Number(searchParams.get("qpage"));
                  page -= 1;
                  setSearchParams((prev) => {
                    prev.set("qpage", String(page));
                    return prev;
                  });
                }}
                disabled={Number(searchParams.get("qpage")) === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  let page = Number(searchParams.get("qpage"));
                  page += 1;
                  setSearchParams((prev) => {
                    prev.set("qpage", String(page));
                    return prev;
                  });
                }}
                disabled={Number(searchParams.get("qpage")) * 10 > count}
              >
                Next
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AllQuestionsModal;
