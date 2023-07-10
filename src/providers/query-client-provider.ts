import { QueryClient, QueryClientProvider } from "react-query";


const QueryClientRoot = QueryClientProvider;
const QueryClientRootInstance = new QueryClient();


export { QueryClientRoot, QueryClientRootInstance };
