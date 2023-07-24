import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axios } from "@/app/lib/axios";
import { useRouter } from "next/navigation";

type IProps = {
  origin: string;
  destination: string;
};

export const fetchFlights = async ({ origin, destination }: IProps) => {
  if (!origin || !destination) return;

  const { data } = await axios.get<FlightData[]>(
    `/api/get-flights?origin=${origin}&destination=${destination}`
  );
  return data;
};

export const useFlights = ({ origin, destination }: IProps) => {
  return useQuery(["flights"], () => fetchFlights({ origin, destination }), {
    retry: false,
    staleTime: Infinity,
  });
};

export const useFlightsMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(
    ({ origin, destination }: IProps) => fetchFlights({ origin, destination }),
    {
      onSuccess: (flightData) => {
        queryClient.invalidateQueries(["flights"]);
        if (Array.isArray(flightData) && flightData.length > 0) {
          router.push(`/fly-list`);
        }
      },
    }
  );
};
