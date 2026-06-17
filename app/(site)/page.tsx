import { HomeClient } from "@/components/home/home-client";
import { getHomeData } from "@/lib/home-data";

export default async function HomePage() {
  const data = await getHomeData();
  return <HomeClient {...data} />;
}
