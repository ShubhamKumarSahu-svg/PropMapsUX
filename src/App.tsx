import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MapSection } from "./Components/MapSection/MapSection";

function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      {" "}
      <MapSection />
    </QueryClientProvider>
  );
}

export default App;
