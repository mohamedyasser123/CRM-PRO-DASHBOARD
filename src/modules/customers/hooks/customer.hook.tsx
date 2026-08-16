import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../services/customer.service";
import type { Customer } from "../types/customer";

export const customerKeys = {
  all: ["customers"] as const,

  lists: () => [...customerKeys.all, "list"] as const,

  list: (params?: {
    page?: number;
    limit?: number;
    search?: string;
  }) => [...customerKeys.lists(), params] as const,

  details: () => [...customerKeys.all, "detail"] as const,

  detail: (id: string) =>
    [...customerKeys.details(), id] as const,
};

export const useCustomers = (params?: {
  page?: number;
  limit?: number;
  search?: string;
}) => {
  return useQuery({
    queryKey: customerKeys.list(params),
    queryFn: () => getCustomers(params),
  });
};

export const useCustomer = (id: string) => {
  return useQuery({
    queryKey: customerKeys.detail(id),
    queryFn: () => getCustomerById(id),
    enabled: Boolean(id),
  });
};

export const useCreateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCustomer,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: customerKeys.lists(),
      });
    },
  });
};

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data:  Partial<Customer>;
    }) => updateCustomer(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: customerKeys.lists(),
      });

      queryClient.invalidateQueries({
        queryKey: customerKeys.detail(variables.id),
      });
    },
  });
};

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCustomer,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: customerKeys.lists(),
      });
    },
  });
};