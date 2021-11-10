import { QueryClient } from "react-query";
export const createNewActivity = async (data) => {
  const { act, id, actRef } = data;
  const payload = { id: actRef, name: act };
  try {
    const res = await fetch(`/api/addActivity/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    if (res.status === 200) {
      const queryClient = new QueryClient();
      queryClient.invalidateQueries();
      return res.json();
    } else {
      throw new Error(await res.text());
    }
  } catch (error) {
    console.error(error);
  }
};
