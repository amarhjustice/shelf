import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";
import ProfileClient from "./ProfileClient";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return <ProfileClient user={user} />;
}
