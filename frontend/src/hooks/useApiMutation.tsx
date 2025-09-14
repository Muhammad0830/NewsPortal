import { useMutation, UseMutationResult } from "@tanstack/react-query";
import api from "@/lib/api";

export function useApiMutation<TResponse = unknown, TVariables = unknown>(
  url: string,
  method: "post" | "put" | "delete" = "post"
): UseMutationResult<TResponse, Error, TVariables> {
  return useMutation<TResponse, Error, TVariables>({
    mutationFn: async (data: TVariables) => {
      const response = await api[method]<TResponse>(url, data);
      return response.data;
    },
    // eslint-disable-next-line
    onError: (error: any) => {
      throw new Error(error.message);
    },
  });
}
