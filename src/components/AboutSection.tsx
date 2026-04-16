import { motion } from "framer-motion";

import type { BlockConfig } from "@/content/portfolio.schema";

type AboutBlock = Extract<BlockConfig, { type: "about" }>;

type AboutSectionProps = {
  block: AboutBlock;
};

export default function AboutSection({ block }: AboutSectionProps) {
  return (
    <section id="about" className="section-padding bg-mesh-alt relative overflow-hidden">
      <div className="absolute top-10 right-10 w-40 h-40 rounded-full bg-coral/6 blur-2xl animate-float-reverse" />

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30, rotate: -3 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: "spring" }}
          className="flex justify-center"
        >
          <div className="relative group">
            <div className="absolute -inset-3 rounded-3xl bg-coral-gradient opacity-30 blur-xl group-hover:opacity-50 transition-opacity duration-500 animate-pulse-glow" />
            <div
              className="absolute -inset-1.5 rounded-3xl bg-coral-gradient opacity-20 animate-spin-slow"
              style={{ animationDuration: "8s" }}
            />

            <div className="relative glass-card rounded-3xl p-3 hover:glow-coral-sm transition-all duration-500">
              <div className="overflow-hidden rounded-2xl">
                <motion.img
                  src={block.image.src}
                  alt={block.image.alt}
                  loading="lazy"
                  width={block.image.width ?? 500}
                  height={block.image.height ?? 600}
                  className="w-full max-w-sm object-cover aspect-[4/5] grayscale-[20%] hover:grayscale-0 transition-all duration-700 hover:scale-105"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 glass-card px-5 py-2 rounded-full"
              >
                <span className="text-sm font-semibold text-coral whitespace-nowrap">{block.nameTag}</span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight font-display">
            {block.title} <span className="text-gradient">{block.titleHighlight}</span>
          </h2>

          {block.paragraphs.map((paragraph, index) => (
            <p
              key={`${block.id}-paragraph-${index}`}
              className={`${index === 0 ? "mt-5" : "mt-4"} text-muted-foreground leading-relaxed`}
            >
              {paragraph}
            </p>
          ))}

          <div className="mt-8 grid grid-cols-2 gap-4">
            {block.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12, type: "spring", stiffness: 120 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="glass-card rounded-2xl p-4 cursor-default hover:glow-coral-sm transition-shadow duration-300"
              >
                <div className="text-2xl font-bold text-coral font-display">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
