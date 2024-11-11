import { getServerSession } from "next-auth";
import { redirect } from "next/dist/server/api-utils";

import { options } from "./api/auth/[...nextauth]/options";
import Header from "./components/header";
import Body from "./components/body";

export default async function Home() {
  const session = await getServerSession(options);

  if (!session) redirect("/api/auth/signin?callbackUrl=/server");

  return (
    <div className="bg-background-main min-h-screen">
      <div className="min-w-full">
        <Header />
      </div>

      <div className="min-w-full pt-16">
        <Body />
      </div>
    </div>
  );
}
