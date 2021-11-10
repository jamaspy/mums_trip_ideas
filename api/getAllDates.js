export async function getAllDates() {
  const res = await fetch("/api/getDates", {
    cache: "no-store",
  });
  const newData = await res.json();

  const dates = newData?.map((date) => {
    const { data, ref } = date;
    return { data, ref };
  });

  return dates;
}
