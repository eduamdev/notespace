import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addItem, getItem, deleteItem } from "@/services/database-service";
import { STORE_NAMES } from "@/lib/constants";

interface AuthResponse {
  token: string;
}

const fetchToken = async (data: {
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  //   const response = await fetch("/api/login", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   });

  //   if (!response.ok) {
  //     throw new Error("Network response was not ok");
  //   }

  //   return response.json();

  console.log(data);

  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  console.log(response);

  return {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.tPaOrZOmxSsK6VVxL_oHRdqplpxlyizeoQBhBmjskFg",
  };
};

const fetchSignup = async (data: { email: string; password: string }) => {
  const response = await fetch("/api/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation(fetchToken, {
    onSuccess: async (data: { token: unknown }) => {
      await addItem(STORE_NAMES.AUTH, { id: "token", data: data.token });
      queryClient.setQueryData(["auth"], data.token);
    },
  });
};

export const useSignup = () => {
  return useMutation(fetchSignup);
};

export const useAuth = () => {
  const queryClient = useQueryClient();
  return queryClient.getQueryData<string>(["auth"]);
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  return async () => {
    await deleteItem(STORE_NAMES.AUTH, "token");
    queryClient.setQueryData(["auth"], null);
  };
};

export const useLoadAuthFromStorage = () => {
  const queryClient = useQueryClient();
  return async () => {
    const token = await getItem(STORE_NAMES.AUTH, "token");
    console.log("token", token);
    if (token) {
      queryClient.setQueryData(["auth"], token);
    }
  };
};
