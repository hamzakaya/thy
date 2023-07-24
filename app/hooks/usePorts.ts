import { useQuery } from "@tanstack/react-query";
import { axios } from "@/app/lib/axios";

export async function fetchPorts() {
  const { data } = await axios.get<IPortItem[]>("/api/ports");
  return data
}

export function usePorts() {
  return useQuery<IPortItem[], Error>({
    queryKey: ["ports"],
    queryFn: fetchPorts,
    cacheTime: Infinity,
    staleTime: Infinity,
  });
}
