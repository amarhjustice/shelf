"use client";

import { useState } from "react";
import { BookOpen, Clock, Flame, Library } from "lucide-react";
import { currentUser } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const tabs = ["Account", "Reading Preferences", "Notifications"] as const;

export default function ProfilePage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Account");
  const [fontSize, setFontSize] = useState<"Small" | "Medium" | "Large">("Medium");
  const [theme, setTheme] = useState<"Light" | "Sepia" | "Dark">("Sepia");
  const [notifs, setNotifs] = useState({
    weeklyDigest: true,
    newReleases: true,
    readingReminders: false,
  });

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center gap-4 border-b border-line pb-10 text-center sm:flex-row sm:text-left">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-forest-tint font-serif text-2xl font-bold text-forest">
          {currentUser.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <div>
          <h1 className="font-serif text-2xl font-bold text-ink sm:text-3xl">
            {currentUser.name}
          </h1>
          <p className="text-ink-soft">{currentUser.email}</p>
          <p className="mt-1 text-xs text-ink-faint">Member since {currentUser.joined}</p>
        </div>
        <button className="mt-2 rounded-md border border-line px-4 py-2 text-sm font-medium text-ink hover:bg-paper-soft sm:ml-auto sm:mt-0">
          Edit Profile
        </button>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard icon={BookOpen} value={currentUser.booksRead} label="Books Read" />
        <StatCard icon={Library} value={currentUser.currentlyReading} label="Currently Reading" />
        <StatCard icon={Flame} value={currentUser.readingStreak} label="Day Streak" />
        <StatCard icon={Clock} value={`${currentUser.totalReadingHours}h`} label="Total Reading Time" />
      </div>

      <div className="mt-10 flex gap-1 overflow-x-auto border-b border-line no-scrollbar">
        {tabs.map((tName) => (
          <button
            key={tName}
            onClick={() => setTab(tName)}
            className={cn(
              "shrink-0 border-b-2 px-4 py-3 text-sm font-medium transition-colors",
              tab === tName
                ? "border-forest text-ink"
                : "border-transparent text-ink-soft hover:text-ink"
            )}
          >
            {tName}
          </button>
        ))}
      </div>

      <div className="mt-8 max-w-xl">
        {tab === "Account" && (
          <div className="space-y-5">
            <Field label="Full Name" defaultValue={currentUser.name} />
            <Field label="Email Address" defaultValue={currentUser.email} type="email" />
            <Field label="Password" defaultValue="••••••••••" type="password" />
            <button className="rounded-md bg-forest px-5 py-2.5 text-sm font-medium text-paper hover:bg-forest-soft">
              Save Changes
            </button>
          </div>
        )}

        {tab === "Reading Preferences" && (
          <div className="space-y-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-ink-faint">
                Default Font Size
              </p>
              <div className="mt-3 flex gap-2">
                {(["Small", "Medium", "Large"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setFontSize(s)}
                    className={cn(
                      "rounded-md border px-4 py-2 text-sm transition-colors",
                      fontSize === s
                        ? "border-forest bg-forest text-paper"
                        : "border-line text-ink-soft hover:text-ink"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-ink-faint">
                Default Reading Theme
              </p>
              <div className="mt-3 flex gap-2">
                {(["Light", "Sepia", "Dark"] as const).map((th) => (
                  <button
                    key={th}
                    onClick={() => setTheme(th)}
                    className={cn(
                      "rounded-md border px-4 py-2 text-sm transition-colors",
                      theme === th
                        ? "border-forest bg-forest text-paper"
                        : "border-line text-ink-soft hover:text-ink"
                    )}
                  >
                    {th}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab === "Notifications" && (
          <div className="space-y-5">
            <Toggle
              label="Weekly reading digest"
              checked={notifs.weeklyDigest}
              onChange={(v) => setNotifs((n) => ({ ...n, weeklyDigest: v }))}
            />
            <Toggle
              label="New release alerts"
              checked={notifs.newReleases}
              onChange={(v) => setNotifs((n) => ({ ...n, newReleases: v }))}
            />
            <Toggle
              label="Daily reading reminders"
              checked={notifs.readingReminders}
              onChange={(v) => setNotifs((n) => ({ ...n, readingReminders: v }))}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  value,
  label,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  value: number | string;
  label: string;
}) {
  return (
    <div className="rounded-xl border border-line bg-card p-4 text-center">
      <Icon size={18} className="mx-auto text-forest" />
      <p className="mt-2 font-serif text-xl font-bold text-ink">{value}</p>
      <p className="text-xs text-ink-faint">{label}</p>
    </div>
  );
}

function Field({
  label,
  defaultValue,
  type = "text",
}: {
  label: string;
  defaultValue: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-ink-faint">
        {label}
      </span>
      <input
        type={type}
        defaultValue={defaultValue}
        className="w-full rounded-md border border-line bg-card px-3.5 py-2.5 text-sm text-ink focus:outline-none"
      />
    </label>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between rounded-lg border border-line bg-card px-4 py-3.5">
      <span className="text-sm text-ink">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative h-6 w-11 rounded-full transition-colors",
          checked ? "bg-forest" : "bg-paper-deep"
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
            checked ? "translate-x-5" : "translate-x-0.5"
          )}
        />
      </button>
    </label>
  );
}
