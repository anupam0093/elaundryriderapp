import { login } from "./api";
import { Login } from "./types";
import { useMutation } from "react-query";

// Login
export const useLogin = () =>
  useMutation(
    ({ username, password }: Login): Promise<Object> =>
      login(username, password)
  );
