import { motion } from "framer-motion";

import type { BlockConfig } from "@/content/portfolio.schema";

type HeroBlock = Extract<BlockConfig, { type: "hero" }>;

type HeroSectionProps = {
  block: HeroBlock;
};

export default function HeroSection({ block }: HeroSectionProps) {
  return (
    <section className="min-h-screen flex items-center section-padding pt-28 bg-mesh relative overflow-hidden">
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-coral/10 blur-3xl animate-pulse-glow" />
      <div
        className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-accent/8 blur-3xl animate-pulse-glow"
        style={{ animationDelay: "2s" }}
      />
      <div className="absolute top-1/2 left-1/2 w-48 h-48 rounded-full bg-coral/5 blur-2xl animate-float-slow" />

      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="inline-block glass-card text-coral text-sm font-semibold px-4 py-1.5 rounded-full mb-6"
          >
            {block.badge}
          </motion.span>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight tracking-tight font-display">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="block"
            >
              {block.headingPrefix}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-gradient block"
            >
              {block.headingHighlight}
            </motion.span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-6 text-muted-foreground text-lg leading-relaxed max-w-lg"
          >
            {block.description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <a
              href={block.primaryCta.href}
              className="bg-primary text-primary-foreground px-7 py-3.5 rounded-xl font-semibold text-sm hover:bg-primary/90 hover:scale-105 transition-all duration-300 glow-coral"
            >
              {block.primaryCta.label}
            </a>
            <a
              href={block.secondaryCta.href}
              className="glass-card text-foreground px-7 py-3.5 rounded-xl font-semibold text-sm hover:bg-input hover:scale-105 transition-all duration-300"
            >
              {block.secondaryCta.label}
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 100 }}
          className="flex justify-center"
        >
          <div className="relative animate-float">
            <div className="absolute inset-0 rounded-3xl bg-coral/10 blur-2xl scale-90 animate-pulse-glow" />
            <img
              src={block.image.src}
              alt={block.image.alt}
              width={block.image.width ?? 1024}
              height={block.image.height ?? 1024}
              className="w-full max-w-md md:max-w-lg relative z-10"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
