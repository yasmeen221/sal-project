import { useToast } from "@chakra-ui/react";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ReactNode, useMemo } from "react";
import useAuthContext from "../../hooks/useAuthContext";

// to overwrite the data type of  error to axios error
declare module "@tanstack/react-query" {
  interface Register {
    defaultError: AxiosError<{ message: string }>;
  }
}

// TODO : useMemo(), useCallback() instead of useState() for performance improvement.
// make clean code
const QueryErrorProvider = ({ children }: { children: ReactNode }) => {
  const toast = useToast();
  const { onLogout } = useAuthContext();

  const queryClient = useMemo(() => {
    const queryCache = new QueryCache({
      onError: (error) => {
        let msg: string = "";
        if (error.request?.status === 401) {
          onLogout();
          msg = "session expired,please login again";
        } else {
          msg = error.response?.data.message || "something went wrong";
        }
        toast({
          title: "something wrong",
          description: error.response?.data.message || "something went wrong",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      },
    });

    const mutationCache = new MutationCache({
      onError: (error) => {
        toast({
          title: "something wrong",
          description: error.response?.data.message || "something went wrong",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      },
    });

    const queryClient = new QueryClient({
      queryCache,
      mutationCache,
      defaultOptions: {
        queries: { retry: false, refetchOnWindowFocus: false },
      },
    });
    return queryClient;
  }, [toast, onLogout]);

  return (
    <>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </>
  );
};

export default QueryErrorProvider;
