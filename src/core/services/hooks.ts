import {
  UseQueryOptions,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import getAxiosInstance from "./config";
import { CONTACT_LIST_QUERY_KEY, CONTACT_QUERY_KEY } from "./constants";
import {
  ContactListFilterRequestType,
  ContactListResponseType,
  ContactResponseType,
} from "./types";

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

const getContactList = async ({
  pageParam = 0,
  filter,
}: {
  pageParam: number;
  filter: ContactListFilterRequestType;
}): Promise<ContactListResponseType> => {
  const { data }: AxiosResponse<ContactListResponseType> =
    await getAxiosInstance().get("/passenger", {
      params: { limit: 8, skip: pageParam, where: filter },
    });
  return data;
};

export const useGetContactList = ({
  filter,
}: {
  filter: ContactListFilterRequestType;
}) => {
  return useInfiniteQuery({
    queryKey: [CONTACT_LIST_QUERY_KEY, filter],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => getContactList({ pageParam, filter }),
    getNextPageParam: (lastPage) => {
      const { skipped, limit, total } = lastPage.meta;
      const nextSkip = skipped + limit;
      return nextSkip < total ? nextSkip : undefined; // Stop fetching when all contacts are loaded
    },
  });
};
