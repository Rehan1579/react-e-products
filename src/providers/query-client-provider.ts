import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const QueryClientRoot = QueryClientProvider;
const QueryClientRootInstance = new QueryClient();


export { QueryClientRoot, QueryClientRootInstance };
