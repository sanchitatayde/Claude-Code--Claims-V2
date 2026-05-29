"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Tag, StatusPill } from "@/components/ui/Tag";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";

export default function Sandbox() {
  const [tab, setTab] = React.useState<"vehicle" | "phone">("vehicle");

  return (
    <main className="min-h-screen bg-white text-ink">
      <div className="mx-auto max-w-5xl px-6 py-10 space-y-10">
        <header>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
            Zoop Claims · Design System
          </p>
          <h1 className="font-heading text-[28px] font-bold mt-1">
            Kitchen sink
          </h1>
          <p className="text-[14px] text-muted mt-1">
            All five reusable components on one page. If this looks right, the screens will too.
          </p>
        </header>

        {/* Palette */}
        <Section title="Palette">
          <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
            <Swatch name="brand-400" var_="--color-brand-400" />
            <Swatch name="brand-500" var_="--color-brand-500" />
            <Swatch name="brand-700" var_="--color-brand-700" />
            <Swatch name="brand-100" var_="--color-brand-100" />
            <Swatch name="brand-50" var_="--color-brand-50" />
            <Swatch name="ink" var_="--color-ink" />
            <Swatch name="muted" var_="--color-muted" />
            <Swatch name="subtle" var_="--color-subtle" />
            <Swatch name="border-strong" var_="--color-border-strong" />
            <Swatch name="border" var_="--color-border" />
            <Swatch name="warn" var_="--color-warn" />
            <Swatch name="danger" var_="--color-danger" />
          </div>
        </Section>

        {/* Type */}
        <Section title="Typography">
          <div className="space-y-2">
            <p className="font-heading text-[28px] font-bold">Display 28 — Manage your motor insurance claims</p>
            <p className="font-heading text-[22px] font-semibold">Headline 22 — Hi Ramesh 👋</p>
            <p className="font-heading text-[18px] font-semibold">Title 18 — Hyundai Verna Lxi</p>
            <p className="text-[15px]">Body 15 — Login to view active claims, file a new one, or check the status of past claims.</p>
            <p className="text-[13px] text-muted">Label 13 — Vehicle registration number</p>
            <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-muted">
              MONO LABEL 12 — IN SURVEY
            </p>
          </div>
        </Section>

        {/* Buttons */}
        <Section title="Buttons">
          <div className="flex flex-wrap gap-3">
            <Button>Send OTP →</Button>
            <Button variant="outline">View Full Invoice</Button>
            <Button variant="ghost">Get help</Button>
            <Button variant="danger">Reject</Button>
            <Button kbd="⌘⏎">Verify and Continue</Button>
            <Button disabled>Disabled</Button>
          </div>
          <div className="mt-3">
            <Button fullWidth>Send OTP →</Button>
          </div>
        </Section>

        {/* Inputs */}
        <Section title="Inputs">
          <div className="grid md:grid-cols-2 gap-4">
            <Input
              label="Vehicle registration number"
              defaultValue="MH 56 M 7854"
              helper="Enter the registration number as printed on your RC."
              leftIcon={<span>🚗</span>}
            />
            <Input
              label="Phone number"
              placeholder="9876543210"
              helper="We'll send an OTP to this number."
              leftIcon={<span>+91</span>}
            />
            <Input
              label="With error"
              defaultValue="MH 5"
              error="Looks too short. Check your RC."
              leftIcon={<span>🚗</span>}
            />
          </div>
        </Section>

        {/* Tags & Status pills */}
        <Section title="Tags & status pills">
          <div className="flex flex-wrap items-center gap-2">
            <Tag>Neutral</Tag>
            <Tag variant="success">Approved</Tag>
            <Tag variant="warn">due 2 days</Tag>
            <Tag variant="danger">Rejected</Tag>
            <Tag variant="brand">Tie-up</Tag>
            <StatusPill variant="warn">In Survey</StatusPill>
            <StatusPill variant="success">Under Settlement</StatusPill>
            <StatusPill variant="danger">Action needed</StatusPill>
          </div>
        </Section>

        {/* Cards */}
        <Section title="Cards">
          <div className="grid md:grid-cols-3 gap-3">
            <Card>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">ZP-CLM-2026-04-1842</p>
              <h3 className="font-heading text-[18px] font-semibold mt-1">Hyundai Verna Lxi</h3>
              <p className="text-[12px] text-muted mt-1">Stage 2 of 4 — Under assessment</p>
            </Card>
            <Card variant="tint">
              <h3 className="font-heading text-[16px] font-semibold">Settlement Report Available</h3>
              <p className="text-[13px] text-muted mt-1">Check your invoice, finance breakdown and sum to pay.</p>
            </Card>
            <Card variant="outline">
              <p className="text-[13px] font-semibold text-warn">Action needed</p>
              <p className="text-[13px] text-ink mt-1">Re-upload front bumper photo · Due 4 hrs</p>
            </Card>
          </div>
        </Section>

        {/* Chip toggle (segmented) */}
        <Section title="Segmented chip (login toggle)">
          <div className="flex gap-1 p-1 bg-surface-alt rounded-xl max-w-sm">
            <Chip selected={tab === "vehicle"} onClick={() => setTab("vehicle")} icon={<span>🚗</span>}>
              Vehicle number
            </Chip>
            <Chip selected={tab === "phone"} onClick={() => setTab("phone")} icon={<span>📞</span>}>
              Phone number
            </Chip>
          </div>
          <p className="text-[12px] text-muted mt-2">
            Selected: <span className="font-mono">{tab}</span>
          </p>
        </Section>

        <footer className="pt-6 text-[12px] text-subtle">
          Built from <span className="font-mono">customer-login-flow/styles.css</span>. Next: shell + routes.
        </footer>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted mb-3">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Swatch({ name, var_ }: { name: string; var_: string }) {
  return (
    <div className="flex flex-col gap-1">
      <div
        className="aspect-square w-full rounded-lg border border-border"
        style={{ background: `var(${var_})` }}
      />
      <p className="font-mono text-[10px] text-muted">{name}</p>
    </div>
  );
}
