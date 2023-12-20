import {
  useGetStudentsMutation,
  useStudentLogsMutation,
  useVerifyStudentMutation,
} from "@/components/api";
import { Input } from "@/components/ui/input";
import DataTable from "@/components/ui/table/data-table";
import { showToast } from "@/lib/showToast";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { IExam } from "../exams/exam-table-config";
import { IStudent } from "../students/student-data-table-config";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import TableConfig from "./approvalsTableConfig";

interface IProps {
  examData: IExam;
}

const StudentApprovals = () => {
  const [studentsList, setStudentsList] = useState<IStudent[]>([]);
  const [totalStudents, setTotalStudents] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const { mutate: verifyStudentFn } = useVerifyStudentMutation();
  const { mutate: getAllStudents } = useGetStudentsMutation();
  const { mutate: viewLogsFn } = useStudentLogsMutation();
  const [open, setOpen] = useState<boolean>(false);
  const [logData, setLogData] = useState<any>();

  interface IProps {
    limit: number;
    offset: number;
  }
  const verifyStudent = (studentId: number) => {
    verifyStudentFn(
      { body: { studentId } },
      {
        onSuccess: (data: any) => {
          showToast("Student has been verified successfully", "success");

          refetchData();
        },
        onError: (err: any) => {
          console.log(err);
        },
      }
    );
  };

  const viewLogs = (studentId: number, examId: number) => {
    viewLogsFn(
      { body: { studentId, examId } },
      {
        onSuccess: (data: any) => {
          setLogData(data?.data?.[0].activity);
          setOpen(true);
          showToast("Logs have been fetched successfully", "success");
        },
        onError: (err: any) => {
          console.log(err);
        },
      }
    );
  };

  const columnsConfig = TableConfig({
    verifyStudent,
    viewLogs,
  });

  const getFilteredStudents = (body: any) => {
    getAllStudents(
      { body },
      {
        onSuccess: (data: any) => {
          setStudentsList(data.data.rows);
          setTotalStudents(data?.data?.count);
        },
        onError: (err: any) => {
          console.log(err);
        },
      }
    );
  };
  const refetchData = () => {
    getFilteredStudents({
      limit: 10,
      offset: Number(page) >= 1 ? (page - 1) * pageSize : 0,
    });
  };

  useEffect(() => {
    getFilteredStudents({
      limit: pageSize,
      offset: page >= 1 ? (page - 1) * pageSize : 0,
    });
    // setSearchParams({ page: page.toString() });
  }, [page, pageSize]);

  return (
    <div className="px-12 flex py-12 min-h-[90vh] flex-col  gap-8">
      <div className="w-full">
        <div className={"flex gap-8 mb-4"}>
          <span className={"font-semibold text-3xl text-slate-500"}>
            Students Logs and Details
          </span>
          <div className={"flex-1"} />
          {/* <DataTableFilters
            filters={[
              { name: roleFilter, onClear: () => setRoleFilter(null) },
              { name: genderFilter, onClear: () => setGenderFilter(null) },
              { name: statusFilter, onClear: () => setStatusFilter(null) },
            ]}
          /> */}
          <div className="flex items-center justify-center gap-4">
            <Search size={20} className={"text-slate-500"} />
            <Input className={"w-72"} placeholder={"Search students..."} />
          </div>
        </div>
        <div className="overflow-auto border rounded-md ">
          <DataTable
            columns={columnsConfig}
            data={studentsList}
            totalRows={totalStudents}
            page={page}
            setPage={setPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            isSelect={true}
            buttonOnClick={() => {}}
            buttonName={"Send Email"}
          />
        </div>
      </div>
      <Dialog
        open={open}
        onOpenChange={() => {
          setOpen(false);
        }}
      >
        <DialogContent className="w-full h-full">
          <DialogHeader className="flex flex-row items-center justify-between mt-4">
            <DialogTitle>Student Logs</DialogTitle>
            {JSON.stringify(logData)}
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StudentApprovals;
