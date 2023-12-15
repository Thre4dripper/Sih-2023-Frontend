export interface CreateAdminProps {
  body: { profilePic: string; name: string; password: string; email: string };
}

export interface LoginUserProps {
  body: { email: string; password: string };
}

export interface CreateProctorProps {
  body: { email: string; password: string; name: string };
}

export interface GetAllProctorsProps {
  body: { limit: Number; offset: Number };
}

export interface RemoveProctorProps {
  body: { proctorId: number };
}

export interface CreateExamProps {
  body: {
    name: string;
    description: string;
    duration: number;
    startTime: string;
    passingMarks: number;
    totalQuestions: number;
    examType: string;
  };
}

export interface GetAllExamsProps {
  body: { limit: Number; offset: Number };
}

export interface UpdateExamProps {
  body: {
    id: number;
    name: string;
    description: string;
    duration: number;
    startTime: string;
    passingMarks: number;
    totalQuestions: number;
    examType: string;
  };
}

export interface GetExamByIdProps {
  body: { examId: number };
}

export interface GetExamAllQuestionsProps {
  body: { examId: number; limit: Number; offset: Number };
}
