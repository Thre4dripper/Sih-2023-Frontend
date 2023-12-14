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
