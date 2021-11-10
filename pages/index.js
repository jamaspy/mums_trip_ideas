import React from "react";
import { v4 as uuidv4 } from "uuid";
import {
  dehydrate,
  QueryClient,
  useQueryClient,
  useQuery,
  useMutation,
} from "react-query";
import { getAllDates } from "../utils/getAllDates";
import { createNewActivity } from "../utils/createNewActivity";
import AddNewActivity from "../components/AddNewActivity";
export async function getStaticProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery("all_dates", getAllDates);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
export default function Home() {
  const [clear, setClear] = React.useState("");
  const { data: datesData } = useQuery("all_dates", getAllDates);
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation((data) => createNewActivity(data), {
    onSuccess: (data) => {
      queryClient.invalidateQueries("all_dates");
      setClear("");
    },
  });

  const onSubmit = (data) => mutate(data);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 min-h-screen p-4 bg-gradient-to-r from-green-400 via-yellow-500 to-green-600">
      {datesData &&
        datesData?.map((date) => (
          <AddNewActivity
            date={date}
            key={uuidv4()}
            isLoading={isLoading}
            onSubmit={onSubmit}
            clear={clear}
          />
        ))}
    </div>
  );
}
