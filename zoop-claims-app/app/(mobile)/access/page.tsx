"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { TopBar } from "@/components/mobile/TopBar";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const USERNAME = "ZoopClaims";
const PASSWORD = "Claims@2026";
const COOKIE_DAYS = 30;

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
  const next = params.get("next") || "/login";

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  const handleChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
      if (error) setError(null);
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === USERNAME && password === PASSWORD) {
      const maxAge = 60 * 60 * 24 * COOKIE_DAYS;
      document.cookie = `zoop_unlocked=1; path=/; max-age=${maxAge}; SameSite=Lax`;
      router.replace(next.startsWith("/") ? next : "/login");
    } else {
      setError("Incorrect username or password.");
    }
  };

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
            This is a private preview of the Zoop Claims customer experience. Use the
            credentials shared with you to continue.
          </p>

          <div className="mt-6 rounded-2xl bg-surface-alt p-4 space-y-3">
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
          </div>
        </div>

        <div className="px-5 pb-6 pt-3 border-t border-neutral-100">
          <Button type="submit" fullWidth disabled={!username || !password}>
            <span className="inline-flex items-center gap-2">
              Continue <span aria-hidden>→</span>
            </span>
          </Button>
        </div>
      </form>
    </AccessShell>
  );
}
