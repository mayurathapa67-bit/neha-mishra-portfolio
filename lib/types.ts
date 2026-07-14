export type Submission = {
  id: string;
  name: string;
  email: string;
  project: string;
  message: string;
  createdAt: string;
};

export type EnvStatus = {
  admin: boolean;
  github: boolean;
  cloudinary: boolean;
};
