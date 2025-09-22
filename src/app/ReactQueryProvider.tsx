'use client';

import { ReactNode, useState } from 'react';
import {QueryClient, QueryClientProvider, HydrationBoundary, DehydratedState} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient as sharedClient } from '../lib/settings/react-query';

interface Props {
    children: ReactNode;
    dehydratedState?: DehydratedState | null | undefined;
}

export default function ReactQueryProvider({ children, dehydratedState }: Props) {
    const [queryClient] = useState<QueryClient>(() => sharedClient);

    return (
        <QueryClientProvider client={queryClient}>
            <HydrationBoundary state={dehydratedState}>
                {children}
            </HydrationBoundary>
        </QueryClientProvider>
    );
}
