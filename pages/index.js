import React from "react";
import { v4 as uuidv4 } from "uuid";
import { GiKangaroo } from "react-icons/gi";
import { useQueryClient, useQuery, useMutation } from "react-query";
import { getAllDates } from "../utils/getAllDates";
import { createNewActivity } from "../utils/createNewActivity";
import AddNewActivity from "../components/AddNewActivity";

export async function getStaticProps() {
  const dates = await getAllDates();
  return { props: { dates } };
}

export default function Home(props) {
  console.log(props);
  const [clear, setClear] = React.useState("");
  const { data: datesData, isLoading: datesLoading } = useQuery(
    "all_dates",
    getAllDates,
    {
      initialData: props.dates,
    }
  );
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation((data) => createNewActivity(data), {
    onSuccess: (data) => {
      queryClient.invalidateQueries("all_dates");
      setClear("");
    },
  });

  const onSubmit = (data) => mutate(data);

  if (datesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-4xl p-4 bg-gradient-to-r from-green-400 via-yellow-500 to-green-600">
        <div className="w-full flex flex-row items-center justify-center">
          <p className="mr-2 font-caveat">Fetching You Things...</p>
          <GiKangaroo className="animate-bounce text-center " />
        </div>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 min-h-screen p-4 bg-gradient-to-r from-green-400 via-yellow-500 to-green-600">
      {!datesLoading &&
        datesData &&
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
