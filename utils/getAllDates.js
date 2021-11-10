const dev = process.env.NODE_ENV !== "production";
export const server = dev
  ? "http://localhost:3000"
  : "https://mums-trip-ideas.vercel.app";

export async function getAllDates() {
  const res = await fetch(`${server}/api/getDates`, {
    cache: "no-store",
  });
  const newData = await res.json();

  const dates = newData?.map((date) => {
    const { data, ref } = date;
    return { data, ref };
  });

  return dates;
}
