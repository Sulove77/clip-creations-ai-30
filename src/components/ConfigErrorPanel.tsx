import type { ValidationIssue } from "@/content/portfolio.schema";

type ConfigErrorPanelProps = {
  issues: ValidationIssue[];
};

export default function ConfigErrorPanel({ issues }: ConfigErrorPanelProps) {
  return (
    <div className="min-h-screen bg-background section-padding">
      <div className="max-w-3xl mx-auto glass-card rounded-2xl p-6 md:p-8">
        <h1 className="text-2xl font-bold text-foreground font-display">Invalid `portfolio.config.ts`</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Fix the fields below. This check is strict on purpose so beginners can pinpoint errors quickly.
        </p>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/70">
                <th className="text-left py-2 pr-3 text-foreground">Path</th>
                <th className="text-left py-2 text-foreground">Issue</th>
              </tr>
            </thead>
            <tbody>
              {issues.map((issue, index) => (
                <tr key={`${issue.path}-${index}`} className="border-b border-border/40 align-top">
                  <td className="py-2 pr-3 font-mono text-coral">{issue.path}</td>
                  <td className="py-2 text-muted-foreground">{issue.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
