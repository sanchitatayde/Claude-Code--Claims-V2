"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { TopBar } from "@/components/mobile/TopBar";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const USERNAME = "ZoopClaims";
const PASSWORD = "Claims@2026";

type Flow = "customer" | "garage";

/** Customer flow lives in this app; Garage flow lives on a separate Vercel
 *  deployment, so picking it just hands the user off there. Credentials are
 *  not enforced for the external hand-off — the user lands directly on the
 *  Garage login screen. */
const CUSTOMER_HOME = "/login";
const GARAGE_EXTERNAL_URL = "https://garage-ext.vercel.app/login";

export default function AccessPage() {
  return (
    <React.Suspense fallback={<AccessShell />}>
      <AccessForm />
    </React.Suspense>
  );
}

function AccessShell({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <TopBar variant="brand" sub="Claims" />
      {children ?? <div className="flex-1" aria-hidden />}
    </>
  );
}

function AccessForm() {
  const router = useRouter();
  const params = useSearchParams();
  /** If the proxy bounced us here from a specific route, send the user back
   *  there after unlock — but only if it belongs to the chosen flow. */
  const intendedNext = params.get("next");

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [flow, setFlow] = React.useState<Flow>("customer");
  const [error, setError] = React.useState<string | null>(null);

  const handleChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
      if (error) setError(null);
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Garage flow is hosted on a different Vercel deployment. Hand the user
    // off externally — no credentials, no session cookie on this domain.
    if (flow === "garage") {
      window.location.href = GARAGE_EXTERNAL_URL;
      return;
    }

    // Customer flow: enforce the demo credentials.
    if (username !== USERNAME || password !== PASSWORD) {
      setError("Incorrect username or password.");
      return;
    }

    // Session-only cookies (no max-age) → cleared when the browser tab
    // closes, so every fresh visit re-prompts.
    document.cookie = `zoop_session=1; path=/; SameSite=Lax`;
    document.cookie = `zoop_flow=customer; path=/; SameSite=Lax`;

    // Honour ?next= when the proxy bounced the user here; otherwise land
    // on the Customer home.
    const safeNext =
      intendedNext && !intendedNext.startsWith("/garage")
        ? intendedNext
        : CUSTOMER_HOME;
    router.replace(safeNext);
  };

  /** Garage handoff doesn't need credentials — only the dropdown matters. */
  const isGarage = flow === "garage";
  const canSubmit = isGarage || (Boolean(username) && Boolean(password));

  return (
    <AccessShell>
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
        <div className="flex-1 px-5 py-5 overflow-y-auto">
          <p className="text-[14px] text-muted">Restricted preview</p>
          <h1 className="font-heading text-[22px] font-bold leading-snug mt-1 text-ink">
            Enter access
            <br />
            credentials
          </h1>
          <p className="text-[13px] text-muted mt-3 leading-relaxed">
            This is a private preview of the Zoop Claims experience. Use the credentials
            shared with you and pick the flow you want to explore.
          </p>

          <div className="mt-6 rounded-2xl bg-surface-alt p-4 space-y-3">
            <FlowSelect value={flow} onChange={setFlow} />
            {/* Credentials are only needed for the Customer flow — the Garage
                flow is a hand-off to a separate deployment that owns its own
                auth. */}
            {!isGarage ? (
              <>
                <Input
                  label="Username"
                  value={username}
                  onChange={handleChange(setUsername)}
                  autoCapitalize="off"
                  autoCorrect="off"
                  spellCheck={false}
                  autoComplete="off"
                />
                <Input
                  label="Password"
                  type="password"
                  value={password}
                  onChange={handleChange(setPassword)}
                  autoComplete="off"
                  error={error || undefined}
                />
              </>
            ) : (
              <p className="text-[13px] text-muted leading-relaxed">
                The Garage portal opens in a new window with its own sign-in.
              </p>
            )}
          </div>
        </div>

        <div className="px-5 pb-6 pt-3 border-t border-neutral-100">
          <Button type="submit" fullWidth disabled={!canSubmit}>
            <span className="inline-flex items-center gap-2">
              {isGarage ? "Open Garage portal" : "Continue"}{" "}
              <span aria-hidden>→</span>
            </span>
          </Button>
        </div>
      </form>
    </AccessShell>
  );
}

function FlowSelect({
  value,
  onChange,
}: {
  value: Flow;
  onChange: (f: Flow) => void;
}) {
  const id = React.useId();
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label htmlFor={id} className="text-[13px] font-medium text-ink">
        Choose flow
      </label>
      <div className="flex items-center gap-2 rounded-xl border bg-white px-3 h-12 border-border-strong focus-within:border-ink transition-colors">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value as Flow)}
          className="flex-1 outline-none bg-transparent text-[15px] text-ink appearance-none"
        >
          <option value="customer">Customer</option>
          <option value="garage">Garage</option>
        </select>
        <ChevronDown />
      </div>
      <p className="text-[12px] text-muted">
        Pick which experience to launch after sign-in.
      </p>
    </div>
  );
}

function ChevronDown() {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-muted shrink-0"
      aria-hidden
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
