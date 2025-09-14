import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const BaseURL = `${process.env.NEXT_PUBLIC_API_URL}`;

const useApiQuery = <T,>(url: string, key: string | (string | number)[]) => {
  const { data, error, isLoading, isError } = useQuery<T>({
    queryKey: Array.isArray(key) ? key : [key],
    queryFn: async () => {
      const response = await api.get(`${BaseURL}${url}`);

      return response.data;
    },
  });

  return { data, error, isLoading, isError };
};

export default useApiQuery;
