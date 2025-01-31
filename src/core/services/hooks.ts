import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import getAxiosInstance from "./config";
import { CONTACT_QUERY_KEY } from "./constants";
import { ContactResponseType } from "./types";

const getContact = async (id: string): Promise<ContactResponseType> => {
  const response: AxiosResponse<ContactResponseType> =
    await getAxiosInstance().get(`/passenger/${id}`);
  return response.data;
};

export const useGetContact = (
  { id }: { id: string },
  options?: Omit<
    UseQueryOptions<ContactResponseType, AxiosError<ContactResponseType>>,
    "queryKey" | "queryFn"
  >,
) => {
  return useQuery({
    queryKey: [CONTACT_QUERY_KEY, id],
    queryFn: () => getContact(id),
    ...options,
  });
};
