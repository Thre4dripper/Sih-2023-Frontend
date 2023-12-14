export interface CreateAdminProps {
  body: { profilePic: string; name: string; password: string; email: string };
}

export interface LoginUserProps {
  body: { email: string; password: string };
}

export interface CreateProctorProps {
  body: { email: string; password: string; name: string };
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
