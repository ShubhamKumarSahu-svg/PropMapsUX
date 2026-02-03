import { useQuery } from "@tanstack/react-query";
import { fetchMapData } from "../Core/ServerProxy";

export const useFetchMapData = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["mapData"],
    queryFn: async () => await fetchMapData(),
    retry: 3,
  });

  return [data, error, isLoading] as const;
};
