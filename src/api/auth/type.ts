export type TLoginParam = {
  email: string;
  password: string;
};

export type TLoginResponse = {
  data: {
    access_token: string;
    refresh_token: string;
  };
};
