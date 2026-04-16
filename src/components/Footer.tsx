import { motion } from "framer-motion";

import type { BlockConfig, PortfolioConfig } from "@/content/portfolio.schema";

type FooterBlock = Extract<BlockConfig, { type: "footer" }>;

type FooterProps = {
  block: FooterBlock;
  nav: PortfolioConfig["nav"];
  person: PortfolioConfig["person"];
};

export default function Footer({ block, nav, person }: FooterProps) {
  return (
    <footer className="glass py-8 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4"
      >
        <div className="font-display text-lg font-bold text-foreground">
          {nav.brand.text}
          {nav.brand.accentText ? <span className="text-coral">{nav.brand.accentText}</span> : null}
        </div>
        <p className="text-sm text-muted-foreground text-center">
          © {new Date().getFullYear()} {person.fullName}
          {block.copyrightText ? ` ${block.copyrightText}` : "."}
        </p>
        <div className="flex gap-4">
          {block.socialLinks.map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -2, scale: 1.05 }}
              className="text-sm text-muted-foreground hover:text-coral transition-colors"
            >
              {social.label}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </footer>
  );
}
