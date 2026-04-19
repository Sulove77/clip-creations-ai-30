import { createFileRoute } from "@tanstack/react-router";

import AboutSection from "@/components/AboutSection";
import ConfigErrorPanel from "@/components/ConfigErrorPanel";
import ContactSection from "@/components/ContactSection";
import ExperienceSection from "@/components/ExperienceSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import ServicesSection from "@/components/ServicesSection";
import SkillsSection from "@/components/SkillsSection";
import { validatePortfolioConfig } from "@/content/portfolio";
import { type BlockConfig, type PortfolioConfig } from "@/content/portfolio.schema";

const defaultHead = {
  title: "Portfolio",
  description: "Content-driven portfolio website.",
  author: "Portfolio Owner",
};

const parsedConfig = validatePortfolioConfig();
const headMeta = parsedConfig.ok
  ? parsedConfig.data.seo
  : defaultHead;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: headMeta.title },
      { name: "description", content: headMeta.description },
      { name: "author", content: headMeta.author },
      { property: "og:title", content: headMeta.title },
      { property: "og:description", content: headMeta.description },
      { property: "og:type", content: "website" },
      ...(headMeta.ogImage
        ? [{ property: "og:image", content: headMeta.ogImage }]
        : []),
      { name: "twitter:card", content: "summary" },
      ...(headMeta.twitterSite
        ? [{ name: "twitter:site", content: headMeta.twitterSite }]
        : []),
      { name: "twitter:title", content: headMeta.title },
      { name: "twitter:description", content: headMeta.description },
      ...(headMeta.ogImage
        ? [{ name: "twitter:image", content: headMeta.ogImage }]
        : []),
    ],
  }),
  component: Index,
});

function UnknownBlockFallback({ block }: { block: BlockConfig }) {
  return (
    <section className="section-padding">
      <div className="max-w-4xl mx-auto glass-card rounded-2xl p-6">
        <h2 className="text-xl font-bold text-foreground">Unknown Block Type</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Block <span className="font-mono text-coral">{block.id}</span> uses
          unsupported type <span className="font-mono text-coral">{block.type}</span>.
        </p>
      </div>
    </section>
  );
}

function renderBlock(block: BlockConfig, config: PortfolioConfig): JSX.Element {
  switch (block.type) {
    case "hero":
      return <HeroSection block={block} />;
    case "about":
      return <AboutSection block={block} />;
    case "skills":
      return <SkillsSection block={block} />;
    case "services":
      return <ServicesSection block={block} />;
    case "experience":
      return <ExperienceSection block={block} />;
    case "contact":
      return <ContactSection block={block} />;
    case "footer":
      return <Footer block={block} nav={config.nav} person={config.person} />;
    default:
      return <UnknownBlockFallback block={block} />;
  }
}

function Index() {
  if (!parsedConfig.ok) {
    return <ConfigErrorPanel issues={parsedConfig.issues} />;
  }

  const config = parsedConfig.data;

  return (
    <div className="min-h-screen">
      <Navbar nav={config.nav} />
      {config.blocks.map((block) => (
        <div key={block.id}>{renderBlock(block, config)}</div>
      ))}
    </div>
  );
}
