import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  dealService,
  type GetDealsParams,
} from "../services/deal.service";
import type { Deal } from "../types/deal";

const dealKeys = {
  all: ["deals"] as const,

  lists: () => [...dealKeys.all, "list"] as const,

  list: (params?: GetDealsParams) =>
    [...dealKeys.lists(), params] as const,

  details: () => [...dealKeys.all, "detail"] as const,

  detail: (id: string) =>
    [...dealKeys.details(), id] as const,
};
export const useDeals = (params?: GetDealsParams) => {
  const query = useQuery({
    queryKey: dealKeys.list(params),
    queryFn: () => dealService.getDeals(params),
  });

  const deals = query.data?.data ?? [];

  const totalPipelineValue = deals.reduce(
    (total, deal) => total + deal.value,
    0
  );

  const totalDeals = deals.length;

  const wonDeals = deals.filter(
    (deal) => deal.stage === "Won"
  ).length;

  return {
    ...query,

    deals,
    totalPipelineValue,
    totalDeals,
    wonDeals,
  };
};;export const useDeal = (id: string) => {
  return useQuery({
    queryKey: dealKeys.detail(id),
    queryFn: () => dealService.getDealById(id),
    enabled: !!id,
  });
};
export const useCreateDeal=()=>{
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn:dealService.createDeal,
        onSuccess:()=>{
            queryClient.invalidateQueries({
                queryKey:dealKeys.lists(),
            })
        }
    })
    
}
export const useUpdateDeal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<Deal>;
    }) => dealService.updateDeal(id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: dealKeys.lists(),
      });

      queryClient.invalidateQueries({
        queryKey: dealKeys.detail(variables.id),
      });
    },
  });
};
export const useDeleteDeal = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: dealService.deleteDeal,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: dealKeys.lists(),
      });
    },
  });
};