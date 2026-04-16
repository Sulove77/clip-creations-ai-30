import { portfolioConfig } from "./portfolio.config";
import {
  PortfolioConfigSchema,
  formatValidationIssues,
  type PortfolioConfig,
  type ValidationIssue,
} from "./portfolio.schema";

export type PortfolioConfigResult =
  | { ok: true; data: PortfolioConfig }
  | { ok: false; issues: ValidationIssue[] };

export function validatePortfolioConfig(): PortfolioConfigResult {
  const parsed = PortfolioConfigSchema.safeParse(portfolioConfig);

  if (!parsed.success) {
    return {
      ok: false,
      issues: formatValidationIssues(parsed.error.issues),
    };
  }

  return { ok: true, data: parsed.data };
}
