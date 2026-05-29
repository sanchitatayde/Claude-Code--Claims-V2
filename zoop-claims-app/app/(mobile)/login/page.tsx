"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { TopBar } from "@/components/mobile/TopBar";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Chip } from "@/components/ui/Chip";

type Method = "vehicle" | "phone";

export default function LoginPage() {
  const router = useRouter();
  const [method, setMethod] = React.useState<Method>("vehicle");
  const [vehicle, setVehicle] = React.useState("MH 56 M 7854");
  const [phone, setPhone] = React.useState("");

  const canSubmit =
    method === "vehicle" ? vehicle.trim().length >= 4 : phone.replace(/\D/g, "").length === 10;

  const handleSubmit = () => {
    if (!canSubmit) return;
    // TODO: real auth — for prototype, jump to verify
    router.push("/login/verify");
  };

  return (
    <>
      <TopBar variant="brand" sub="Claims" />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="flex-1 flex flex-col"
      >
        <div className="flex-1 px-5 py-5 overflow-y-auto">
          <p className="text-[14px] text-muted">Welcome</p>
          <h1 className="font-heading text-[22px] font-bold leading-snug mt-1 text-ink">
            Manage your
            <br />
            motor insurance claims
          </h1>
          <p className="text-[13px] text-muted mt-3 leading-relaxed">
            Login to view active claims, file a new one, or check the status of past claims.
          </p>

          <div className="mt-6 rounded-2xl bg-surface-alt p-4">
            {/* Method toggle */}
            <div className="flex gap-1 p-1 bg-white rounded-xl border border-border">
              <Chip
                selected={method === "vehicle"}
                onClick={() => setMethod("vehicle")}
                icon={<VehicleIcon />}
              >
                Vehicle number
              </Chip>
              <Chip
                selected={method === "phone"}
                onClick={() => setMethod("phone")}
                icon={<PhoneIcon />}
              >
                Phone number
              </Chip>
            </div>

            <div className="mt-4">
              {method === "vehicle" ? (
                <Input
                  label="Vehicle registration number"
                  value={vehicle}
                  onChange={(e) => setVehicle(e.target.value.toUpperCase())}
                  helper="Enter the registration number as printed on your RC."
                  leftIcon={<VehicleIcon />}
                  autoCapitalize="characters"
                />
              ) : (
                <Input
                  label="Phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  helper="We'll send a 6-digit OTP to this number."
                  leftIcon={<span className="text-muted text-[14px]">+91</span>}
                  inputMode="numeric"
                  placeholder="98765 43210"
                />
              )}
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="px-5 pb-6 pt-3 border-t border-neutral-100">
          <Button type="submit" fullWidth disabled={!canSubmit}>
            <span className="inline-flex items-center gap-2">
              Send OTP <span aria-hidden>→</span>
            </span>
          </Button>
          <p className="text-center text-[13px] text-muted mt-3">
            Having trouble?{" "}
            {/* TODO: help destination (deferred per user) */}
            <button type="button" className="text-ink font-semibold underline-offset-2 hover:underline">
              Get help
            </button>
          </p>
        </div>
      </form>
    </>
  );
}

function VehicleIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M5 17h14M5 17v3M19 17v3M5 17l-2-5h18l-2 5M3 12l2-5h14l2 5" />
      <circle cx="7.5" cy="15.5" r="1" />
      <circle cx="16.5" cy="15.5" r="1" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
