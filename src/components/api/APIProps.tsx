export interface CreateAdminProps {
  body: { profilePic: string; name: string; password: string; email: string };
}

export interface LoginUserProps {
  body: { email: string; password: string };
}
