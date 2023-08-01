import dynamic from "next/dynamic";

const Map = dynamic(() => import("feature/Map"));

export default async function Page() {
  return <Map />;
}
