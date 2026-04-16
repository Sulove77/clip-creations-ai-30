import { motion } from "framer-motion";

import type { BlockConfig } from "@/content/portfolio.schema";

type SkillsBlock = Extract<BlockConfig, { type: "skills" }>;

type SkillsSectionProps = {
  block: SkillsBlock;
};

export default function SkillsSection({ block }: SkillsSectionProps) {
  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-coral/8 blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-accent/6 blur-2xl animate-float-reverse" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight font-display">
            {block.title} <span className="text-gradient">{block.titleHighlight}</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-lg mx-auto">{block.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-2xl p-8 space-y-5"
          >
            {block.items.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
              >
                <div className="flex justify-between mb-1.5">
                  <span className="text-sm font-medium text-foreground">{skill.name}</span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.07 }}
                    className="text-sm text-coral font-semibold"
                  >
                    {skill.level}%
                  </motion.span>
                </div>
                <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.07, ease: "easeOut" }}
                    className="h-full bg-coral-gradient rounded-full glow-coral-sm"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: 5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: "spring" }}
            className="flex justify-center"
          >
            <div className="animate-float">
              <img
                src={block.image.src}
                alt={block.image.alt}
                loading="lazy"
                width={block.image.width ?? 800}
                height={block.image.height ?? 800}
                className="w-full max-w-sm"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
