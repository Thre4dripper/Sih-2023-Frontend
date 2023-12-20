import {
  useGetAllStudentsByExamIdMutation,
  useGetStudentsMutation,
  useSendEmailMutation,
  useVerifyStudentMutation,
} from "@/components/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DataTable from "@/components/ui/table/data-table";
import { PlusCircleIcon, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { IExam } from "../exams/exam-table-config";
import { IStudent } from "../students/student-data-table-config";
import TableConfig from "./approvalsTableConfig";
import { useToast } from "../ui/use-toast";

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
  const { toast } = useToast();

  interface IProps {
    limit: number;
    offset: number;
  }
  const verifyStudent = (studentId: number) => {
    verifyStudentFn(
      { body: { studentId } },
      {
        onSuccess: (data: any) => {
          toast({
            title: "Student Verified",
            description: "Student has been verified successfully",
            duration: 5000,
          });

          refetchData();
        },
        onError: (err: any) => {
          console.log(err);
        },
      }
    );
  };
  const columnsConfig = TableConfig({
    verifyStudent,
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
            Students Approvals
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
    </div>
  );
};

export default StudentApprovals;
