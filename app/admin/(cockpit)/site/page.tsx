import { getAllSettings } from "@/lib/admin/settings";
import { SettingsEditor } from "@/components/admin/settings-editor";

export const dynamic = "force-dynamic";

export default async function SiteControlsPage() {
  const settings = await getAllSettings();

  return (
    <div className="px-10 py-12">
      <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-eyebrow text-ink-400 mb-10">
        <span className="text-accent">●</span>
        <span className="h-px w-10 bg-ink-700" />
        <span>Site controls</span>
      </div>
      <h1 className="font-serif text-4xl md:text-5xl text-ink-50 tracking-tight mb-4">
        The site, from here.
      </h1>
      <p className="text-ink-400 max-w-xl mb-16">
        Changes save to the database and go live immediately — no deploy.
        Reset returns a field to the code-side default.
      </p>

      <SettingsEditor initial={settings} />
    </div>
  );
}
