import { useMutation, UseMutationResult } from "@tanstack/react-query";
import api from "@/lib/api";

// URL can be a string or a function that builds it dynamically from the variables
type UrlOrFn<TVariables> = string | ((vars: TVariables) => string);

export function useApiMutation<TResponse = unknown, TVariables = unknown>(
  url: UrlOrFn<TVariables>,
  method: "post" | "put" | "delete" = "post"
): UseMutationResult<TResponse, Error, TVariables> {
  return useMutation<TResponse, Error, TVariables>({
    mutationFn: async (data: TVariables) => {
      const resolvedUrl = typeof url === "function" ? url(data) : url;

      // DELETE requests usually don’t have a body
      if (method === "delete") {
        const response = await api.delete<TResponse>(resolvedUrl);
        return response.data;
      }

      // POST/PUT send body
      const response = await api[method]<TResponse>(resolvedUrl, data);
      return response.data;
    },
    // eslint-disable-next-line
    onError: (error: any) => {
      throw new Error(error.message);
    },
  });
}
