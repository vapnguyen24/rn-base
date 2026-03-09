import { QueryClient } from '@tanstack/react-query';
import { QUERY_GC_TIME, QUERY_STALE_TIME } from '@core/config/constants';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: QUERY_STALE_TIME,
      gcTime: QUERY_GC_TIME,
      retry: 2,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});
