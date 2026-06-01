import { redirect } from "next/navigation";

/**
 * The Garage flow lives on a separate Vercel deployment. Any deep link to
 * /garage/login on this domain is bounced over to the real portal so the
 * "Switch to Garage" CTA and the access-gate dropdown converge on one URL.
 */
export default function GarageLoginRedirect() {
  redirect("https://garage-ext.vercel.app/login");
}
