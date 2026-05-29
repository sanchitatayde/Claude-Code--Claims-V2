import { redirect } from "next/navigation";

export default function SupportRedirect() {
  // Support is now the Helpdesk
  redirect("/help");
}
