import React from "react";
import { v4 as uuidv4 } from "uuid";
import { GiKangaroo } from "react-icons/gi";
import { IoIosAddCircleOutline } from "react-icons/io";
const AddNewActivity = ({ date, onSubmit, isLoading, clear }) => {
  const [newActivity, setNewActivity] = React.useState(clear);

  return (
    <div
      key={`box_${date.data.number}`}
      className="font-caveat border flex-1 rounded-md shadow-md p-2 bg-white bg-opacity-50 hover:bg-opacity-100 transition-all flex flex-col justify-between"
    >
      <div className="flex flex-col">
        <p className="font-semibold text-4xl mb-2 ">{date.data.number} Feb</p>
        {date?.data?.activities.map((activity) => (
          <p className="text-2xl" key={activity.id}>
            {activity.name}
          </p>
        ))}
      </div>
      <div className="flex flex-col bg-gray-400 rounded-md p-2 mt-4 ">
        <p className="text-xl mb-4">Add New Activity Idea</p>
        <input
          placeholder="Type your idea here"
          className="rounded mb-2 p-1"
          value={newActivity}
          onChange={(e) => setNewActivity(e.target.value)}
        />
        <button
          disabled={isLoading}
          onClick={() => {
            const data = {
              act: newActivity,
              id: date.ref[`@ref`]?.id,
              actRef: uuidv4(),
            };

            onSubmit(data);
          }}
          className=" text-lg rounded bg-gray-800 text-white"
        >
          {isLoading ? (
            <div className="w-full flex flex-row items-center justify-center">
              <p className="mr-2">Creating </p>
              <GiKangaroo className="animate-bounce text-center " />
            </div>
          ) : (
            <div className="w-full flex flex-row items-center justify-center">
              <IoIosAddCircleOutline />
              <p className="ml-2">Add Activity Idea</p>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default AddNewActivity;
