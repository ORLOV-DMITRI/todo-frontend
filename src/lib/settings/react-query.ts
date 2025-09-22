import { QueryClient } from '@tanstack/react-query';


const MINUTE = 1000 * 60;
export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * MINUTE,
            gcTime: 10 * MINUTE,
            retry: false,
            refetchOnWindowFocus: false,
        },
    },
});
