import { redirect } from "next/navigation";

export default function Home() {
  // Always start the flow at the login screen
  redirect("/login");
}
