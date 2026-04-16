import { z } from "zod";

const knownBlockTypes = [
  "hero",
  "about",
  "skills",
  "services",
  "experience",
  "contact",
  "footer",
] as const;

const CtaSchema = z.object({
  label: z.string().min(1, "CTA label is required"),
  href: z.string().min(1, "CTA href is required"),
});

const ImageSchema = z.object({
  src: z.string().min(1, "Image src is required"),
  alt: z.string().min(1, "Image alt text is required"),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
  className: z.string().optional(),
});

const NavLinkSchema = z.object({
  label: z.string().min(1, "Navigation label is required"),
  href: z.string().min(1, "Navigation href is required"),
});

const SocialLinkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

const ThemeColorsSchema = z.record(
  z
    .string()
    .min(1, "Theme color key is required")
    .regex(/^(--)?[a-z0-9-]+$/i, "Use CSS variable-like keys, e.g. background or --primary"),
  z.string().min(1, "Theme color value is required"),
);

const HeroBlockSchema = z.object({
  id: z.string().min(1),
  type: z.literal("hero"),
  badge: z.string().min(1),
  headingPrefix: z.string().min(1),
  headingHighlight: z.string().min(1),
  description: z.string().min(1),
  primaryCta: CtaSchema,
  secondaryCta: CtaSchema,
  image: ImageSchema,
});

const AboutBlockSchema = z.object({
  id: z.string().min(1),
  type: z.literal("about"),
  title: z.string().min(1),
  titleHighlight: z.string().min(1),
  paragraphs: z.array(z.string().min(1)).min(1),
  image: ImageSchema,
  nameTag: z.string().min(1),
  stats: z
    .array(
      z.object({
        value: z.string().min(1),
        label: z.string().min(1),
      }),
    )
    .min(1),
});

const SkillsBlockSchema = z.object({
  id: z.string().min(1),
  type: z.literal("skills"),
  title: z.string().min(1),
  titleHighlight: z.string().min(1),
  subtitle: z.string().min(1),
  items: z
    .array(
      z.object({
        name: z.string().min(1),
        level: z.number().min(0).max(100),
      }),
    )
    .min(1),
  image: ImageSchema,
});

const ServicesBlockSchema = z.object({
  id: z.string().min(1),
  type: z.literal("services"),
  title: z.string().min(1),
  titleHighlight: z.string().min(1),
  subtitle: z.string().min(1),
  items: z
    .array(
      z.object({
        icon: z.string().min(1),
        title: z.string().min(1),
        desc: z.string().min(1),
      }),
    )
    .min(1),
  image: ImageSchema.optional(),
});

const ExperienceBlockSchema = z.object({
  id: z.string().min(1),
  type: z.literal("experience"),
  title: z.string().min(1),
  titleHighlight: z.string().min(1),
  subtitle: z.string().min(1),
  items: z
    .array(
      z.object({
        year: z.string().min(1),
        role: z.string().min(1),
        company: z.string().min(1),
        desc: z.string().min(1),
      }),
    )
    .min(1),
});

const ContactBlockSchema = z.object({
  id: z.string().min(1),
  type: z.literal("contact"),
  title: z.string().min(1),
  titleHighlight: z.string().min(1),
  subtitle: z.string().min(1),
  cardTitle: z.string().min(1),
  submitLabel: z.string().min(1),
  successMessage: z.string().min(1),
  errorMessage: z.string().min(1),
  contactItems: z
    .array(
      z.object({
        icon: z.string().min(1),
        label: z.string().min(1),
        value: z.string().min(1),
        href: z.string().optional(),
      }),
    )
    .min(1),
  image: ImageSchema,
});

const FooterBlockSchema = z.object({
  id: z.string().min(1),
  type: z.literal("footer"),
  socialLinks: z.array(SocialLinkSchema).default([]),
  copyrightText: z.string().optional(),
});

const UnknownBlockSchema = z
  .object({
    id: z.string().min(1),
    type: z.string().min(1),
  })
  .passthrough()
  .refine((value) => !knownBlockTypes.includes(value.type as KnownBlockType), {
    message: "Known block types must match their required structure",
    path: ["type"],
  });

export const BlockConfigSchema = z.union([
  HeroBlockSchema,
  AboutBlockSchema,
  SkillsBlockSchema,
  ServicesBlockSchema,
  ExperienceBlockSchema,
  ContactBlockSchema,
  FooterBlockSchema,
  UnknownBlockSchema,
]);

export const PortfolioConfigSchema = z.object({
  site: z.object({
    name: z.string().min(1),
    role: z.string().min(1),
  }),
  person: z.object({
    fullName: z.string().min(1),
    location: z.string().min(1),
    email: z.string().email(),
    linkedin: z.string().min(1),
  }),
  nav: z.object({
    brand: z.object({
      text: z.string().min(1),
      accentText: z.string().optional(),
      href: z.string().default("#"),
    }),
    links: z.array(NavLinkSchema).min(1),
    cta: CtaSchema.optional(),
  }),
  seo: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    author: z.string().min(1),
    ogImage: z.string().url().optional(),
    twitterSite: z.string().optional(),
  }),
  theme: z
    .object({
      mode: z.enum(["light"]).default("light"),
      colors: ThemeColorsSchema.optional(),
    })
    .optional(),
  blocks: z.array(BlockConfigSchema).min(1),
});

export type KnownBlockType = (typeof knownBlockTypes)[number];
export type BlockConfig = z.infer<typeof BlockConfigSchema>;
export type PortfolioConfig = z.infer<typeof PortfolioConfigSchema>;

export const isKnownBlockType = (value: string): value is KnownBlockType =>
  knownBlockTypes.includes(value as KnownBlockType);

export type ValidationIssue = {
  path: string;
  message: string;
};

export function formatValidationIssues(issues: z.ZodIssue[]): ValidationIssue[] {
  return issues.map((issue) => ({
    path: issue.path.length > 0 ? issue.path.join(".") : "root",
    message: issue.message,
  }));
}
